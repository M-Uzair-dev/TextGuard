const express = require("express");
const mongoose = require("mongoose");
const Message = require("./diaryschema.js");

const router = express.Router();

router.use(express.json());

mongoose.connect(
  "mongodb+srv://uzairmanandev:uzair576@diary.yehtud9.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

router.post("/new", async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const messageId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(messageId)) {
      return res.status(400).json({ message: "Invalid message ID" });
    }

    const updates = req.body;

    const updatedMessage = await Message.findByIdAndUpdate(messageId, updates, {
      new: true,
    });

    if (!updatedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.json(updatedMessage);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const messageId = req.params.id;
    const deletedMessage = await Message.findByIdAndRemove(messageId);

    if (!deletedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.json({ message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const idToFind = req.params.id; // Use req.params to extract the ID from the route parameter
    const messages = await Message.find({ userId: idToFind }); // Use "userId" to filter messages by the user's ID

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
