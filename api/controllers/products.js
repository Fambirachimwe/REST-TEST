const mongoose = require('mongoose');
const Product =  require('../models/product');


exports.getProducts = (req, res, next) =>{
    Product.find()
    .select('name price _id productImage')
    .exec()
    .then(doc =>{
        const response = {
            count: doc.length,
            products: doc.map(doc =>{
                return{
                    name: doc.name,
                    price: doc.price,
                    _id: doc._id,
                    roductImage: doc.productImage,
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
        // console.log(err);
        res.status(500).json({error: err})
    });
}

exports.createProduct = (req, res, next) =>{
    const product = new Product({
        _id: new  mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product.save().then(result =>{
        // console.log(result);
        res.status(200).json({
            message: 'created product sucessfully',
            createdProduct: {
                name: result.name,
                price: result.price,
                _id: result._id,
                productImage:'http://127.0.0.1:3000/'+ result.productImage,
                request: {
                    type: 'GET',
                    url: 'http://127.0.0.1:3000/products/' + result._id
                }
            }
        });
    }).catch(err =>{
        // console.log(err);
        res.status(500).json({error: err})
    });
    
}

exports.productDetail = (req, res, next) =>{
    const id = req.params.productId;
    Product.findById(id)
    .select('name price _id productImage')
    .exec()
    .then( doc =>{
        const response = {
            name: doc.name,
            price: doc.price,
            _id: doc._id,
            productImage: doc.productImage,
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
        // console.log(err);
        res.status(500).json({error: err})
    });
    
}

exports.updateProduct = (req, res, next) =>{
    const id = req.params.productId;
    const updatesOps = {}; // object to hold the parameters to be updated in the database
    for(const ops of req.body){   /// apa ndogona kisa yangu method 
        updatesOps[ops.propName] = ops.value;
    }
    Product.update({_id: id}, {$set: updatesOps})
        .exec()
        .then(result =>{
            // console.log(result);
            res.status(200).json({
                message: 'updated sucessfully',
                request: {
                    type: 'GET',
                    url: 'http://127.0.0.1:3000/products/' + id,
                }
               
            });
        })
        .catch(err =>{
            // console.log(err);
            res.status(500).json({error: err})
        });
}

exports.deleteProduct = (req, res, next) =>{
    const id = req.params.productId;
    Product.findOneAndRemove({_id: id})
    .exec()
    .then(result =>{
        // console.log(result);
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
        // console.log(err);
        res.status(500).json({error: err})
    });
}