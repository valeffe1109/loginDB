const jwt = require('jsonwebtoken');

module.exports = function (req,res,next){

    const token = req.header('auth-token');
    if(!token)return res.status(401).send('Access Denied');

    try {

        const verified = jwt.verify(token,'110997970911')
        req.user= verified;
        next();
        
    } catch (err) {
        res.status(400).send('Invalid Token');
        
    }
}

//To verify a route just export it EXAMPLE const verify = require('./verifyToken')

//router.get('/', verify , (req,res) ecc...