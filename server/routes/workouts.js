const router = require("express").Router();
const Workout = require("../models/Workout");
const { protect } = require("../middleware/auth");

router.get("/", protect, async (req, res, next) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    res.json(await Workout.find(filter).populate("createdBy", "name role").sort({ createdAt: -1 }));
  } catch (e) { next(e); }
});
router.get("/:id", protect, async (req, res, next) => {
  try { res.json(await Workout.findById(req.params.id).populate("createdBy", "name role")); } catch (e) { next(e); }
});
router.post("/", protect, async (req, res, next) => {
  try {
    const workout = await Workout.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json(workout);
  } catch (e) { next(e); }
});
router.put("/:id", protect, async (req, res, next) => {
  try {
    const workout = await Workout.findOneAndUpdate({ _id: req.params.id, createdBy: req.user._id }, req.body, { new: true });
    if (!workout) return res.status(404).json({ message: "Workout not found or not owned by you" });
    res.json(workout);
  } catch (e) { next(e); }
});
router.delete("/:id", protect, async (req, res, next) => {
  try {
    const workout = await Workout.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });
    if (!workout) return res.status(404).json({ message: "Workout not found or not owned by you" });
    res.json({ message: "Workout deleted" });
  } catch (e) { next(e); }
});
module.exports = router;
