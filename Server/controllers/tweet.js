import Tweet from '../models/Tweet.js';
import { handleError } from '../routes/error.js';
import User from '../models/User.js';

// createTweet
export const createTweet = async (req, res, next)=>{
const newTweet = new Tweet(req.body);
try{
const savedTweet = await newTweet.save();
res.status(200).json(savedTweet);

}
catch(err){
 handleError(500,err);
}
}

// delete Tweet
export const deleteTweet = async (req, res, next) => {
    try {
        const tweet = await Tweet.findById(req.params.id);

        if (!tweet) {
            return handleError(404, "Tweet not found");
        }

        // Check if the user making the request is the owner of the tweet
        if (tweet.userId === req.body.id) {
            await tweet.deleteOne();
            res.status(200).json("Tweet has been deleted");
        } else {
            handleError(403, "You are not authorized to delete this tweet");
        }
    } catch (err) {
        handleError(500, err);
    }
}


// likeordislike
export const likeordislike = async (req, res, next) => {
    try {
        const tweet = await Tweet.findById(req.params.id);

        if (!tweet) {
            return handleError(404, "Tweet not found");
        }

        if (!tweet.likes.includes(req.body.id)) {
            await tweet.updateOne({ $push: { likes: req.body.id } });
            res.status(200).json("Tweet has been liked");
        } else {
            await tweet.updateOne({ $pull: { likes: req.body.id } });
            res.status(200).json("Tweet has been disliked");
        }
    } catch (err) {
        handleError(500, err);
    }
};

// timeline

export const getAllTweets = async (req, res, next) => {
    try {
        const currentUser = await User.findById(req.params.id);
        const userTweets = await Tweet.find({ userId: currentUser._id });

        const followersTweets = await Promise.all(
            currentUser.following.map((followerId) => {
                return Tweet.find({ userId: followerId });
            })
        );

        const allTweets = userTweets.concat(...followersTweets);
        res.status(200).json(allTweets);
    } catch (err) {
        handleError(500, err);
    }
};
// get user tweets
export const getUserTweets = async (req, res, next) => {
    try {
     
        const userTweets = await Tweet.find({ userId: req.params.id}).sort(
            {
                
        createdAt:-1,
            }
        );

 

    
        res.status(200).json(userTweets);
    } catch (err) {
        handleError(500, err);
    }
};

// getExploreTweets
export const getExploreTweets = async (req, res, next) => {
    try {
        const exploreTweets = await Tweet.find({ likes: { $exists: true } }).sort(
            {
                likes: -1,
            }
        );

        res.status(200).json(exploreTweets);
    } catch (err) {
        // Send an error response to the client
        res.status(500).json({ error: err.message });
    }
};

