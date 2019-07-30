const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) =>{
    res.status(200).json({
        message: 'get all the orders'
    });
});

router.post('/', (req, res, next) =>{
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(200).json({
        message: 'post all the orders',
        orders: order,
    });
});


router.get('/:orderId', (req, res, next) =>{
    const id = req.params.orderId;
    res.status(200).json({
        message: 'get the orderId with the order: ', id,
    });
});

router.delete('/:orderId', (req, res, next) =>{
    const id = req.params.orderId;
    res.status(200).json({
        message: 'the oder with the id of' +' '+ id + ' has been removed',

    })
});

module.exports = router;