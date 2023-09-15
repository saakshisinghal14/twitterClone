import express from 'express';
import { verifyToken } from '../verifyToken.js';
import { createTweet,deleteTweet,likeordislike,getAllTweets,getUserTweets, getExploreTweets } from '../controllers/tweet.js';
const router = express.Router();

// create tweet
router.post('/', verifyToken, createTweet);

// delete tweet
router.delete('/:id', verifyToken, deleteTweet);


// Like or dislike a tweet
router.put('/:id/like',likeordislike);

// get all timeline tweets
router.get("/timeline/:id", getAllTweets);
router.get("/user/all/:id", getUserTweets);

router.get('/explore', getExploreTweets);

export default router;