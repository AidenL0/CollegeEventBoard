import mongoose from "mongoose";
import Users from "../models/Users.js";



export const getUsers = async (req, res) => {
    try {
        const users = await Users.find({});
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.log("error in fetching users:", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
};

export const createUser = async (req, res) => {
    const user = req.body;

    if (!user.username || !user.email || !user.password) {
        return res.status(400).json({ success:false, message: 'Please provide username, email, and password for the user.' });
    }

    const newUser = new Users(user);

    try {
        await newUser.save();
        res.status(201).json({ success: true, message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error saving user:', error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
};

export const deleteUser = async (req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid User Id"});
    }
    
    try {
        await Users.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "User Deleted"});
    } catch (error) {
        console.log("error in deleting user:", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
};

export const updateUser = async (req,res) => {
    const { id } = req.params;

    const user = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid User Id"});
    }

    try {
        const updatedUser = await Users.findByIdAndUpdate(id, user,{new:true});
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error"});
    }
};