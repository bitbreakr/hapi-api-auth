'use strict';

exports.register = function (server, options, next) {

    let token = options.token;
    
    server.ext('onRequest', function (request, reply) {
        if (request.raw.req.headers.auth) {
            let receivedToken = request.raw.req.headers.auth;
            if (token === receivedToken) {
                return reply.continue();
            } else {
                reply({
                    status: 401,
                    message: 'Authentication unsuccessful',
                    detail: 'Given token is invalid'
                })
            }
        } else {
            reply({
                status: 401,
                message: 'Authentication unsuccessful',
                detail: 'Please provide an authentication token'
            })
        }

    });

    next();
};

exports.register.attributes = {
    name: 'hapi-api-auth',
    version: '1.0.0'
};