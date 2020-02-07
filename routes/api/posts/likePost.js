const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const Post = require("../../../models/Post");

router.put("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // check if the post has already been liked by this user
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = likePost = router;
