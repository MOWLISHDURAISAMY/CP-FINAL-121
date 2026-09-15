require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const workoutRoutes = require("./routes/workouts");
const memberRoutes = require("./routes/members");
const trainerRoutes = require("./routes/trainers");
const postRoutes = require("./routes/posts");
const notificationRoutes = require("./routes/notifications");

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ message: "Fitness Community API is running" }));

app.use("/api/auth", authRoutes);
app.use("/api/workout", workoutRoutes);
app.use("/api/member", memberRoutes);
app.use("/api/trainer", trainerRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/fitness_community")
  .then(() => app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`)))
  .catch(err => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
