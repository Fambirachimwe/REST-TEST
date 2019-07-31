const express = require('express');
const app =  express();
const morgan = require('morgan');
const productRoutes = require('./api/routes/products');
const orderRoutes = require('../REST-TEST/api/routes/orders');
const bodyParser = require('body-parser');
const mongoose =  require('mongoose');




// connection to mongodb

mongoose.connect('mongodb://localhost/REST-API', {useNewUrlParser: true});
mongoose.connection.once('open', () =>{
    console.log('connected');
}).on('error', (error) =>{
    console.log('connection error ', error);
});






app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// handling static folders and files 
app.use('/upload', express.static('upload'));


app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// HANDLING CORS ERRORS
// CROSS ORIGIN RESOURCE SHARING 
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*'); // the * allows all site to access the
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATHCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


// handle all the errors in our requests
app.use((req, res, next) =>{   
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});


// handle all other errors 
app.use((error, req, res, next) =>{
    res.status(error.status || 500);  // the status code 500 is an Internal Server Error 
    res.json({
        error: {
            message: error.message
        }
    });
});






module.exports = app;


