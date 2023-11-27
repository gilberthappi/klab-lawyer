import express from 'express';
import clientRouter from './clientRoute';
import contactsRouter from './contactRoute';
import caseRouter from './caseRoute';
import testimonyRouter from './testimonyRoute';
import lawyerRouter from './lawyerRoute'
import adminRouter from './adminRoute';
import subRouter from './subscriptionRoute';

const mainRouter = express.Router();

mainRouter.use('/client', clientRouter);
mainRouter.use('/contacts',contactsRouter);
mainRouter.use('/lawyer', lawyerRouter);
mainRouter.use('/admin', adminRouter);
mainRouter.use('/sub', subRouter);
mainRouter.use('/Case',caseRouter);
mainRouter.use("/testimony", testimonyRouter);

export  default mainRouter;
