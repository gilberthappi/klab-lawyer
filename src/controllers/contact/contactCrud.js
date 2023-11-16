//CREATE A NEW CONTACT
import {contact} from "../../models";
import {htmlMessageContact} from "../../utils";
import { sendEmail } from "../../utils";
   

export const  createContact = async(req, res) =>{
  try{
    let Contact = req.body;
    
    let newContact =   await contact.create(Contact);
      
      console.log(newContact);
      res.status(201).json(newContact);
      await sendEmail(Contact.email,"welcome message","thanks",htmlMessageContact);
  }catch(error){
    res.status(500).json({ error: "Internal server error" });
  }
   

};
//GET ALL CONTACTS
export const  getAllContacts = async(req, res) =>{
    const newContact = await  contact.find({});
     res.status(200).json(newContact);
}
//GET A CONTACT BY ID
export const getContactById = async (req, res) => {
    const contactId = req.params.id; // Assuming the ID is passed as a URL parameter
  
    try {
      const Contact = await contact.findById(contactId);
  
      if (!Contact) {
        return res.status(404).json({ error: "User is not found" });
      }
  
      res.status(200).json(Contact);
      console.log(Contact);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
 