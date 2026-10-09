const express = require("express");
const Router = express.Router();

const {
  UserRegister,
  UserLogin,
  UserLogout
} = require("../controllers/authController");

Router.post("/register", UserRegister);
Router.post("/Login", UserLogin);
Router.post("/Logout", UserLogout);

module.exports = Router;