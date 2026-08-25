import { addProductServer, deleteProductService, getProductService } from '../services/product.service.js'
import redisClient from '../config/redis.js'
import Product from '../modules/product.module.js'
import mongoose from 'mongoose';


const addProductController = async (req, res) => {
    const { name, description, price, quantity, category, location } = req.body;
    const image = req.file ? req.file.path : null;

    try {
        const productExist = await Product.findOne({ name });

        if (productExist) {
            return res.status(400).json({
                success: false,
                message: "Product already exists"
            });
        }

        const newProduct = new Product({
            name,
            description,
            price,
            quantity,
            category,
            image,
            location,
            sellerId: req.user.id
        });

        await newProduct.save();

        res.status(201).json({
            success: true,
            message: "Product added successfully",
            product: newProduct
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

};

const deleteProductController = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the product first
        const productExist = await Product.findById(id);

        if (!productExist) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Check ownership
        if (productExist.sellerId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You cannot delete this product"
            });
        }

        // Delete after ownership check
        const product = await deleteProductService(id);

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            product
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getProductController = async (req, res) => {
    try {
        const sellerId = req.user.id;

        const cacheKey = `products:farmer:${sellerId}`;

        const cachedProducts = await redisClient.get(cacheKey);

        if (cachedProducts) {
            return res.status(200).json({
                success: true,
                message: "Products retrieved successfully from cache",
                products: JSON.parse(cachedProducts)
            });
        }

        const products = await Product.find({
            sellerId: sellerId,
            isDeleted: false
        });

        await redisClient.set(
            cacheKey,
            JSON.stringify(products),
            {
                EX: 60
            }
        );

        return res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            products
        });

    } catch (error) {
        console.error("Get products error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getFarmerProductCount = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
            return res.status(400).json({
                message: 'Invalid user ID'
            });
        }

        const sellerId = new mongoose.Types.ObjectId(req.user.id);
        const result = await Product.aggregate([
            {
                $match: {
                    sellerId: sellerId,
                    isDeleted: false
                }
            },
            {
                $count: 'totalProducts'
            }
        ]);
        res.status(200).json({
            totalProducts: result[0]?.totalProducts || 0
        });
    } catch (error) {
        res.status(500).json({
            message: 'failed to get product count',
            error: error.message
        });
    }
};

export { addProductController, deleteProductController, getProductController, getFarmerProductCount }