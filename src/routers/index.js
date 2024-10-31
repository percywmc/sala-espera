import express from 'express';
import citasRouter from './citas.router.js';
const appRouter = express.Router();

appRouter.use(citasRouter);

export default appRouter;