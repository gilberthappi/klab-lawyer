import express from 'express';
import clientRouter from './clientRoute';
import contactsRouter from './contactRoute';
import feedbackRouter from './feedbackRoute';
import caseRouter from './caseRoute';
import testimonyRouter from './testimonyRoute';
const mainRouter = express.Router();

mainRouter.use('/client', clientRouter);
mainRouter.use('/contacts',contactsRouter);
mainRouter.use('/feedback', feedbackRouter);
mainRouter.use('/Case',caseRouter);
mainRouter.use('/testimony',testimonyRouter);


export  default mainRouter;
