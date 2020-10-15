const jwt = require('jsonwebtoken'); 
//import jwt from 'jsonwebtoken'
const config = require('../config');

function validarToken (req, res, next) {
    const token = req.headers['x-access-token']; //For maximum flexibility, we’ll allow the client to attach a token in one of three ways – as a query string parameter, a form body parameter, or in an HTTP header. 
    
    if (!token) {
        return res.status(401).json({
            auth: false,
            message: 'No token provided'
        });
    }
    const decoded = jwt.verify(token, config.secret);
    req.userid = decoded.id;
    next();
}

module.exports = validarToken; 
