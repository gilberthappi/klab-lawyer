import {feedback} from "../../models";
import { sendEmailFeedback } from "../../utils";
   

export const  createFeedback = async(req, res) =>{
  try{
    let Feedback = req.body;
    
    let newFeedback =   await feedback.create(Feedback);
    
      console.log(newFeedback);
      res.status(201).json(newFeedback);
      await sendEmailFeedback(Feedback.email,Feedback.subject,Feedback.content);
  }catch(error){
    res.status(500).json({ error: "Internal server error" });
  }
   

};