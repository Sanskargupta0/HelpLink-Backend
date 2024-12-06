const express = require("express");
const cors = require("cors");
const { errorHandler } = require("supertokens-node/framework/express");
const { middleware } = require("supertokens-node/framework/express");
const errorMiddleware = require("./server/Middlewares/error_middleware");
const supertokens = require("./server/Utils/SuperTokens");
const {
  verifySession,
} = require("supertokens-node/recipe/session/framework/express");
const userRouter = require("./server/Routers/userData-routes");
const connectDB = require("./server/Utils/db");
const dotenv = require("dotenv");
dotenv.config();
const app = express();


app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    allowedHeaders: ["Content-Type", ...supertokens.getAllCORSHeaders()],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


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
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
