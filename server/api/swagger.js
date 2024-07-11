import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger_output.json';
const endpointsFiles = ['./index.js'];

// Define the Swagger documentation object
const doc = {
  info: {
    title: 'PhoByPho API',
    description: 'API Documentation',
  },
  host: 'localhost:5000',
  schemes: ['http'],
};

swaggerAutogen()(outputFile, endpointsFiles, doc);