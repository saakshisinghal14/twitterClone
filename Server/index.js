import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/users.js';
import  authRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser';
import tweetRoutes from './routes/tweets.js';
const app = express();
dotenv.config();

const connect =()=>{
    mongoose.connect(process.env.MONGO)
    .then(()=>{console.log('connect to mongo db ')}).catch(err=>
        {throw err});
};
app.get('/', (req, res) => {
res.send("hello world!");

})


app.use(cookieParser())
app.use(express.json());
app.use ('/api/users',userRoutes)
app.use ('/api/auth',authRoutes);
app.use ('/api/tweets',tweetRoutes);



const port =8800;
app.listen(port,()=>{
connect();
    console.log(`listening on http://localhost:${port}`);
})