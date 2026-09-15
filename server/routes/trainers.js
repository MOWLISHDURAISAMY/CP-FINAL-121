const router = require("express").Router();
const Trainer = require("../models/Trainer");
const { protect } = require("../middleware/auth");

router.get("/", protect, async (req, res, next) => {
  try { res.json(await Trainer.find().populate("user", "name email category bio")); } catch (e) { next(e); }
});
router.get("/:id", protect, async (req, res, next) => {
  try { res.json(await Trainer.findById(req.params.id).populate("user", "name email category bio")); } catch (e) { next(e); }
});
router.post("/", protect, async (req, res, next) => {
  try { res.status(201).json(await Trainer.create({ ...req.body, user: req.body.user || req.user._id })); } catch (e) { next(e); }
});
router.put("/:id", protect, async (req, res, next) => {
  try { res.json(await Trainer.findByIdAndUpdate(req.params.id, req.body, { new: true })); } catch (e) { next(e); }
});
router.delete("/:id", protect, async (req, res, next) => {
  try { await Trainer.findByIdAndDelete(req.params.id); res.json({ message: "Trainer deleted" }); } catch (e) { next(e); }
});
module.exports = router;
