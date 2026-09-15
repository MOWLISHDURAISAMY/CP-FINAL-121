const router = require("express").Router();
const Member = require("../models/Member");
const { protect, allowRoles } = require("../middleware/auth");

router.get("/", protect, async (req, res, next) => {
  try { res.json(await Member.find().populate("user", "name email role category").populate("trainer", "name email")); } catch (e) { next(e); }
});
router.get("/:id", protect, async (req, res, next) => {
  try { res.json(await Member.findById(req.params.id).populate("user", "name email role category").populate("trainer", "name email")); } catch (e) { next(e); }
});
router.post("/", protect, async (req, res, next) => {
  try { res.status(201).json(await Member.create({ ...req.body, user: req.body.user || req.user._id })); } catch (e) { next(e); }
});
router.put("/:id", protect, async (req, res, next) => {
  try { res.json(await Member.findByIdAndUpdate(req.params.id, req.body, { new: true })); } catch (e) { next(e); }
});
router.delete("/:id", protect, allowRoles("admin"), async (req, res, next) => {
  try { await Member.findByIdAndDelete(req.params.id); res.json({ message: "Member deleted" }); } catch (e) { next(e); }
});
module.exports = router;
