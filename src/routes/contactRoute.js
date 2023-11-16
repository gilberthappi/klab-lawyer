
import express  from "express";
import { isAdmin } from "../middleware";
const contactsRouter = express.Router();

import { createContact, getAllContacts, getContactById} from "../controllers/contact";
/*
 * @swagger
 * components:
 *   schemas:
 *     contacts:
 *       type: object
 *       required:
 *         - emails
 *       properties:
 *         id:
 *           type: string
 *           description: auto generated id
 *         emails:
 *           type: string
 *           description: email of the user
 *         replays:
 *           type: default
 *           description: The response 
 *       example:
 *         id: 2d3f
 *         emails: "example@gmail.com"
 *         replays: "Yeah its okay"
 */
/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: The contacts managing API
 */
/**
 * @swagger
 * /contacts/create:
 *   post:
 *     summary: Create a new contact
 *     tags: [Contacts]
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
 *          description: The new contact data was successfully created
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/contacts'
 *       500:
 *          description: Internal Server Error
 */
/**
 * @swagger
 * /contacts/getAll:
 *    get:
 *      summary: Returns the list of contacts
 *      responses:
 *        200:
 *          description: The list of the contacts
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items: 
 *                  $ref: '#/components/schemas/contacts'
 */
/**
 * @swagger
 * /contacts/getById/{id}:
 *   get:
 *     summary: Get the contact by ID
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contact ID
 *     responses:
 *       200:
 *         description: The user description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/contacts'
 *       404:
 *         description: The user was not found
 */
/**
 * @swagger
 * /contacts/{id}:
 *   put:
 *     summary: Update the contact by ID
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contact ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contacts'
 *     responses:
 *       200:
 *         description: The contact was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/contacts'
 *       404:
 *         description: The user was not found
 *       500:
 *         description: Some error occurred
 */
/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Remove the contact by ID
 *     tags:
 *       - Contacts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The contact ID
 * 
 *     responses:
 *       200:
 *         description: The contact was deleted successfully
 *       404:
 *         description: The contact was not found
 */
//usersRouter.use(verifyToken);
contactsRouter.get("/getAll", getAllContacts);
contactsRouter.post("/create",createContact);
//contactsRouter.delete("/:id",removeDatac);
// studentsRouter.put("/:id",putData);
 contactsRouter.get("/getById/:id", getContactById);
 //contactsRouter.patch("/:id",UpdateDatac);

export default contactsRouter;
              
//module.exports =studentsRouter; 