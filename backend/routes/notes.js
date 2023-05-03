const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env.local" });
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const JWT_TOKEN = "YOUDONTHACKTHISSTRINGTOUSEILLEGALWORK";
let success = false;

router.get("/fetchAllNotes", async (req, res) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ success, message: "Please enter a valid token" });
  }
  try {
    const userId = getUserId(token);
    const note = await Notes.find({ user: userId });
    success = true;
    res.send({ success, note });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success, message: "Internal Server Error" });
  }
});

router.post(
  "/addNote",
  [
    // Validation
    body("title", "Enter a valid title").isLength({ min: 5 }),
    body("description", "Enter a valid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // Check valid data
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).json({ success, errors: result.array() });
    }

    const token = req.header("auth-token");
    if (!token) {
      return res
        .status(401)
        .send({ success, message: "Please enter a valid token" });
    }
    const { title, description, tag } = req.body;
    try {
      const userId = getUserId(token);
      let note = Notes({
        user: userId,
        title: title,
        description: description,
        tag: tag !== "" && tag,
      });
      await note.save();
      success = true;
      res.send({ success, note });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success, messagr: "Internal error accoured" });
    }
  }
);

router.put("/updateNote/:id", async (req, res) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ success, message: "Please enter a valid token" });
  }
  const { title, description, tag } = req.body;
  const userId = getUserId(token);
  try {
    let updateNote = {};
    if (title) {
      updateNote.title = title;
    }
    if (description) {
      updateNote.description = description;
    }
    if (tag) {
      updateNote.tag = tag;
    }

    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ success, message: "Note not found" });
    }

    if (note.user.toString() !== userId) {
      return res
        .status(401)
        .json({
          success,
          message: "You don't have rights to update this note",
        });
    }

    note = await Notes.findByIdAndUpdate(req.params.id, updateNote, {
      new: true,
    });
    success = true;
    res
      .status(200)
      .json({ success, message: "Your note was update", note: note });
  } catch (error) {
    console.log(error);
    res.status(500).json({ messagr: "Internal error accoured" });
  }
});

router.delete("/deleteNote/:id", async (req, res) => {
  const token = req.header("auth-token");
  if (!token) {
    return res
      .status(401)
      .send({ success, message: "Please enter a valid token" });
  }
  const userId = getUserId(token);
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ success, message: "Note not found" });
    }

    if (note.user.toString() !== userId) {
      return res
        .status(401)
        .json({
          success,
          message: "You are not right user to update this note",
        });
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    success = true;
    res.status(200).json({ success, message: "Your note was deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success, messagr: "Internal error accoured" });
  }
});

const getUserId = (token) => {
  try {
    const data = jwt.verify(token, JWT_TOKEN);
    const userId = data.user.id;
    return userId;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = router;
