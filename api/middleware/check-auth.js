const jwt = require('jsonwebtoken');
const env = require('../env')


//jwt.verify(token, secretOrPublicKey, [options, callback])

module.exports = (req, res, next) =>{
    const token = req.headers.authorization.split(" ")[1]; // access the token from the headers

    try{
        const decoded = jwt.verify(token, env.JWT_KEY);
        const userData = decoded;
        next();

    } catch(err){
        return res.status(401).json({
            message: 'Auth failed, user not aunthenticated',
            request: {
                type: 'POST',
                LoginUrl: 'http://127.0.0.1:3000/user/login'
            }
        });
    }
    
}