const router = require('express').Router()
const { createProduct, allProducts, singleProduct, deleteProduct, updateProduct } = require('../controllers/ProductController')
const { verifyToken } = require('../verifyToken')

router.post('/create', verifyToken, createProduct)
router.get('/get-all', allProducts)

// the verifyToken below is like the middleware in laravel
router.get('/single/:id', verifyToken, singleProduct)
router.delete('/delete/:id', verifyToken, deleteProduct)
router.put('/update/:id', verifyToken, updateProduct)

module.exports = router