const router = require("express").Router();
const { verifyTokenAndIsAdmin } = require("../middlewares/verifyToken");
const Photo = require("../models/Photo");

//UPLOAD
router.post("/upload", verifyTokenAndIsAdmin, async (req, res) => {
  const newPhoto = new Photo({
    userId: req.body.userId,
    desc: req.body.desc,
    img: req.body.img,
  });
  try {
    const savedPhoto = await newPhoto.save();
    res.status(200).json(savedPhoto);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Add comment
router.put("/addcomment/:id", async (req, res) => {
  try {
    const updatedPhoto = await Photo.findByIdAndUpdate(
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

router.get("/all", async (req, res) => {
  try {
    const photos = await Photo.find().sort({ createdAt: -1 });
    res.status(200).json(photos);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
