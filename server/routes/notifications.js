const router = require("express").Router();
const Notification = require("../models/Notification");
const { protect } = require("../middleware/auth");

router.get("/", protect, async (req, res, next) => {
  try { res.json(await Notification.find({ recipient: req.user._id }).sort({ createdAt: -1 })); } catch (e) { next(e); }
});
router.put("/:id/read", protect, async (req, res, next) => {
  try { res.json(await Notification.findOneAndUpdate({ _id: req.params.id, recipient: req.user._id }, { read: true }, { new: true })); } catch (e) { next(e); }
});
module.exports = router;
