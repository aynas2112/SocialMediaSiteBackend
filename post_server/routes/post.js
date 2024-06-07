import express from "express";
import multer from "multer";
import { createPost } from "../controllers/posts.js";
// import auth from "../middleware/auth.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage});

// router.get('/:email', getUserProfile);
router.post('/',upload.single('file'), createPost);
// router.patch('/:id/follow', followUser);
// router.post('/new', auth, createPost);
// router.patch('/:id', auth, updatePost);
// router.delete('/:id', auth, deletePost);
// router.patch('/:id/likePost', auth, likePost);


export default router;