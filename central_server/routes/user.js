import express from "express";
import {getUser,followUser,testUser,signin, updateProfile, updateProfilePic, getFeed} from "../controllers/user.js";
import {auth} from "../middleware/auth.js";
const router = express.Router();
import upload from "../middleware/multer.js"



// router.get('/:email', getUserProfile);
// router.get('/:id', getUser);
router.get('/:id', auth, getUser);
router.patch('/:id/follow', auth, followUser);
router.get('/test', auth, testUser);
router.post('/signin', auth, signin);
router.post('/profile/update', auth, upload.single('image'),updateProfilePic);
router.patch('/profile/update', auth,updateProfile);
router.get('/feed', auth,getFeed);
// router.post('/new', auth, createPost);
// router.patch('/:id', auth, updatePost);
// router.delete('/:id', auth, deletePost);
// router.patch('/:id/likePost', auth, likePost);


export default router;