import express from "express";
import { createUser, getAllUser, getUser } from "../controllers/user.controller";

const router = express.Router();

router.post('/user', createUser);
router.get('/user', getAllUser);
router.get('/user/:id', getUser);

export default router;