import express from "express";
import { createUser, getAllUser, getUser, updateUser } from "../controllers/user.controller";
import { rateLimiter } from "../middleware/rateLimiter";
import { validate } from "../middleware/validate.middleware";
import { createUserSchema } from "../validations/user.validation";

const router = express.Router();

router.post('/user',validate(createUserSchema), createUser);
router.get('/user', rateLimiter, getAllUser);
router.get('/user/:id',rateLimiter, getUser);
router.put('/user/:id', updateUser);

export default router;