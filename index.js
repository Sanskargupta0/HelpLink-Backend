const dotenv = require("dotenv");
dotenv.config();
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const connectDB = require("./server/Utils/db");
const socketIo = require("socket.io");
const cors = require("cors");
const { errorHandler } = require("supertokens-node/framework/express");
const { middleware } = require("supertokens-node/framework/express");
const errorMiddleware = require("./server/Middlewares/error_middleware");
const supertokens = require("./server/Utils/SuperTokens");
const {
  verifySession,
} = require("supertokens-node/recipe/session/framework/express");
const userRouter = require("./server/Routers/userData-routes");

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    allowedHeaders: ["Content-Type", ...supertokens.getAllCORSHeaders()],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      ...supertokens.getAllCORSHeaders(),
    ],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("authenticate", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} connected`);
  });

  socket.on("disconnect", () => {
    socket.leave(socket.id);
    console.log("User disconnected");
  });
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.get("/", (req, res) => {
  res.status(200).send("Health check passed");
});

app.use(middleware());

app.use(verifySession());

app.use("/", userRouter);

app.use(errorHandler());

app.use(errorMiddleware);

const port = process.env.PORT || 3001;
connectDB().then(() => {
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
