import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import mainRouter from './src/routes';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerOptions } from './src/utils/swaggerConfig';
import AppError from './src/utils/appError';
import contactsRouter from "./src/routes"
// import { globalControllerHandler, globalErrorHandler } from './src/controllers/ErrorController.js';

require('dotenv').config();

const app = express();

app.use(cors());

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1', mainRouter);


const swaggerSpec = swaggerJSDoc(swaggerOptions); 

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the API'});
});


// app.all('*', (req, res) => {
//     next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
//     });

// app.use(globalControllerHandler);


mongoose.connect(process.env.DB_CONNECTION_PROD).then(() => {
    app.listen(port, () => {
        console.log(`Server running on port http://localhost:${port}`);
        console.log('Database is connected');
    });
}).catch((err) => {
    console.log(err);
});
