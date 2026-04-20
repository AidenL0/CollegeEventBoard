import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/products.js';
import { createProduct, getProducts, deleteProduct, updateProduct } from '../controllers/productControllers.js';

const router = express.Router();

router.get('/', getProducts);

router.post('/', createProduct);

router.delete("/:id", deleteProduct);

router.put("/:id", updateProduct);

export default router;