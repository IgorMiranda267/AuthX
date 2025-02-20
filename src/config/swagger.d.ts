declare module 'swagger-config' {
  import { Application } from 'express';
  const swaggerConfig: (app: Application) => void;
  export default swaggerConfig;
}