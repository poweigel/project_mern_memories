import express from 'express';

import { signin, signup } from '../controllers/user.js';

const router = express.Router();

router.post('/signin', signin);   // This is a post route because you have to send some details to the backend.
router.post('/signup', signup);

export default router;