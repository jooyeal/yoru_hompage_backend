const router = require("express").Router();
const { verifyTokenAndIsAdmin } = require("../middlewares/verifyToken");
const Post = require("../models/Post");

//upload post
router.post("/upload", async (req, res) => {
  const newPost = new Post({ ...req.body });
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete post
router.delete("/:id", verifyTokenAndIsAdmin, async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get post
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get post from id
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//add comment
router.put("/addcomment/:id", async (req, res) => {
  try {
    const updatedPhoto = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: { comments: req.body },
      },
      { new: true }
    );
    res.status(200).json(updatedPhoto);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
