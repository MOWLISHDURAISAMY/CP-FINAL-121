const mongoose = require("mongoose");
const memberSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  goals: [{ type: String }],
  fitnessLevel: { type: String, default: "Beginner" },
  preferredCategory: { type: String, default: "General Fitness" },
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }
}, { timestamps: true });
module.exports = mongoose.model("Member", memberSchema);
