const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

// install the node bcrypt hashing algorithm 
router.post('/signup', (req, res, next) =>{
    bcrypt.hash(req.body.password, 10, (err, hash) =>{
        if(err){
            return res.status(500).json({
                error: err
            });
        } else{
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
                }).save()
                .then(result =>{
                    console.log(result);
                    res.status(201).json({
                        message: 'new user created'
                    })
                })
                .catch(err =>{
                    console.log(err);
                    res.status(500).json({error: err})
                });
            }
        });
});


module.exports = router;