import user from "../models/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const login_user = await user.findOne({email});

        if (!login_user) return res.status(404).json({success: false, error: "User does not exist"});
        const isMatch = await bcrypt.compare(password, login_user.password);
        if (!isMatch) return res.status(400).json({ success: false ,error: "Wrong password" });

        const token = jwt.sign({userId: login_user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});

        return res.status(200).json({
            "success": true,
            "data":{
                "user": {
                    "id": login_user._id,
                    "email":login_user.email,
                    "name":login_user.name,
                },
                token,
            },
            message: "User login successfully",
        });
    } catch (error) {
        console.error("Error in login loginController", error);
        res.status(500).json({message: "Error Internal Server error"})
    }
};

export const create_user = async (req, res) =>{
    try {
        const { email, name, password } = req.body;
        console.log(req.body);
        const exists = await user.exists({email})
        if(exists) return res.status(409).json({message: "User already registerd"}); 
        const hashed_password = await bcrypt.hash(password, 10);
        const new_user = new user({email, name, password: hashed_password});
        await new_user.save();

        const token = jwt.sign(
        { userId: new_user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
        );

        res.status(201).json({
        success: true,
        data: {
            user: {
            id: new_user._id,
            email: new_user.email,
            name: new_user.name,
            },
            token, // ✅ add this
        },
        message: `User: ${name} registered successfully`,
        });
    
    } catch (error) {
        console.error("Error in create_user signupController", error);
        res.status(500).json({error: "Error Internal Server error"})
    }

};

export const getCurrentUser = async (req, res) => {
  try {
    // req.userId comes from verifyUser middleware
    const currentUser = await user.findById(req.userId).select("-password");

    if (!currentUser) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        id: currentUser._id,
        email: currentUser.email,
        name: currentUser.name,
      },
    });

  } catch (error) {
    console.error("Error in getCurrentUser", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

