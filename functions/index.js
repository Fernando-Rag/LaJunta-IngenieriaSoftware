
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
exports.notifyOnDmMessage = functions.region('southamerica-east1').firestore.document('dmChats/{chatId}/messages/{messageId}').onCreate(async (snap, context) => {
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


  // Solo mostrar el correo del remitente
  let senderEmail = '';
  if (chat.participantEmails && chat.participantEmails[senderUid]) {
    senderEmail = chat.participantEmails[senderUid];
  } else {
    senderEmail = 'Nuevo mensaje privado';
  }

  // Icono personalizado (debe existir en mipmap/ic_launcher)
  const androidNotification = {
    icon: 'ic_notification', // nombre del icono en drawable
    color: '#FF4A4A', // color de la app
    clickAction: 'FLUTTER_NOTIFICATION_CLICK',
    channelId: 'default',
    priority: 'high',
  };

  const payload = {
    notification: {
      title: senderEmail,
      body: unreadCount === 1 ? '1 mensaje nuevo' : `${unreadCount} mensajes nuevos`,
      icon: 'ic_notification',
      click_action: 'FLUTTER_NOTIFICATION_CLICK',
      color: '#FF4A4A',
      channel_id: 'default',
    },
    android: androidNotification,
    data: {
      type: 'dm',
      chatId,
      senderUid: senderUid,
      unreadCount: unreadCount.toString(),
      senderEmail: senderEmail,
      click_action: 'FLUTTER_NOTIFICATION_CLICK',
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

