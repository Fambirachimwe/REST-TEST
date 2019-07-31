const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const mongoose = require('mongoose');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './upload/')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + file.originalname)
    }
});

const upload = multer({storage: storage});

router.get('/', (req, res, next) =>{
    Product.find()
    .select('name price _id')
    .exec()
    .then(doc =>{
        const response = {
            count: doc.length,
            products: doc.map(doc =>{
                return{
                    name: doc.name,
                    price: doc.price,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: 'http://127.0.0.1:3000/products/' + doc._id
                    }
                }
            })
        }
        res.status(200).json(response);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: err})
    });
});

router.post('/', upload.single('productImage'), (req, res, next) =>{
    
    const product = new Product({
        _id: new  mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result =>{
        console.log(result);
        res.status(200).json({
            message: 'created product sucessfully',
            createdProduct: {
                name: result.name,
                price: result.price,
                _id: result._id,
                request: {
                    type: 'GET',
                    url: 'http://127.0.0.1:3000/products/' + result._id
                }
            }
        });
    }).catch(err =>{
        console.log(err);
        res.status(500).json({error: err})
    });
    
});

router.get('/:productId', (req, res, next) =>{
    const id = req.params.productId;
    Product.findById(id)
    .select('name price _id')
    .exec()
    .then( doc =>{
        const response = {
            name: doc.name,
            price: doc.price,
            _id: doc._id,
            request: {
                type: 'PATCH',
                message: 'edit the product using the format  [propName: name, value: value]',
                updateUrl: 'http://127.0.0.1:3000/products/' + doc._id, 
            }
        }
        if(doc){
            res.status(200).json(response);
        } else{
            res.status(200).json({
                message: 'No valid entry for provided id '
            });
        }
        
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: err})
    });
    
});


router.patch('/:productId', (req, res, next) =>{
    const id = req.params.productId;
    const updatesOps = {}; // object to hold the parameters to be updated in the database
    for(const ops of req.body){   /// apa ndogona kisa yangu method 
        updatesOps[ops.propName] = ops.value;
    }
    Product.update({_id: id}, {$set: updatesOps})
        .exec()
        .then(result =>{
            console.log(result);
            res.status(200).json({
                message: 'updated sucessfully',
                request: {
                    type: 'GET',
                    url: 'http://127.0.0.1:3000/products/' + id,
                }
               
            });
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({error: err})
        });
    });


router.delete('/:productId', (req, res, next) =>{
    const id = req.params.productId;
    Product.findOneAndRemove({_id: id})
    .exec()
    .then(result =>{
        console.log(result);
        res.status(200).json({
            message: id + ' deleted',
            request: {
                type: 'POST',
                message: 'Create A Product',
                CreateProductUrl: 'http://127.0.0.1:3000/products/'
            }
        })
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: err})
    });
});






module.exports = router;