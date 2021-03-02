import express from 'express';

import { getPosts, createPost, updatePost, likePost, deletePost } from '../controllers/posts.js';

import auth from '../middleware/auth.js';   // Need to include '.js' on the backend.

const router = express.Router();

router.get('/', getPosts);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);    // If you call the middleware before the action (likePost), then you can populate the request and have access to it in the next action that you have.

export default router;