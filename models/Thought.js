const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => new Date(timestamp).toLocaleString(),
  },
});

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => new Date(timestamp).toLocaleString(),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
});

// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = { Thought }