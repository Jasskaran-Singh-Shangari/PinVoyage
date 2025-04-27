import User from "../models/Users.model.js";

export const getCurrentUser = async (req,res)=>{
        // const {userId}=req.auth
        // const user= await User.findOne({clerkId:userId})
        // res.status(200).json(user)
        const user=req.body;
        if (!user) {
            return res.status(400).json({ error: "User is required." });
        }      
        const userInfo = await User.findOne({ clerkId: user.id });
        if (!userInfo) {
            return res.status(404).json({ error: "User not found." });
        }
        console.log(userInfo)
        res.status(200).json(userInfo)
    }