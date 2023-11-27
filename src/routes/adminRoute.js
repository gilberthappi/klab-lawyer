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
} from '../controllers/authantecation/adminAuth';
import { verifyToken, uploaded, isAdmin } from '../middleware';

const adminRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: AdminAuthentications
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
 *     Admin:
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
 *           default: 'admin'
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
 * /admin/signup:
 *   post:
 *     summary: Admin Signup
 *     tags: [AdminAuthentications]
 *     description: Register a new Admin.
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
 *         description: Admin registered successfully
 *       400:
 *         description: Bad Request - Invalid data
 *       409:
 *         description: Conflict - User already exists
 */

adminRouter.post('/signup', uploaded, signup);


/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Admin Login
 *     tags: [AdminAuthentications]
 *     description: Authenticate a Admin and obtain an access token.
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
 *         description: Admin authenticated, access token obtained
 *       401:
 *         description: Unauthorized - Invalid credentials
 */

adminRouter.post('/login', uploaded, login);

/**
 * @swagger
 * /admin/changePassword:
 *   post:
 *     summary: Admin change Password
 *     tags: [AdminAuthentications]
 *     description: Change the password of an authenticated Admin.
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

adminRouter.post('/changePassword',uploaded, verifyToken, changePassword);

/**
 * @swagger
 * /admin/forgotPassword:
 *   post:
 *     summary: Forgot Password
 *     tags: [AdminAuthentications]
 *     description: Initiate the process to reset the Admin's password.
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

adminRouter.post('/forgotPassword',uploaded, forgotPassword); 

/**
 * @swagger
 * /admin/resetPassword:
 *   post:
 *     summary: Reset Password
 *     tags: [AdminAuthentications]
 *     description: Reset the Admin's password using a valid reset token.
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

adminRouter.post('/resetPassword',uploaded, resetPassword);


  /**
 * @swagger
 * /admin/verifyProfile:
 *   post:
 *     summary: Admin verifyProfile
 *     tags: [AdminAuthentications]
 *     description: Admin verifyProfile
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

  adminRouter.post('/verifyProfile',uploaded, verifyToken, verifyClientAndCompleteProfile);

  

/**
 * @swagger
 * /admin/all:
 *   get:
 *     summary: Get all Admin
 *     tags: [AdminAuthentications]
 *     description: Retrieve a list of all Admin.
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

adminRouter.get('/all',  getAllClients);
// ... (other routes)

export default adminRouter;
