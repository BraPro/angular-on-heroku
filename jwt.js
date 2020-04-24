const expressJwt = require('express-jwt');
const projectConfig = require('./config');
const Employee = require('./models/employee');

function jwt() {
    const secret = {secret : projectConfig.jwtSecret};
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/favicon.ico',
            '/api/users/login',
            '/api/users/forgotpassword',
            '/api/users/signup',
            '/api/users/logout'
        ]
    });
}

async function isRevoked(req, payload, done) {
    console.log("asd");
    Employee.findById(Number(payload.id), (err, result) => {
        console.log("asdddd");
        if(result) done();

    });
    return done(null, true);
    /*
    const user = await userService.getById(payload.id);
    console.log(user);
    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
    */
};

/*
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
*/
module.exports = {jwt,isRevoked};