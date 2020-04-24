const expressJwt = require('express-jwt');
const projectConfig = require('./config');

function jwt() {
    const secret = {secret : projectConfig.jwtSecret};
    return expressJwt({ secret }).unless({
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
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};

module.exports = jwt;