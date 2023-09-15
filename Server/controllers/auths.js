import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { handleError } from '../routes/error.js';

export const signup= async (req,res,next)=>{
    console.log(req.body);
try{
const salt= bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(req.body.password,salt);
const newUser= new User({...req.body, password: hash});
await newUser.save();

const token = jwt.sign({ id: newUser._id}, process.env.JWT);

const {password,...othersData } = newUser._doc;
res.cookie('access_token', token,{
    httpOnly: true,
}).status(200).json(newUser._doc);
}catch(err){
next(err);

}
};

export const signin= async (req,res,next)=>{
    console.log(req.body);
try{
      const user = await User.findOne({username: req.body.username});
     if(!user) return next(handleError(404,"Invalid username"));

     const isCorrect=  await bcrypt.compare(req.body.password , user.password);
     if(!isCorrect) return next(handleError(400,"Invalid password"));
     const token = jwt.sign({id: user._id},process.env.JWT);
     const  {password,...otherData}= user._doc;
     res.cookie("access_token", token,{httpOnly: true}).status(200).json(otherData);

}catch(err){
next(err);

}
};