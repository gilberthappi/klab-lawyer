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
} from '../controllers/authantecation/lawyerAuth';
import { verifyToken, uploaded, isAdmin } from '../middleware';

const lawyerRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: LawyerAuthentications
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
 *     Lawyer:
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
 *           default: 'lawyer'
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
 * /lawyer/signup:
 *   post:
 *     summary: Lawyer Signup
 *     tags: [LawyerAuthentications]
 *     description: Register a new Lawyer.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               userType:
 *                type: string
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
 *               documents:
 *                 type: file
 *                 items: 
 *                   type: String
 *                   format: binary
 *             required:
 *               - email
 *               - password
 *               - confirmPassword
 *               - userType
 *     responses:
 *       201:
 *         description: Lawyer registered successfully
 *       400:
 *         description: Bad Request - Invalid data
 *       409:
 *         description: Conflict - User already exists
 */
lawyerRouter.post('/signup', uploaded, signup);


/**
 * @swagger
 * /lawyer/login:
 *   post:
 *     summary: Lawyer Login
 *     tags: [LawyerAuthentications]
 *     description: Authenticate a Lawyer and obtain an access token.
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
 *         description: Lawyer authenticated, access token obtained
 *       401:
 *         description: Unauthorized - Invalid credentials
 */

lawyerRouter.post('/login', uploaded, login);

/**
 * @swagger
 * /lawyer/changePassword:
 *   post:
 *     summary: Lawyer change Password
 *     tags: [LawyerAuthentications]
 *     description: Change the password of an authenticated Lawyer.
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

lawyerRouter.post('/changePassword',uploaded, verifyToken, changePassword);

/**
 * @swagger
 * /lawyer/forgotPassword:
 *   post:
 *     summary: Forgot Password
 *     tags: [LawyerAuthentications]
 *     description: Initiate the process to reset the Lawyer's password.
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

lawyerRouter.post('/forgotPassword',uploaded, forgotPassword); 

/**
 * @swagger
 * /lawyer/resetPassword:
 *   post:
 *     summary: Reset Password
 *     tags: [LawyerAuthentications]
 *     description: Reset the Lawyer's password using a valid reset token.
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

lawyerRouter.post('/resetPassword',uploaded, resetPassword);


  /**
 * @swagger
 * /lawyer/verifyProfile:
 *   post:
 *     summary: Lawyer verifyProfile
 *     tags: [LawyerAuthentications]
 *     description: Lawyer verifyProfile
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

  lawyerRouter.post('/verifyProfile',uploaded, verifyToken, verifyClientAndCompleteProfile);

  

/**
 * @swagger
 * /lawyer/all:
 *   get:
 *     summary: Get all Lawyer
 *     tags: [LawyerAuthentications]
 *     description: Retrieve a list of all lawyers.
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

lawyerRouter.get('/all',  getAllClients);
// ... (other routes)

export default lawyerRouter;
