const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: 225
    },
    description: {
        type: String,
        required: true,
        max: 225
    },
    category: {
        type: String,
        required: true,
        max: 225
    },
    image: {
        type: String,
        required: false,
        max: 225
    },
    quantity: {
        type: Number,
        required: true,
        max: 225
    },  
},
{timestamps: true})

const Product = mongoose.model('Product', productSchema)
module.exports = Product
