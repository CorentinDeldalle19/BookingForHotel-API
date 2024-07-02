const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.slipt(' ')[1];

    if (token){
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err){
                return res.sendStatus(403); // Accès interdit
            }
            req.user = user;
            next();
        });
    } else {
        return res.sendStatus(401); // Accès interdit car aucun token n'est fourni
    }
};

module.exports = authenticateJWT;