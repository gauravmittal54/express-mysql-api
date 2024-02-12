const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./api/users/user.router.js'];

const doc = {
  info: {
    title: 'User API',
    description: 'API documentation for managing users',
  },
  host: global.serverUrl,
  basePath: '/api/users',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
};

swaggerAutogen(outputFile, endpointsFiles, doc);
