import { Router } from "express";
import swaggerJsdoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import streamsRouter from './streams.js';
// import { specs, swaggerConfig } from '../../config/index.js';

const routes = Router()

// TODO - swagger
routes.use('/streams', streamsRouter)


export default routes;