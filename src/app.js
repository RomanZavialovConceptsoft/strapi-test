const serverless = require('serverless-http');
const strapi = require('strapi');

strapi().start();

module.exports.handler = serverless(strapi.app);