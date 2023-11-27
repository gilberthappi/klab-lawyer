import express from 'express';
import clientRouter from './clientRoute';
import contactsRouter from './contactRoute';
import lawyerRouter from './lawyerRoute';
import adminRouter from './adminRoute';
const mainRouter = express.Router();

mainRouter.use('/client', clientRouter);
mainRouter.use('/contacts',contactsRouter);
mainRouter.use('/lawyer', lawyerRouter);
mainRouter.use('/admin', adminRouter);

export  default mainRouter;
