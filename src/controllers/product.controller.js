import { addProductServer, deleteProductService, getProductService } from '../services/product.service.js'
import redisClient from '../config/redis.js'
import Product from '../modules/product.module.js'


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

        const cachedProducts = await redisClient.get('products');

        if (cachedProducts) {
            return res.status(200).json({
                success: true,
                message: "Products retrieved successfully from cache",
                products: JSON.parse(cachedProducts)
            });
        }
        const products = await getProductService();

        await redisClient.set(
            'products',
            JSON.stringify(products))
        {
            EX: 60
        }
        ;

        res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            products
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export { addProductController, deleteProductController, getProductController }