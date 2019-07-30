const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) =>{
    res.status(200).json({
        "message": "handling get request"
    });
});

router.post('/', (req, res, next) =>{
    const product = {
        name: req.body.name,
        price: req.body.price
    }
    res.status(200).json({
        "message": "handling post request",
        createdProduct: product
    });
});

router.get('/:productId', (req, res, next) =>{
    const id = req.params.productId;
    res.status(200).json({
        message: 'get the product with the productIs ' +  id,
    })
});


router.patch('/:productId', (req, res, next) =>{
    res.status(200).json({
        message: 'updated the product id'
    });
});


router.delete('/:productId', (req, res, next) =>{
    const id = req.params.productId;
    res.status(200).json({
        message: 'product deleted  ' + id,
    });
});






module.exports = router;