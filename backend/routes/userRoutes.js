import express from "express";
import mongoose from "mongoose";
import Users from "../models/Users.js";
import { createUser, getUsers, deleteUser, updateUser, loginUser } from "../controllers/userControllers.js";

const router = express.Router();

router.get('/', getUsers);

router.post('/', createUser);

router.post('/login', loginUser);

router.delete("/:id", deleteUser);

router.put("/:id", updateUser);

export default router;