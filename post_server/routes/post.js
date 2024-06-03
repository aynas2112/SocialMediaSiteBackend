import express from "express";
import {createPost} from "../controllers/post.js";
// import auth from "../middleware/auth.js";
const router = express.Router();
import multer from "multer";
const upload = multer({ dest: 'uploads/' });

// router.get('/:email', getUserProfile);
router.post('/',upload.single('file'), createPost);
// router.patch('/:id/follow', followUser);
// router.post('/new', auth, createPost);
// router.patch('/:id', auth, updatePost);
// router.delete('/:id', auth, deletePost);
// router.patch('/:id/likePost', auth, likePost);


export default router;