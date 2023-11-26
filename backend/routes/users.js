const express=require('express')
const router=express.Router()
const User=require('../models/User')
const bcrypt=require('bcrypt')
const Post=require('../models/Post')
const Comment=require('../models/Comment')
const verifyToken = require('../verifyToken')


//UPDATE
router.put("/:id",verifyToken,async (req,res)=>{
    try{
        if(req.body.password){
            const salt=await bcrypt.genSalt(10)
            req.body.password=await bcrypt.hashSync(req.body.password,salt)
        }
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedUser)

    }
    catch(err){
        res.status(500).json(err)
    }
})


//DELETE
router.delete("/:id",verifyToken,async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        await Post.deleteMany({userId:req.params.id})
        await Comment.deleteMany({userId:req.params.id})
        res.status(200).json("User has been deleted!")

    }
    catch(err){
        res.status(500).json(err)
    }
})


//GET USER
router.get("/:id",async (req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        const {password,...info}=user._doc
        res.status(200).json(info)
    }
    catch(err){
        res.status(500).json(err)
    }
})

router.put("/:userId/increment-view", async (req, res) => {
    try {
      const userId = req.params.userId;
      // Assuming you have a User model
      const user = await User.findById(userId);
  
      // Increment the view count
      user.view = (user.view || 0) + 1;
      await user.save();
  
      res.json({ success: true });
    } catch (error) {
      console.error('Error incrementing view count:', error);
      res.status(500).json({ error: 'error inside inside increment api' });
    }
  });


module.exports=router