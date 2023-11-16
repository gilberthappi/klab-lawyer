import express from 'express';
import { signup, login,changePassword, verifyProfile } from '../controllers/authantecation/clientAuth';
import { verifyToken,uploaded, isAdmin } from '../middleware';


const clientRouter = express.Router();

/**
 * @swagger
 * tags:
 *  name: Clients
 * description: Lawyer API
 * 
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *      bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           required: true
 *           unique: true
 *         name:
 *           type: string
 *           required: true
 *         password:
 *           type: string
 *         phone:
 *           type: string
 *         role:
 *           type: string
 *           default: 'user'
 *         confirmPassword:
 *                 type: string
 */

/**
 * @swagger
 * /client/signup:
 *   post:
 *     summary: Client Signup
 *     tags: [ClientAuthentications]
 *     description: Register a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *               phone:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *               - confirmPassword
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad Request - Invalid data
 *       409:
 *         description: Conflict - User already exists
 */

clientRouter.post('/signup',uploaded, signup);

/**
 * @swagger
 * /client/login:
 *   post:
 *     summary: Client Login
 *     tags: [ClientAuthentications]
 *     description: Authenticate a user and obtain an access token.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User authenticated, access token obtained
 *       401:
 *         description: Unauthorized - Invalid credentials
 */

  clientRouter.post('/login', uploaded, login);


/**
 * @swagger
 * /client/changePassword:
 *   post:
 *     summary: Client change Password
 *     tags: [ClientAuthentications]
 *     description: Change the password of an authenticated Client.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *             required:
 *               - currentPassword
 *               - newPassword
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       401:
 *         description: Unauthorized - Invalid credentials
 *       400:
 *         description: Bad Request - Invalid data
 */

clientRouter.post('/changePassword',uploaded, verifyToken, changePassword);

  /**
 * @swagger
 * /client/verifyProfile:
 *   post:
 *     summary: Client verifyProfile
 *     tags: [ClientAuthentications]
 *     description: Client verifyProfile
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               country:
 *                 type: string
 *               city:
 *                 type: string
 *               district:
 *                 type: string
 *               sector:
 *                 type: string
 *               cell:
 *                 type: string
 *               nationalID:
 *                 type: string

 *     responses:
 *       201:
 *         description: verified successfully
 *       400:
 *         description: Bad Request - Invalid data
 *       409:
 *         description: Conflict - verifyProfile already exists
 */

clientRouter.post('/verifyProfile',uploaded, verifyToken, verifyProfile);

export default clientRouter;