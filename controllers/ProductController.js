const Product = require('../models/product');
const cloudinary = require('cloudinary').v2; // Make sure you require cloudinary properly and configure it

const createProduct = async (req, res) => {
    try {
        const { title, description, category, quantity } = req.body
        const { mimetype, name, tempFilePath, size, truncated } = req.files.image
        // tempFilePath = req.files


        const result = await cloudinary.uploader.upload(tempFilePath, {
            public_id: `${Date.now()}`,
            resource_type: 'auto',
            folder: 'products'
        });

        const product = new Product({
            title,
            description,
            category,
            quantity,
            image: result.url
        });

        const savedProduct = await product.save();
        if (savedProduct) {
            res.status(200).json({ success: "Product created successfully", data: product });
        } else {
            res.status(400).json({ error: "Sorry, an error occurred" });
        }
    } catch (error) {
        res.status(500).json({ error: "Sorry, an error occurred" });
    }
};

const allProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (products) {
            return res.status(200).json({ success: products });
        } else {
            return res.status(400).json({ error: "Sorry, an error occurred" });
        }
    } catch (error) {
        res.status(500).json({ error: "Sorry, an error occurred" });
    }
};

const singleProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            return res.status(200).json({ success: product });
        } else {
            return res.status(400).json({ error: "Sorry, an error occurred" });
        }
    } catch (error) {
        res.status(500).json({ error: "Sorry, an error occurred" });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (product) {
            return res.status(200).json({ success: "Successfully deleted", data: product });
        } else {
            return res.status(400).json({ error: "Sorry, couldn't delete product" });
        }
    } catch (error) {
        res.status(500).json({ error: "Sorry, an error occurred" });
    }
};

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (product) {
            return res.status(200).json({ success: "Successfully updated", data: product });
        } else {
            return res.status(400).json({ error: "Sorry, couldn't update product" });
        }
    } catch (error) {
        res.status(500).json({ error: "Sorry, an error occurred" });
    }
};

module.exports = { createProduct, allProducts, singleProduct, deleteProduct, updateProduct };
