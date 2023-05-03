// Required variable
const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env.local" });
// Fixed value veriable
const salt = 12;
const JWT_TOKEN = "YOUDONTHACKTHISSTRINGTOUSEILLEGALWORK";

let success = false;

// Create user registeration end point
router.post(
  "/createUser",
  [
    // Validation
    body("name", "Enter correct name").isLength({ min: 3 }),
    body("mail", "Enter correct email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // Check valid data
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).json({ success, errors: result.array() });
    }

    try {
      // Check user email is exsist or not
      let user = await User.findOne({ mail: req.body.mail });

      if (user) {
        return res
          .status(400)
          .json({ message: "This mail is already exsist in our db" });
      }

      // Create new user
      bcrypt.hash(req.body.password, salt).then(async (pass, err) => {
        user = await User.create({
          name: req.body.name,
          mail: req.body.mail,
          password: pass,
        });
      });
      success = true;
      res
        .status(200)
        .json({ success, message: "You are suucessfully registered" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ messagr: "Internal error accoured" });
    }
  }
);

// Login end point without require
router.post(
  "/loginUser",
  [
    // Validation
    body("mail", "Enter correct email").isEmail(),
    body("password", "Enter a valid password").exists(),
  ],
  async (req, res) => {
    const { mail, password } = req.body;

    // Check valid data
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).json({ success, errors: result.array() });
    }

    try {
      // Fetch user
      let user = await User.findOne({ mail });
      // Check email
      if (!user) {
        return res
          .status(400)
          .json({ success, message: "Enter correct details to login" });
      }
      // Check password
      let comparePassword = await bcrypt.compare(password, user.password);

      if (!comparePassword) {
        return res
          .status(400)
          .json({ success, message: "Enter correct details to login" });
      }
      // Create data for get tokan
      const data = {
        user: {
          id: user._id,
        },
      };
      // Create tokan
      const authToken = jwt.sign(data, JWT_TOKEN);
      // Send tokan
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.log(error);
      res.status(500).json({ messagr: "Internal error accoured" });
    }
  }
);

// Fetch user details login required
router.post("/getUserDetails", async (req, res) => {
  // Get tokan
  const token = req.header("auth-token");
  // Check tokan
  if (!token) {
    return res
      .status(401)
      .send({ success, message: "Pleas enter a vaild token" });
  }
  try {
    // Verify tokan
    const data = jwt.verify(token, JWT_TOKEN);
    // Get user i
    const userId = data.user.id;
    // Fetch user form db
    const user = await User.findById(userId).select("-password");
    // Send user
    res.send(user);
  } catch (error) {
    success = true;
    res.status(500).json({ success, message: "Internal Server Error" });
  }
});

module.exports = router;
