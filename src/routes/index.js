import express from 'express';
import clientRouter from './clientRoute';
import contactsRouter from './contactRoute';
const mainRouter = express.Router();

mainRouter.use('/client', clientRouter);
mainRouter.use('/contacts',contactsRouter);

export  default mainRouter;
