const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Thought = require("../../models/Thought");

router.get("/", async (req, res) => {
  try {
    const thought = await Thought.find();
    res.json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }
    res.status(200).json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
    await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $push: { thoughts: thought._id } },
      { new: true }
    );
    res.status(201).json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
      }
    );
    if (!thought) {
      return res.status(404).json({ message: "Thought not found" });
    }
    res.json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const thought = Thought.findByIdAndDelete(req.params.id);
    await User.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { thoughts: req.params.id },
      },
      { new: true }
    );
    res.json({ message: "Thought deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/:id/reactions", async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.id,
      { $push: { reactions: req.body } },
      { new: true }
    );
    res.status(200).json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/:id/reactions/:reactionId", async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.id,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );
    res.json({ message: "Reaction deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
