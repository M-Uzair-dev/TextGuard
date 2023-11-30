const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("./userschema.js");

const router = express.Router();

router.use(express.json());

mongoose.connect(
  "mongodb+srv://uzairmanandev:uzair576@diary.yehtud9.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const getUserById = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(200).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

router.get("/", async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/new", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
      const { name, email, password } = req.body;
      const hashedpass = bcrypt.hashSync(password, 10);
      const newUser = new User({ name, email, password: hashedpass });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } else {
      return res.status(200).json({ message: "Email already in use" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// router.post("/new", async (req, res) => {
//   try {
//     const newUser = new User(req.body);
//     const savedUser = await newUser.save();
//     res.status(201).json(savedUser);
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// ... (your existing code)

router.post("/login", async (req, res) => {
  const useremail = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email: useremail });

    if (!user) {
      return res.status(200).json({ message: "No user with email" });
    } else {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        res.status(200).json({ user });
      } else {
        res.status(200).json({ message: "Wrong Password" });
      }
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.patch("/update/:id", getUserById, async (req, res) => {
  const updateFields = req.body;

  try {
    if (updateFields.name) {
      req.user.name = updateFields.name;
    }
    if (updateFields.email) {
      req.user.email = updateFields.email;
    }
    if (updateFields.password !== undefined) {
      req.user.password = updateFields.password;
    }
    await req.user.save();

    res
      .status(200)
      .json({ message: "User updated successfully", user: req.user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

module.exports = router;
