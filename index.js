const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { quizRouter } = require("./routes/quiz.route");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Quiz App");
});

app.use("/", userRouter);
app.use("/", quizRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connected to DB");
  } catch (error) {
    console.log(error);
  }

  console.log(`server running on ${process.env.PORT}`);
});
