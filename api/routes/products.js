const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

const productsController = require('../controllers/products')

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './upload/')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
});

// const filter = (req, res, cd) =>{
//     if( file.mimetype === 'image/png'){
//         cd(null, true);
//     }else{
//         cd(null, false);
//     }
// }

const upload = multer({
    storage: storage ,
    limits:{fileSize: 1024 * 1024 * 5},
    // fileFilter: filter
});

router.get('/', productsController.getProducts );

router.post('/', checkAuth, upload.single('productImage'), productsController.createProduct );

router.get('/:productId', productsController.productDetail);

router.patch('/:productId', checkAuth,productsController.updateProduct );

router.delete('/:productId',checkAuth, productsController.deleteProduct);


module.exports = router;