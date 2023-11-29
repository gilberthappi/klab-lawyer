// swaggerConfig.js
export const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'LAWYER API',
        version: '1.0.0',
        description: 'Lawyer  API Documentation',
      },
      servers: [
        {
          url: 'http://localhost:1000/api/v1',
        },
        {
          url: 'https://abc/api/v1',
        },
      ],
      
    },
    apis: ['./src/routes/*.js'],
  };
  