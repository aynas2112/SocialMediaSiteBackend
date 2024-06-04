import express from "express";
import {getUser,followUser,testUser,signin} from "../controllers/user.js";
// import auth from "../middleware/auth.js";
const router = express.Router();

// router.get('/:email', getUserProfile);
router.get('/:id', getUser);
router.patch('/:id/follow', followUser);
router.get('/test', testUser);
router.post('/signin', signin);
// router.post('/new', auth, createPost);
// router.patch('/:id', auth, updatePost);
// router.delete('/:id', auth, deletePost);
// router.patch('/:id/likePost', auth, likePost);


export default router;