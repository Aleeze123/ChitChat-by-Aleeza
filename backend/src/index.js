import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";  // Assuming you have socket setup here

dotenv.config();

// Port configuration
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// ✅ CORS Middleware with Vercel Preview Wildcard Support
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:5173",
        "https://chit-chat-by-aleeza-s73i.vercel.app",
        "https://chitchat-by-aleeza.railway.app",
      ];

      // ✅ Allow Vercel Preview Deploys
      const vercelPreviewRegex = /^https:\/\/chit-chat-by-aleeza-[\w-]+\.vercel\.app$/;

      if (
        !origin || // allow server-to-server or mobile apps
        allowedOrigins.includes(origin) ||
        vercelPreviewRegex.test(origin)
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    credentials: true,
  })
);

// ✅ Body parsing and cookie setup
app.use(express.json());
app.use(cookieParser());

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// ✅ Serve frontend static files (only in production)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// ✅ Start the server
server.listen(PORT, () => {
  console.log("✅ Server is running on PORT:", PORT);
  connectDB();
});
