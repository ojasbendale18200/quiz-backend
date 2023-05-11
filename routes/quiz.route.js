const { QuizModel } = require("../model/quiz.model");

const { Router } = require("express");

const quizRouter = Router();

quizRouter.get("/dashboard", async (req, res) => {
  try {
    const quiz = await QuizModel.find();

    res.status(200).send(quiz);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

quizRouter.post("/dashboard", async (req, res) => {
  const payload = req.body;
  try {
    const quiz = new QuizModel(payload);
    await quiz.save();
    res.status(201).send({ message: "Quiz has been added" });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

module.exports = { quizRouter };
