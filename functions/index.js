const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");


const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// Elimina cualquier cuenta cuyo correo no sea @inacapmail.cl o @inacap.cl
exports.blockInvalidDomain = functions.auth.user().onCreate(async (user) => {
  const email = user.email || '';
  const allowed = /@(?:inacapmail\.cl|inacap\.cl)$/i;

  if (!allowed.test(email)) {
    try {
      await admin.auth().deleteUser(user.uid);
      console.log('Usuario eliminado por dominio no permitido:', email);
    } catch (err) {
      console.error('Error eliminando usuario:', email, err);
    }
  } else {
    console.log('Usuario permitido:', email);
  }
});

setGlobalOptions({ maxInstances: 10 });


// Notifica cuando llega un mensaje privado (DM)
exports.notifyOnDmMessage = functions.firestore
  .document('dmChats/{chatId}/messages/{messageId}')
  .onCreate(async (snap, context) => {
    const message = snap.data();
    const chatId = context.params.chatId;

    // Obtener participantes desde el chat raíz
    const chatRef = admin.firestore().collection('dmChats').doc(chatId);
    const chatDoc = await chatRef.get();
    if (!chatDoc.exists) return;
    const chat = chatDoc.data() || {};
    const participants = chat.participants || [];
    const senderUid = message.uid;
    const targetUid = participants.find((u) => u !== senderUid);
    if (!targetUid) return;

    // Buscar token FCM del receptor
    const userDoc = await admin.firestore().collection('users').doc(targetUid).get();
    const token = userDoc.exists ? userDoc.get('fcmToken') : null;
    if (!token) return;

    const bodyText = message.text && message.text.length > 120
      ? message.text.substring(0, 117) + '...'
      : (message.text || 'Nuevo mensaje privado');

    const payload = {
      notification: {
        title: chat.participantEmails && chat.participantEmails[senderUid] ? chat.participantEmails[senderUid] : 'Nuevo mensaje privado',
        body: bodyText,
      },
      data: {
        type: 'dm',
        chatId,
        senderUid: senderUid,
      },
    };

    try {
      await admin.messaging().sendToDevice(token, payload, {
        priority: 'high',
      });
      console.log('Notificación DM enviada a', targetUid);
    } catch (err) {
      console.error('Error enviando notificación DM:', err);
    }
  });

