import express from 'express';
import clientRouter from './clientRoute';
import contactsRouter from './contactRoute';

import lawyerRouter from './lawyer'
import adminRouter from './adminRoute';
import subRouter from './subscriptionRoute';

const mainRouter = express.Router();

mainRouter.use('/client', clientRouter);
mainRouter.use('/contacts',contactsRouter);
mainRouter.use('/lawyer', lawyerRouter);
mainRouter.use('/admin', adminRouter);
mainRouter.use('/sub', subRouter);


export  default mainRouter;
