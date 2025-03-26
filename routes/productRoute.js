import express from 'express';
import { listProduct, addProduct, removeProduct, singleProduct } from '../controllers/productController.js';

const productRouter = express.Router();


