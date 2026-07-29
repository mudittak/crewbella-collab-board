

// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");
// const http = require("http");
// const { Server } = require("socket.io");

// const postRoutes = require("./routes/postRoutes");
// const { setSocketIO } = require("./socket");

// dotenv.config();
// const PORT = process.env.PORT || 5000;

// const app = express();
// const server = http.createServer(app);

// // Socket.IO
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "DELETE"],
//   },
// });

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB connected successfully!");
//   })
//   .catch((error) => {
//     console.error("MongoDB connection failed:", error.message);
//   });

// // Routes
// app.use("/api/posts", postRoutes);

// // Health Check
// app.get("/api/health", (req, res) => {
//   res.json({
//     success: true,
//     message: "CollabBoard API is running successfully!",
//   });
// });

// // Socket.IO Connection
// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });
// setSocketIO(io);

// // Start Server
// server.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const http = require("http");
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
];

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
    console.log(
      "MongoDB connected successfully!"
    );
  })
  .catch((error) => {
    console.error(
      "MongoDB connection failed:",
      error.message
    );
  });

// ==========================================
// ROUTES
// ==========================================

app.use(
  "/api/posts",
  postRoutes
);

// ==========================================
// HEALTH CHECK
// ==========================================

app.get(
  "/api/health",
  (req, res) => {
    res.json({
      success: true,
      message:
        "CollabBoard API is running successfully!",
    });
  }
);

// ==========================================
// SOCKET.IO CONNECTION
// ==========================================

io.on(
  "connection",
  (socket) => {
    console.log(
      "🟢 User connected:",
      socket.id
    );

    console.log(
      "👥 Total connected users:",
      io.engine.clientsCount
    );

    socket.on(
      "disconnect",
      (reason) => {
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
      }
    );
  }
);

// Make Socket.IO available to routes
setSocketIO(io);

// ==========================================
// START SERVER
// ==========================================

server.listen(
  PORT,
  () => {
    console.log(
      `Server running on http://localhost:${PORT}`
    );
  }
);