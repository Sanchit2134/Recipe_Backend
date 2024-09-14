const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {
    const token = req.headers.authorization;
    // console.log(token)
    if(token){
        jwt.verify(token, 'secret', (err) =>{
            if(err){
                // console.log(err,"kjhgf================")
                return res.status(403).json('Token is not valid');
            }
            next();
        });
    }
    else{
        res.status(401).json('You are not authenticated');
    }
}
module.exports = verifyToken; 