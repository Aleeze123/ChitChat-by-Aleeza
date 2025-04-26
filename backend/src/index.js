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
import { fileURLToPath } from "url";

// Database and Socket
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

// Routes
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

// Configuration
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5001;

// ✅ CORS Configuration
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "https://chit-chat-by-aleeza-s73i.vercel.app",
  "http://localhost:5173",
].filter(Boolean);

console.log("🔄 Allowed Origins:", allowedOrigins);

// ✅ Middleware Setup
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Enhanced CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`🚨 CORS Blocked: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests
app.options("*", cors());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// ✅ Serve Frontend in Production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  });
}

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// ✅ Start Server
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🟢 Allowed origins: ${allowedOrigins.join(", ")}`);
  connectDB().then(() => console.log("🟢 Database connected"));
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("🚨 Unhandled Rejection:", err);
  server.close(() => process.exit(1));
});
