
// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");
// const http = require("http");
// const path = require("path");
// const { Server } = require("socket.io");

// const postRoutes = require("./routes/postRoutes");
// const { setSocketIO } = require("./socket");

// dotenv.config();

// const PORT = process.env.PORT || 5000;

// const app = express();
// const server = http.createServer(app);

// // ==========================================
// // CORS
// // ==========================================

// const allowedOrigins = [
//   "http://localhost:5173",
//   "http://localhost:5174",
//   process.env.FRONTEND_URL,
// ].filter(Boolean);

// app.use(
//   cors({
//     origin: allowedOrigins,
//     methods: ["GET", "POST", "DELETE"],
//   })
// );

// app.use(express.json());

// // ==========================================
// // SOCKET.IO
// // ==========================================

// const io = new Server(server, {
//   cors: {
//     origin: allowedOrigins,
//     methods: ["GET", "POST", "DELETE"],
//   },
// });

// // ==========================================
// // MONGODB
// // ==========================================

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB connected successfully!");
//   })
//   .catch((error) => {
//     console.error(
//       "MongoDB connection failed:",
//       error.message
//     );
//   });

// // ==========================================
// // API ROUTES
// // ==========================================

// app.use("/api/posts", postRoutes);

// // ==========================================
// // HEALTH CHECK
// // ==========================================

// app.get("/api/health", (req, res) => {
//   res.json({
//     success: true,
//     message: "CollabBoard API is running successfully!",
//   });
// });

// // ==========================================
// // SOCKET.IO CONNECTION
// // ==========================================

// io.on("connection", (socket) => {
//   console.log("🟢 User connected:", socket.id);

//   console.log(
//     "👥 Total connected users:",
//     io.engine.clientsCount
//   );

//   socket.on("disconnect", (reason) => {
//     console.log(
//       "🔴 User disconnected:",
//       socket.id,
//       "Reason:",
//       reason
//     );

//     console.log(
//       "👥 Total connected users:",
//       io.engine.clientsCount
//     );
//   });
// });

// // Make Socket.IO available to routes
// setSocketIO(io);

// // ==========================================
// // SERVE REACT FRONTEND
// // ==========================================

// const frontendPath = path.join(
//   __dirname,
//   "../../client/dist"
// );

// app.use(express.static(frontendPath));

// app.get("*", (req, res) => {
//   res.sendFile(
//     path.join(frontendPath, "index.html")
//   );
// });

// // ==========================================
// // START SERVER
// // ==========================================

// server.listen(PORT, () => {
//   console.log(
//     `Server running on port ${PORT}`
//   );
// });


const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const postRoutes = require("./routes/postRoutes");
const { setSocketIO } = require("./socket");

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

// ==========================================
// CORS
// ==========================================

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "DELETE"],
  })
);

app.use(express.json());

// ==========================================
// SOCKET.IO
// ==========================================

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "DELETE"],
  },
});

// ==========================================
// MONGODB
// ==========================================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((error) => {
    console.error(
      "MongoDB connection failed:",
      error.message
    );
  });

// ==========================================
// API ROUTES
// ==========================================

app.use("/api/posts", postRoutes);

// ==========================================
// HEALTH CHECK
// ==========================================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "CollabBoard API is running successfully!",
  });
});

// ==========================================
// SOCKET.IO CONNECTION
// ==========================================

io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  console.log(
    "👥 Total connected users:",
    io.engine.clientsCount
  );

  socket.on("disconnect", (reason) => {
    console.log(
      "🔴 User disconnected:",
      socket.id,
      "Reason:",
      reason
    );

    console.log(
      "👥 Total connected users:",
      io.engine.clientsCount
    );
  });
});

// Make Socket.IO available to routes
setSocketIO(io);

// ==========================================
// SERVE REACT FRONTEND
// ==========================================

const frontendPath = path.join(
  __dirname,
  "../client/dist"
);

app.use(express.static(frontendPath));

app.get("/*splat", (req, res) => {
  res.sendFile(
    path.join(frontendPath, "index.html")
  );
});

// ==========================================
// START SERVER
// ==========================================

server.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});