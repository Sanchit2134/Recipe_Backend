const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log(token, 'io')
        if (token) {
            const decode = jwt.verify(token, 'secret', (err)=>{
                if(err) res.sendStatus(403);
                next();
            });
        }
    }
    catch (err) {
        res.status(401).json('You are not authenticated');
    }

}
module.exports = verifyToken; 