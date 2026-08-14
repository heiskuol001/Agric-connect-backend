import Product from '../modules/product.module.js'


const addProductServer = async (name, description, price, quantity, category, image, location, sellerId) => {
    try {
        const productMatch = await Product.findOne({ name })
        if (productMatch) {
            throw new Error("Product already exists");
        }
        const product = await Product.create({
            name,
            description,
            price,
            quantity,
            category,
            image,
            location,
            sellerId
        })
        return product
    } catch (error) {
        throw error
    }
}

const deleteProductService = async (id) => {
    try {
        const product = await Product.findByIdAndUpdate(id,
            {
            isDeleted: true
            },
            {
                new: true
            }
        )
        return product
    } catch (error) {
        throw error
    }
}

const getProductService = async () => {
    try {
        const products = await Product.find({ isDeleted: false })
            .populate("sellerId", "name email phone location")
        return products
    } catch (error) {
        throw error
    }
}

export {addProductServer, deleteProductService, getProductService}