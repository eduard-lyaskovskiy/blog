const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const UserModel = require("../models/User");
const { validationResult } = require("express-validator");
const handleError = require("../utils/handle.error");

const secret = config.get("jwtSecret");

class AuthController {
  async register(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect registration data",
        });
      }

      const { email, password } = req.body;

      const candidate = await UserModel.findOne({
        email: {
          $regex: new RegExp(email, "i"),
        },
      });

      if (candidate) {
        return res.status(400).json({ message: "This user already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new UserModel({
        email,
        password: hashedPassword,
      });

      await user.save((err, user) => {
        if (err) return handleError(500, err.message, res);

        const token = jwt.sign({ userId: user.id }, secret, {
          expiresIn: "1h",
        });

        res.status(201).json({
          message: "User created!",
          status: "success",
          token,
          userId: user.id,
        });
      });
    } catch (e) {
      return handleError(500, e.message, res);
    }
  }

  async login(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect authorization data",
        });
      }

      // accept email and password for login from request body
      const { email, password } = req.body;

      const user = await UserModel.findOne({
        email: {
          $regex: new RegExp(email, "i"),
        },
      });

      if (!user) {
        return res.status(400).json({ message: "User is not found!" });
      }
      // compare the password from the base and the entered password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Invalid password, please try again" });
      }

      // create a token based on userId, we also pass in the parameters the secret key and the duration of the token (its session) in 1 hour
      const token = jwt.sign({ userId: user.id }, secret, { expiresIn: "1h" });

      res.status(200).json({
        token,
        message: "You are logged in!",
        status: "success",
        userId: user.id,
      });
    } catch (e) {
      return handleError(500, e.message, res);
    }
  }
}

module.exports = AuthController;
