const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        // console.log(token)
        if (token) {
            const decode = jwt.verify(token, 'secret')
            req.userId = decode.id;
            next()
        }
    }
    catch (err) {
        res.status(401).json('You are not authenticated');
    }

}
module.exports = verifyToken; 