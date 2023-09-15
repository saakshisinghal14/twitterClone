import express from 'express';
import {signup} from "../controllers/auths.js";
import {signin} from "../controllers/auths.js";

const router = express.Router();

router.post('/signup',signup);
router.post('/signin',signin);

export default router;
