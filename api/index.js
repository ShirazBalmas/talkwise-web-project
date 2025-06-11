const express = require('express');
const app = express();

// const PORT = 3000; // No longer needed for Vercel serverless

const admin = require("firebase-admin");
// const serviceAccount = require("./serviceAccountKey.json"); // This line will be removed or commented out

// Use environment variable for Firebase service account key
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

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

// Simplified CORS configuration for Vercel
app.use(cors({
    origin: ['http://localhost:5173', 'https://web12-eight.vercel.app', 'https://web1-nhwiorv1l-shirazs-projects-129c0740.vercel.app'], // Add your Vercel frontend domain here
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Routes
const users = require("./routes/users.route");
app.use("/", users);

// Important: Export the Express app for Vercel Serverless Function
module.exports = app;
