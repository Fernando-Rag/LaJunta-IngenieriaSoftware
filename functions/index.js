
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// Elimina cualquier cuenta cuyo correo no sea @inacapmail.cl o @inacap.cl
// exports.blockInvalidDomain = functions.auth.user().onCreate(async (user) => {
//   const email = user.email || '';
//   const allowed = /@(?:inacapmail\.cl|inacap\.cl)$/i;
//
//   if (!allowed.test(email)) {
//     try {
//       await admin.auth().deleteUser(user.uid);
//       console.log('Usuario eliminado por dominio no permitido:', email);
//     } catch (err) {
//       console.error('Error eliminando usuario:', email, err);
//     }
//     return null;
//   }
//   console.log('Usuario permitido:', email);
//   return null;
// });


// Notifica cuando llega un mensaje privado (DM)
exports.notifyOnDmMessage = functions.firestore.document('dmChats/{chatId}/messages/{messageId}').onCreate(async (snap, context) => {
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

  // Buscar token FCM del receptor (último registrado)
  const userDoc = await admin.firestore().collection('users').doc(targetUid).get();
  const token = userDoc.exists ? userDoc.get('fcmToken') : null;
  console.log('Token FCM usado para', targetUid, ':', token);
  if (!token) return;

  // Contar mensajes no leídos del receptor en este chat
  const msgsSnap = await chatRef.collection('messages').get();
  let unreadCount = 0;
  msgsSnap.forEach((msg) => {
    const d = msg.data();
    if (d.uid !== targetUid && !(Array.isArray(d.readBy) && d.readBy.includes(targetUid))) {
      unreadCount++;
    }
  });

  if (unreadCount === 0) return; // No notificar si no hay mensajes nuevos

  // Obtener nombre si existe, si no el correo
  let senderNameOrEmail = 'Nuevo mensaje privado';
  if (chat.participantNames && chat.participantNames[senderUid]) {
    senderNameOrEmail = chat.participantNames[senderUid];
  } else if (chat.participantEmails && chat.participantEmails[senderUid]) {
    senderNameOrEmail = chat.participantEmails[senderUid];
  }

  const payload = {
    notification: {
      title: `${senderNameOrEmail} te envió un mensaje`,
      body: unreadCount === 1 ? 'Tienes 1 mensaje nuevo' : `Tienes ${unreadCount} mensajes nuevos`,
    },
    data: {
      type: 'dm',
      chatId,
      senderUid: senderUid,
      unreadCount: unreadCount.toString(),
    },
  };

  try {
      await admin.messaging().send({
        token,
        notification: payload.notification,
        data: payload.data,
        android: { priority: 'high' }
      });
      console.log('Notificación DM enviada a', targetUid, 'con', unreadCount, 'no leídos');
    } catch (err) {
      if (err && err.errorInfo) {
        console.error('Error FCM:', err.errorInfo.code, err.errorInfo.message);
      } else {
        console.error('Error enviando notificación DM:', err);
      }
  }
});

