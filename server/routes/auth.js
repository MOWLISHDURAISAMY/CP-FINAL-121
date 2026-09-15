const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Member = require("../models/Member");
const Trainer = require("../models/Trainer");

function tokenFor(user) {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "2h" });
}

router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password, role = "member", category = "General Fitness" } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Name, email and password are required" });
    if (await User.findOne({ email })) return res.status(409).json({ message: "Email already registered" });
    if (!["member", "trainer"].includes(role)) return res.status(400).json({ message: "Public registration supports member or trainer" });
    const user = await User.create({ name, email, password: await bcrypt.hash(password, 10), role, category });
    if (role === "member") await Member.create({ user: user._id, preferredCategory: category });
    if (role === "trainer") await Trainer.create({ user: user._id, specialization: category });
    res.status(201).json({ token: tokenFor(user), user: { id: user._id, name, email, role, category } });
  } catch (e) { next(e); }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password || "", user.password)))
      return res.status(401).json({ message: "Invalid email or password" });
    res.json({ token: tokenFor(user), user: { id: user._id, name: user.name, email: user.email, role: user.role, category: user.category } });
  } catch (e) { next(e); }
});

module.exports = router;
