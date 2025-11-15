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

