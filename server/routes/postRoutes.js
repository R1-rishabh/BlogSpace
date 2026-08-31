const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { optionalAuth } = require("../middleware/authMiddleware");

const {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    getMyPosts
} = require("../controllers/postController");

router.post("/", protect, createPost);
router.get("/", getAllPosts);
router.get("/my-posts", protect, getMyPosts);
router.get("/:id", optionalAuth, getPostById);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

module.exports = router;