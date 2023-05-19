const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
  },
  thoughts: [{}],
  friends: [{}],
});

// Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.

const User = mongoose.model("User", userSchema);

module.exports = { User };
