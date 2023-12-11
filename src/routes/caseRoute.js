
import express  from "express";
import { isAdmin,isLawyer ,verifyToken} from "../middleware";
const caseRouter = express.Router();

import {createCase,getbyId, getAll,updateCase,deleteCaseById} from "../controllers/case";
/**
 * @swagger
 * tags:
 *   name: Case
 *   description: The Case managing API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Case:
 *       type: object
 *       required:
 *         - caseTitle
 *       properties:
 *         caseTitle:
 *           type: string
 *           description: Title of the case
 *         typeOfCase:
 *           type: string
 *           enum: ['family', 'criminal', 'educational']
 *           description: Type of the case
 *         dateOfIncident:
 *           type: string
 *           description: Date of the incident
 *         progress:
 *           type: string
 *           enum: ['pending', 'complete', 'cancelled']
 *           description: Progress status of the case
 *         assignedTo:
 *           type: string
 *           description: Assigned Lawyer for the case
 *         paymentMethod:
 *           type: string
 *           description: Method of payment
 *         photo:
 *           type: array
 *           items:
 *             type: string
 *             format: binary
 *           description: images for showing evidences
 *         documents:
 *           type: array
 *           items:
 *             type: string
 *             format: binary
 *           description: documents for explaining the case
 *       example:
 *         caseTitle: "robbery"
 *         typeOfCase: "Family"
 *         dateOfIncident: "2022-12-12"
 *         progress: "pending"
 *         assignedTo: "user123"
 *         paymentMethod: "cash"
 */

/**
 * @swagger
 * /case/create:
 *   post:
 *     summary: Create a new case
 *     tags: [Case]
 *     description: Register a new case
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Case'
 *     responses:
 *       201:
 *         description: Case registered successfully
 *       400:
 *         description: Bad Request - Invalid data
 */

/**
 * @swagger
 * /case/getAllCases:
 *   get:
 *     summary: Get all cases
 *     tags: [Case]
 *     description: Retrieve all cases
 *     responses:
 *       200:
 *         description: List of cases
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Case'
 */

/**
 * @swagger
 * /case/getCaseById/{id}:
 *   get:
 *     summary: Get a case by ID
 *     tags: [Case]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The case ID
 *     responses:
 *       200:
 *         description: The case details by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Case'
 *       404:
 *         description: Case not found
 */

/**
 * @swagger
 * /case/userUpdateCase/{id}:
 *   patch:
 *     summary: A user may update a case by ID
 *     tags: [Case]
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
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Case'
 *     responses:
 *       200:
 *         description: The case was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Case'
 *       404:
 *         description: Case not found
 *       500:
 *         description: Some error occurred
 */

/**
 * @swagger
 * /case/adminUpdateCase/{id}:
 *   patch:
 *     summary: An admin may update a case by ID to assign it to the lawyer
 *     tags: [Case]
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
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Case'
 *     responses:
 *       200:
 *         description: The case was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Case'
 *       404:
 *         description: Case not found
 *       500:
 *         description: Some error occurred
 */

/**
 * @swagger
 * /case/lawyerUpdateCase/{id}:
 *   patch:
 *     summary: A lawyer may update a case by ID to show the progress and to approve or reject
 *     tags: [Case]
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
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Case'
 *     responses:
 *       200:
 *         description: The case was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Case'
 *       404:
 *         description: Case not found
 *       500:
 *         description: Some error occurred
 */

/**
 * @swagger
 * /case/deleteCase/{id}:
 *   delete:
 *     summary: Delete a case by ID
 *     tags: [Case]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The case ID
 *     responses:
 *       200:
 *         description: Case deleted successfully
 *       404:
 *         description: Case not found
 */
//usersRouter.use(verifyToken);
caseRouter.get("/getAllCases", getAll);
caseRouter.post("/create",verifyToken,createCase);
caseRouter.delete("/deleteCase/:id",deleteCaseById);
// studentsRouter.put("/:id",putData);
  caseRouter.get("/getCaseById/:id", getbyId);
  caseRouter.patch("/userUpdateCase/:id",updateCase);
  caseRouter.patch("/adminUpdateCase/:id",isAdmin,updateCase);
  caseRouter.patch("/lawyerUpdateCase/:id",isLawyer,updateCase);

export default caseRouter;
              
//module.exports =studentsRouter; 