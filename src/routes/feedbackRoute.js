
import express  from "express";
const feedbackRouter = express.Router();

import { createFeedback} from "../controllers/feedback";
/*
 * @swagger
 * components:
 *   schemas:
 *     feedback:
 *       type: object
 *       required:
 *         - emails
 *       properties:
 *         id:
 *           type: string
 *           description: auto generated id
 *         email:
 *           type: string
 *           description: email of the user
 *         fullNames:
 *           type: String
 *           description: The response 
 *         subject:
 *           type: String
 *           description: The response
 *         content:
 *           type: String
 *           description: The response
 *       example:
 *         id: 2d3f
 *         emails: "example@gmail.com"
 *         replays: "Yeah its okay"
 */
/**
 * @swagger
 * tags:
 *   name: feedback
 *   description: The contacts managing API
 */
/**
 * @swagger
 * /feedback/create:
 *   post:
 *     summary: Create a new feed back
 *     tags: [Contacts]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/feedback'
 *     responses:
 *       201:
 *          description: The new contact data was successfully created
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/contacts'
 *       500:
 *          description: Internal Server Error
 */
//contactsRouter.get("/getAll", getAllContacts);
feedbackRouter.post("/create",createFeedback);
//contactsRouter.delete("/:id",removeDatac);
// studentsRouter.put("/:id",putData);
 //contactsRouter.get("/getById/:id", getContactById);
 //contactsRouter.patch("/:id",UpdateDatac);

export default feedbackRouter;
              
//module.exports =studentsRouter; 