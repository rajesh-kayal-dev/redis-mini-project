import express from "express";
import { createUser, getAllUser, getUser, updateUser } from "../controllers/user.controller";
import { rateLimiter } from "../middleware/rateLimiter";

const router = express.Router();

router.post('/user', createUser);
router.get('/user', rateLimiter, getAllUser);
router.get('/user/:id',rateLimiter, getUser);
router.put('/user/:id', updateUser);

export default router;