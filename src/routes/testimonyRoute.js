
import express  from "express";
import { isAdmin } from "../middleware"
const testimonyRouter = express.Router();

import {createTestimony, getAll, getbyId, deleteTestimonyById} from "../controllers/testimony";
/*
 * @swagger
 * components:
 *   schemas:
 *     testimony:
 *       type: object
 *       required:
 *         - fullNames
 *         - content
 *       properties:
 *         fullNames:
 *           type: string
 *           description: name of the user
 *         content:
 *           type: string
 *           description: user's testimony
 *       example:
 *         fulllNames: Ephatse
 *         content:I am here as a witness that this works and i am sure you to can get your experinence
 */
/**
 * @swagger
 * tags:
 *   name: Testimony
 *   description: The Testimony managing API
 */
/**
 * @swagger
 * /testimony/create:
 *   post:
 *     summary: Create a new testimony
 *     tags: [Testimony]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/testimony'
 *     responses:
 *       201:
 *          description: The new testimony data was successfully created
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/testimony'
 *       500:
 *          description: Internal Server Error
 */
/**
 * @swagger
 * /testimony/getAllTestimonies:
 *    get:
 *      summary: Returns the list of testimonies
 *      responses:
 *        200:
 *          description: The list of the testimonies
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items: 
 *                  $ref: '#/components/schemas/testimony'
 */
/**
 * @swagger
 * /testimony/getTestimonyById/{id}:
 *   get:
 *     summary: Get the testimony by ID
 *     tags:
 *       - Testimony
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The testimony ID
 *     responses:
 *       200:
 *         description: The testimony description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/testimony'
 *       404:
 *         description: The testimony was not found
 */

/**
 * @swagger
 * /testimony/deleteTestimony/{id}:
 *   delete:
 *     summary: Remove the testimony by ID
 *     tags:
 *       - Testimony
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The testimony ID
 * 
 *     responses:
 *       200:
 *         description: The testimony was deleted successfully
 *       404:
 *         description: The testimony was not found
 */
//usersRouter.use(verifyToken);
testimonyRouter.get("/getAllTestimonies", getAll);
testimonyRouter.post("/create",createTestimony);
testimonyRouter.delete("/deleteTestimony/:id",deleteTestimonyById);
// studentsRouter.put("/:id",putData);
 testimonyRouter.get("/getTestimonyById/:id", getbyId);
 //caseRouter.patch("/updateCase/:id",updateCase);
export default testimonyRouter;
              
//module.exports =studentsRouter; 