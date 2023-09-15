import User from '../models/User.js';
import { handleError } from '../routes/error.js';
import Tweet from '../models/Tweet.js';
// get User
export const getUser= async (req, res, next) =>{

    try{
  const user = await   User.findById(req.params.id);
  res.status(200).json(user);
    } catch(err){

        next(err);

    }

}

// update User
export const update= async (req, res, next) =>{


      if(req.params.id === req.user.id){
          try{
               const updatedUser = await  User.findByIdAndUpdate( req.params.id,{
                     $set: req.body,
               },{
                new : true,
               });

               res.status(200).json(updatedUser);
          } catch(err){
               next(err);
          }
      }

      else{
        return next(handleError(403,"You can only update your account" ));
      }
  

}
// update followers
export const follow= async (req, res, next) =>{


   
          try{
              // user
                         const user = await User.findById(req.params.id);
              // current user
                         const currentUser = await User.findById(req.body.id);

                         if(!user.followers.includes(req.body.id)){
                            await user.updateOne({
                              $push :{ followers: req.body.id},
                            });

                            await currentUser.updateOne({$push: { following: req.params.id}});

                         }
                         else{
                          res.status(403).json(" you already follow this user")

                         }
                         res.status(200).json("following the user ")

          } catch(err){
               next(err);
          }   

}
// unfollow user
export const unFollow= async (req, res, next) =>{


   
          try{
              // user
                         const user = await User.findById(req.params.id);
              // current user
                         const currentUser = await User.findById(req.body.id);

                         if(!currentUser.following.includes(req.params.id)){
                            await user.updateOne({
                              $pull :{ followers: req.body.id},
                            });

                            await currentUser.updateOne({$pull: { following: req.params.id}});

                         }
                         else{
                          res.status(403).json(" you are not following them")

                         }
                         res.status(200).json("unfollowed the user  ")

          } catch(err){
               next(err);
          }   

}
// delete user
export const deleteUser= async (req, res, next) =>{


  if(req.params.id === req.user.id){
    try{
    await User.findByIdAndDelete(req.params.id);
     await Tweet.remove({userId: req.params.id});
      res.status(200).json("User deleted successfully");
 }
       catch(err){
           next(err);
      }
  }

  else{
    return next(handleError(403,"You can only delete your account" ));
  }


}


