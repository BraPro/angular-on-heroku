const expressJwt = require('express-jwt');
const projectConfig = require('./config');

function jwt() {
    const { secret } = projectConfig.jwtSecret;
    return expressJwt({ secret }).unless({
        path: [
            // public routes that don't require authentication
            'api/users'
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