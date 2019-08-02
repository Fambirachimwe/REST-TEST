const Order = require('../models/order');
const mongoose = require('mongoose');

exports.getAllOrders = (req, res, next) =>{
    Order.find()
    .select('quantity productId')
    .populate('productId', 'name')
    .exec()
    .then(result =>{
        // console.log(result);
        if(result.length > 0 ){
            res.status(200).json(result);
        }else{
            res.status(200).json({
                message: 'No Orders found',
            });
        }
        
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: err})
    });
}

exports.placeOrder = (req, res, next) =>{
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        productId: req.body.productId,
    }).save()
    .then(result =>{
        res.status(200).json({
            message: 'order created',
            orders: {
                quantity : result.quantity,
                request: {
                    type: 'GET',
                    url: 'http://127.0.0.1:3000/products/' + result.productId,
                }
            }
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: err})
    });  
}

exports.orderDetail = (req, res, next) =>{
    const id = req.params.orderId;
    Order.findById(id)
    .populate('productId')
    .exec()
    .then(result =>{
        if(result){
            res.status(200).json({
                productId: result._id,
                quantity: result.quantity,
                request: {
                    message: 'Product infomation',
                    url: 'http://127.0.0.1:3000/products/' + result.productId._id
                }
            });
        }else{
            res.status(404).json({
                message: 'Order with id of ' + id + ' is not Found'
            })
        }
        
        
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: err})
    });
}

exports.deleteOrder = (req, res, next) =>{
    const id = req.params.orderId;
    Order.findOneAndRemove({_id: id})
    .exec()
    .then(result =>{
        if(result){
            res.status(200).json({
                message: id + ' deleted',
                request: {
                    type: 'POST',
                    message: 'Place an order',
                    OrderUrl: 'http://127.0.0.1:3000/order/'
                }
            })
        }else{
            res.status(404).json({
                message: 'unable to delete the order with the id ' + id,
                request: {
                    type: 'GET',
                    message: 'Get all the orders',
                    url: 'http://127.0.0.1:3000/orders',

                }
            })
        }
        
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: err})
    });
}







