// server.js
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http'; // Import the 'http' module
import socketIo from 'socket.io'; // Import the 'socket.io' module
import mainRouter from './src/routes';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerOptions } from './src/utils/swaggerConfig';
import AppError from './src/utils/appError';

require('dotenv').config();

const app = express();

app.use(cors());

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1', mainRouter);

// Create an HTTP server using the express app
const server = http.createServer(app);

// Initialize Socket.io and pass the server instance
const io = socketIo(server);

// Make the io object accessible in other modules
app.set('io', io);

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the API'});
});

        console.log(`Server running on port http://localhost:${port}`);
        console.log('Database is connected');
    });
}).catch((err) => {
    console.log(err);
});
