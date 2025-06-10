const express = require('express');
const app = express();
const PORT = 3000;

const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://webteam5-default-rtdb.firebaseio.com" // ✅ Required for Realtime DB
});

const db = admin.database();  // ✅ Use Realtime Database here
app.set("db", db);

// Middleware
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Routes
const users = require("./routes/users.route");
app.use("/", users);

// Start server
app.listen(PORT, (err) => {
    if (!err) console.log('Server is running on port', PORT);
    else console.log("Error, can't start server", err);
});
