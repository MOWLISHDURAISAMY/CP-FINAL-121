const mongoose = require("mongoose");
const trainerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  specialization: { type: String, required: true },
  experienceYears: { type: Number, default: 0 },
  certifications: [{ type: String }],
  availability: { type: String, default: "Contact trainer" }
}, { timestamps: true });
module.exports = mongoose.model("Trainer", trainerSchema);
