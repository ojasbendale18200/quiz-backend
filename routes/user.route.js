const { Router } = require("express");
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = Router();

// register
userRouter.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      res.status(400).send({ message: "User alreadt exist,please Login" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        const saveUser = new UserModel({
          email,
          password: hash,
        });
        await saveUser.save();
        res.status(201).send({ message: "User registered" });
      });
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

// Login
userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email: email });
  try {
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.status(200).send({
            message: "Login successfull",
            token: jwt.sign({ userId: user._id }, "masai"),
          });
        } else {
          res.status(400).send({ message: "Invalid Credentials" });
        }
      });
    } else {
      res.status(400).send({ message: "User not found" });
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

module.exports = { userRouter };
