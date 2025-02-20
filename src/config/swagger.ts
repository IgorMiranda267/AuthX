import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

const swaggerConfig = (app: Application): void => {
  const swaggerSpec = swaggerJsDoc({
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'API de Autenticação',
        version: '1.0.0',
        description: 'API para autenticação de usuários',
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
    },
    apis: ['./src/routes/*.ts'],
  });

  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default swaggerConfig;