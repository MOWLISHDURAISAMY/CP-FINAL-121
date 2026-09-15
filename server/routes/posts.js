const router = require("express").Router();
const Post = require("../models/Post");
const Notification = require("../models/Notification");
const { protect } = require("../middleware/auth");

router.get("/", protect, async (req, res, next) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    res.json(await Post.find(filter).populate("author", "name role category").populate("comments.user", "name").sort({ createdAt: -1 }));
  } catch (e) { next(e); }
});
router.post("/", protect, async (req, res, next) => {
  try {
    const post = await Post.create({ ...req.body, author: req.user._id });
    res.status(201).json(await post.populate("author", "name role category"));
  } catch (e) { next(e); }
});
router.post("/:id/like", protect, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    const exists = post.likes.some(id => id.equals(req.user._id));
    if (exists) post.likes = post.likes.filter(id => !id.equals(req.user._id));
    else post.likes.push(req.user._id);
    await post.save();
    if (!exists && !post.author.equals(req.user._id))
      await Notification.create({ recipient: post.author, message: `${req.user.name} liked your post`, type: "like" });
    res.json(post);
  } catch (e) { next(e); }
});
router.post("/:id/comments", protect, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    post.comments.push({ user: req.user._id, text: req.body.text });
    await post.save();
    if (!post.author.equals(req.user._id))
      await Notification.create({ recipient: post.author, message: `${req.user.name} commented on your post`, type: "comment" });
    res.json(await post.populate(["author", "comments.user"]));
  } catch (e) { next(e); }
});
router.delete("/:id", protect, async (req, res, next) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.id, author: req.user._id });
    if (!post) return res.status(404).json({ message: "Post not found or not owned by you" });
    res.json({ message: "Post deleted" });
  } catch (e) { next(e); }
});
module.exports = router;
