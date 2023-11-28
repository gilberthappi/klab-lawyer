import express from 'express';
import {
    createChat,
    getChats,
    deleteChat,
    deleteMessage
} from '../controllers/chat/chat.js';
import { verifyToken, uploaded, isAdmin } from '../middleware';

const chatRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Chat
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
 *     ChatMessage:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         sender:
 *           type: string
 *         receiver:
 *           type: string
 *       required:
 *         - message
 *         - sender
 *         - receiver
 */

/**
 * @swagger
 * /chat/chatting:
 *   post:
 *     summary: Send a chat message
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Chat message sent successfully
 *       400:
 *         description: Bad Request - Invalid data
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 *       500:
 *         description: Internal Server Error
 */
chatRouter.post('/chatting', uploaded, createChat);

/**
 * @swagger
 * /chat/{caseId}:
 *   get:
 *     summary: Get chat messages for a case
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: caseId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the case
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 *       403:
 *         description: Forbidden - User is not associated with the case
 *       500:
 *         description: Internal Server Error
 */
chatRouter.get('/:caseId', verifyToken, getChats);

/**
 * @swagger
 * /chat/{id}:
 *   delete:
 *     summary: Delete a chat message
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the chat message
 *     responses:
 *       200:
 *         description: Chat message deleted successfully
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 *       403:
 *         description: Forbidden - User is not authorized to delete the chat message
 *       404:
 *         description: Not Found - Chat message not found
 *       500:
 *         description: Internal Server Error
 */
chatRouter.delete('/:id', verifyToken, deleteChat);

/**
 * @swagger
 * /chat/message/{id}:
 *   delete:
 *     summary: Delete a chat message content
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the chat message
 *     responses:
 *       200:
 *         description: Chat message content deleted successfully
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 *       403:
 *         description: Forbidden - User is not authorized to delete the chat message content
 *       404:
 *         description: Not Found - Chat message not found
 *       500:
 *         description: Internal Server Error
 */
chatRouter.delete('/message/:id', verifyToken, deleteMessage);

export default chatRouter;
