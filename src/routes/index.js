const express = require("express");
const { check } = require("express-validator");
const logger = require("morgan");
const { UserCtrl, HomeCtrl, AuthCtrl, PostCtrl } = require("../controllers");
const auth = require("../middleware/auth.middleware");

// application state
const dev = process.env.NODE_ENV !== "production";

const createRoutes = (app) => {
  // list of controllers for routes
  const HomeController = new HomeCtrl();
  const AuthController = new AuthCtrl();
  const UserController = new UserCtrl();
  const PostController = new PostCtrl();

  // middleware
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use("/public", express.static("public"));
  app.use(logger(dev ? "dev" : "production"));
  app.use((_req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
  });

  app.get("/", HomeController.index);

  app.post(
    "/api/auth/register",
    [
      check("email", "Incorrect email").isEmail(),
      check("password", "Minimum password length 6 characters").isLength({
        min: 6,
      }),
    ],
    AuthController.register
  );

  app.post(
    "/api/auth/login",
    [
      check("email", "Please enter a valid email").normalizeEmail().isEmail(),
      check("password", "Enter password").exists(),
    ],
    AuthController.login
  );

  app.get("/api/users/me", auth, UserController.getUserById);
  app.get("/api/users/:id", auth, UserController.getUserById);

  app.get("/api/posts", auth, PostController.getPosts);
  app.get("/api/posts/:id", auth, PostController.getPosts);
  app.post("/api/posts/:id", auth, PostController.savePost);
  app.delete("/api/posts/:id", auth, PostController.removePost);
};

module.exports = createRoutes;
