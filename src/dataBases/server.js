var admin = require("firebase-admin");

var serviceAccount = require("./prueba.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
