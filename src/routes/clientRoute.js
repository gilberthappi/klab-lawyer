import express from 'express';
import {
  signup,
  login,
  changePassword,
  forgotPassword,
  resetPassword,
  verifyProfile,
  verifyClientAndCompleteProfile,
  getAllClients,
} from '../controllers/authantecation/clientAuth';
import { verifyToken, uploaded, isAdmin } from '../middleware';

const clientRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: ClientAuthentications
 *   description: Lawyer API
 */

/**
 * @swagger
 * 
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
 *         password:
 *           type: string
 *         phone:
 *           type: string
 *         role:
 *           type: string
 *           default: 'user'
 *         confirmPassword:
 *           type: string
 *         photo:
 *                 type: file
 *                 items: 
 *                   type: String
 *                   format: binary
 *         documents:
 *                 type: file
 *                 items:
 *                   type: String
 *                   format: binary
 *       required:
 *         - email
 *         - password
 *         - confirmPassword
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Organization:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           required: true
 *           unique: true
 *         name:
 *           type: string
 *         password:
 *           type: string
 *         confirmPassword:
 *           type: string
 *         phone:
 *           type: string
 *         registrationNumber:
 *           type: string
 *         contactPerson:
 *           type: string
 *         role:
 *           type: string
 *           default: 'user'
 *         photo:
 *                 type: file
 *                 items: 
 *                   type: String
 *                   format: binary
 *         documents:
 *                 type: file
 *                 items:
 *                   type: String
 *                   format: binary
 *       required:
 *         - email
 *         - organizationName
 *         - password
 *         - confirmPassword
 */

/**
 * @swagger
 * /client/signup/individual:
 *   post:
 *     summary: Individual Signup
 *     tags: [ClientAuthentications]
 *     description: Register a new individual user.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               userType:
 *                type: string
 *                enum: ['individual']
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
 *               
 *             required:
 *               - email
 *               - password
 *               - confirmPassword
 *               - userType
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad Request - Invalid data
 *       409:
 *         description: Conflict - User already exists
 */
clientRouter.post('/signup/individual', uploaded, signup);

/**
 * @swagger
 * /client/signup/organization:
 *   post:
 *     summary: Organization Signup
 *     tags: [ClientAuthentications]
 *     description: Register a new organization user.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               userType:
 *                type: string
 *                enum: ['organization']
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
 *               registrationNumber:
 *                type: string
 *             
 *             required:
 *               - email
 *               - password
 *               - confirmPassword
 *               - userType
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad Request - Invalid data
 *       409:
 *         description: Conflict - User already exists
 */
clientRouter.post('/signup/organization', uploaded, signup);

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
 * /client/forgotPassword:
 *   post:
 *     summary: Forgot Password
 *     tags: [ClientAuthentications]
 *     description: Initiate the process to reset the user's password.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Reset link sent to the registered email address
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */

  clientRouter.post('/forgotPassword',uploaded, forgotPassword); 

/**
 * @swagger
 * /client/resetPassword:
 *   post:
 *     summary: Reset Password
 *     tags: [ClientAuthentications]
 *     description: Reset the user's password using a valid reset token.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               resetToken:
 *                 type: string
 *               newPassword:
 *                 type: string
 *             required:
 *               - resetToken
 *               - newPassword
 *     responses:
 *       200:
 *         description: Password reset successful
 *       401:
 *         description: Invalid or expired reset token
 *       500:
 *         description: Internal Server Error
 */

clientRouter.post('/resetPassword',uploaded, resetPassword);


  /**
 * @swagger
 * /client/individual/verifyProfile:
 *   post:
 *     summary: Client verifyProfile
 *     tags: [ClientAuthentications]
 *     description: Client verifyProfile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                type: string
 *               phone: 
 *                type: string
 *               photo:
 *                 type: file
 *                 items: 
 *                   type: String
 *                   format: binary
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
 *               documents:
 *                 type: file
 *                 items: 
 *                   type: String
 *                   format: binary

 *     responses:
 *       201:
 *         description: verified successfully
 *       400:
 *         description: Bad Request - Invalid data
 *       409:
 *         description: Conflict - verifyProfile already exists
 */

  clientRouter.post('/individual/verifyProfile',uploaded, verifyToken, verifyClientAndCompleteProfile);

  /**
 * @swagger
 * /client/organization/verifyProfile:
 *   post:
 *     summary: Client verifyProfile
 *     tags: [ClientAuthentications]
 *     description: Client verifyProfile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                type: string
 *               phone: 
 *                type: string
 *               photo:
 *                 type: file
 *                 items: 
 *                   type: String
 *                   format: binary
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
 *               registrationNumber:
 *                 type: string
 *               contactPerson:
 *                 type: string
 *               documents:
 *                 type: file
 *                 items: 
 *                   type: String
 *                   format: binary
 * 
 *     responses:
 *       201:
 *         description: verified successfully
 *       400:
 *         description: Bad Request - Invalid data
 *       409:
 *         description: Conflict - verifyProfile already exists
 */

  clientRouter.post('/organization/verifyProfile',uploaded, verifyToken, verifyClientAndCompleteProfile);

/**
 * @swagger
 * /client/all:
 *   get:
 *     summary: Get all users
 *     tags: [ClientAuthentications]
 *     description: Retrieve a list of all users.
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               fullNames:
 *                 type: string
 *               location:
 *                 type: string
 */

clientRouter.get('/all',  getAllClients);
// ... (other routes)

export default clientRouter;
