import express from "express";
import {getPosts, createPost, updatePost, deletePost, likePost} from "../controllers/posts.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get('/', getChats); // get all chats
router.post('/new', auth, createChat); // create new chat
router.delete('/:id', auth, deleteChat); // delete chat


export default router; 