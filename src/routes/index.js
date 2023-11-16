import express from 'express';
import clientRouter from './clientRoute';




const mainRouter = express.Router();

mainRouter.use('/client', clientRouter);

export  default mainRouter;