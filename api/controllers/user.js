
const User = require('../models/user');
const bcrypt = require('bcrypt');
const  jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

exports.SignUp = (req, res, next) =>{
    User.find({email: req.body.email})
    .exec()
    .then(user =>{
        if(user.length >=1){
            return res.status(409).json({
                message: "Email is already taken"
            });
        } else{
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
        }
    });  
}

exports.Login = (req, res, next) =>{
    User.find({email: req.body.email})
    .exec()
    .then(user =>{
        if(user.length < 1){
            return res.status(401).json({
                message: 'Auth failed'
            });
        } else {
            bcrypt.compare(req.body.password, user[0].password, function(err, response) {
                if(response){
                    const token = jwt.sign({email: user[0].email,userId: user[0]._id}, 
                        env.JWT_KEY, {expiresIn: "1h"}, 
                    );
                    return res.status(200).json({
                        message: 'user logged in ',
                        token: token
                    });
                } else{
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
            });
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: err})
    });
}

exports.DeleteUser = (req, res, next) =>{
    const id =req.params.userId;
    User.findOneAndRemove({_id: id})
    .exec()
    .then(user =>{
        if(user >=1){
            res.status(200).json({
                message: 'User with the id of ' + id + ' has been deleted'
            });
        } else{
            res.status(404).json({
                message : id + " Not found"
            });
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: err})
    });

}