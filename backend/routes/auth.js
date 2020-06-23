const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'secret_key');
        const username = decodedToken.username;
        if(token == null) return res.sendStatus(401);
        if(req.body.username !== username){
            res.status(400).json({message: 'Invalid User.'})
        }
        else{
            next();
        }
    }
    catch{
        res.status(401).json({
            error: new Error('Invalid Request')
        });
    }
};