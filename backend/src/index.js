// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import path from "path";

// import { connectDB } from "./lib/db.js";
// import authRoutes from "./routes/auth.route.js";
// import messageRoutes from "./routes/message.route.js";
// import { app, server } from "./lib/socket.js";  // Assuming you have socket setup here

// dotenv.config();

// // Port configuration
// const PORT = process.env.PORT || 5001;
// const __dirname = path.resolve();

// // ✅ CORS allowed origins
// const allowedOrigins = [
//   "http://localhost:5173", // Local development URL
//   "https://chit-chat-by-aleeza-s73i.vercel.app", // Your Vercel frontend
//   "https://chit-chat-by-aleeza-s73i-8y0npdets-aleeze123s-projects.vercel.app", // Add the exact frontend URL here
//   "https://chitchat-by-aleeza.railway.app", // Railway URL
// ];

// // ✅ Middleware setup
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: allowedOrigins,  // Allow the correct origin
//     credentials: true,  // Allow cookies and other credentials
//   })
// );

// // ✅ Routes setup
// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);

// // ✅ Serve frontend in production (only when NODE_ENV is 'production')
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist"))); // Serve the build files

//   // Handle all other routes by sending the frontend index.html
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//   });
// }

// // ✅ Start the HTTP server and WebSocket server
// server.listen(PORT, () => {
//   console.log("Server is running on PORT:" + PORT);
//   connectDB();  // Ensure DB connection is established
// });




import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";  // Assuming socket setup

dotenv.config();

// Port configuration
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// ✅ CORS allowed origins from ENV
const allowedOrigins = [
  process.env.FRONTEND_URL,       // main frontend
  "http://localhost:5173",         // local dev (optional)
];

// ✅ Middleware setup
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// ✅ Routes setup
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// ✅ Serve frontend in production (only when NODE_ENV is 'production')
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// ✅ Start the HTTP server and WebSocket server
server.listen(PORT, () => {
  console.log("✅ Server is running on PORT:", PORT);
  connectDB();
});
