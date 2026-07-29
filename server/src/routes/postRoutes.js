// const express = require("express");
// const Post = require("../models/Post");

// const router = express.Router();

// // CREATE a new post
// router.post("/", async (req, res) => {
//   try {
//     const { name, message } = req.body;

//     if (!name || !message) {
//       return res.status(400).json({
//         success: false,
//         message: "Name and message are required",
//       });
//     }

//     const newPost = await Post.create({
//       name,
//       message,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Post created successfully",
//       data: newPost,
//     });
//   } catch (error) {
//     console.error("Create post error:", error);

//     res.status(500).json({
//       success: false,
//       message: "Failed to create post",
//     });
//   }
// });

// // GET all posts
// router.get("/", async (req, res) => {
//   try {
//     const posts = await Post.find().sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       data: posts,
//     });
//   } catch (error) {
//     console.error("Get posts error:", error);

//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch posts",
//     });
//   }
// });

// // DELETE a post
// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedPost = await Post.findByIdAndDelete(req.params.id);

//     if (!deletedPost) {
//       return res.status(404).json({
//         success: false,
//         message: "Post not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Post deleted successfully",
//     });
//   } catch (error) {
//     console.error("Delete post error:", error);

//     res.status(500).json({
//       success: false,
//       message: "Failed to delete post",
//     });
//   }
// });

// module.exports = router;
const express = require("express");
const Post = require("../models/Post");
const { getSocketIO } = require("../socket");

const router = express.Router();

// CREATE POST
router.post("/", async (req, res) => {
  try {
    const { name, message } = req.body;

    if (!name || !message) {
      return res.status(400).json({
        success: false,
        message: "Name and message are required",
      });
    }

    const newPost = await Post.create({
      name,
      message,
    });

    const io = getSocketIO();

    if (io) {
      io.emit("post-created", newPost);
    }

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: newPost,
    });
  } catch (error) {
    console.error("Create post error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create post",
    });
  }
});

// GET POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error("Get posts error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
    });
  }
});

// DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const io = getSocketIO();

    if (io) {
      io.emit("post-deleted", req.params.id);
    }

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("Delete post error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete post",
    });
  }
});

module.exports = router;