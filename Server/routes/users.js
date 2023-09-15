import express from "express";
import { getUser, update, deleteUser,follow,unFollow} from '../controllers/user.js';
import { get } from "mongoose";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.get('/find/:id', getUser);

router.put('/:id',verifyToken, update)

router.delete("/:id", verifyToken,deleteUser)

router.put('/follow/:id',  verifyToken, follow);

router.put('/unfollow/:id',  verifyToken, unFollow);

export default router;

