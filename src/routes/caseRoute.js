
import express  from "express";
import { isAdmin } from "../middleware"
const caseRouter = express.Router();

import {createCase,getbyId, getAll,updateCase,deleteCaseById} from "../controllers/case";
/*
 * @swagger
 * components:
 *   schemas:
 *     case:
 *       type: object
 *       required:
 *         - caseTittle
 *       properties:
 *         caseTittle:
 *           type: string
 *           description: auto generated id
 *         typeOfCase:
 *           type: string
 *           description: email of the user
 *         Date:
 *           type: default
 *           description: The response 
 *       example:
 *         caseTitle: robbery
 *         typeOfCase: Family
 *         Date: 12/dec/2022
 */
/**
 * @swagger
 * tags:
 *   name: Case
 *   description: The Case managing API
 */
/**
 * @swagger
 * /Case/create:
 *   post:
 *     summary: Create a new case
 *     tags: [Case]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/contacts'
 *     responses:
 *       201:
 *          description: The new case data was successfully created
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/contacts'
 *       500:
 *          description: Internal Server Error
 */
/**
 * @swagger
 * /Case/getAllCases:
 *    get:
 *      summary: Returns the list of Cases
 *      responses:
 *        200:
 *          description: The list of the cases
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items: 
 *                  $ref: '#/components/schemas/Case'
 */
/**
 * @swagger
 * /Case/getCaseById/{id}:
 *   get:
 *     summary: Get the case by ID
 *     tags:
 *       - Case
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The case ID
 *     responses:
 *       200:
 *         description: The case description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Case'
 *       404:
 *         description: The user was not found
 */
/**
 * @swagger
 * /Case/updateCase/{id}:
 *   patch:
 *     summary: Update the case by ID
 *     tags:
 *       - Case
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The case ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Case'
 *     responses:
 *       200:
 *         description: The case was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/case'
 *       404:
 *         description: The case was not found
 *       500:
 *         description: Some error occurred
 */
/**
 * @swagger
 * /Case/{id}:
 *   delete:
 *     summary: Remove the case by ID
 *     tags:
 *       - Case
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The case ID
 * 
 *     responses:
 *       200:
 *         description: The case was deleted successfully
 *       404:
 *         description: The case was not found
 */
//usersRouter.use(verifyToken);
caseRouter.get("/getAllCases", getAll);
caseRouter.post("/create",createCase);
caseRouter.delete("/deleteCase/:id",deleteCaseById);
// studentsRouter.put("/:id",putData);
 caseRouter.get("/getCaseById/:id", getbyId);
 caseRouter.patch("/updateCase/:id",updateCase);

export default caseRouter;
              
//module.exports =studentsRouter; 