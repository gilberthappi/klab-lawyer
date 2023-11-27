import {testimony} from "../../models";
export const  createTestimony = async(req, res) =>{
   try{
    let Testimony = req.body;
    let newTestimony =   await testimony.create(Testimony);
      console.log(newTestimony);
      console.log('newTestimony================', newTestimony);
      res.status(201).json(newTestimony);
 }catch(error){
   res.status(500).json({ error: "Internal server error" });
  }
};
//GET ALL TESTIMONIES
export const getAll = async (req, res) => {
  try {
    let allTestimonies = await testimony.find({});
    res.status(200).json(allTestimonies);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
//GET BY A TESTIMONY ID
export const getbyId = async (req, res) => {
    const testimonyId = req.params.id; // Assuming the ID is passed as a URL parameter
  
    try {
      const TESTIMONY = await testimony.findById(testimonyId);
  
      if (!TESTIMONY) {
        return res.status(404).json({ error: "Testimony is not found" });
      }
  
      res.status(200).json(TESTIMONY);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
   //DELETETE A testimony
export const deleteTestimonyById = async (req, res) => {
    const testimonyId = req.params.id; // Assuming the ID is passed as a URL parameter
  
    try {
      const deletedTestimony = await testimony.findByIdAndDelete(testimonyId);
  
      if (!deletedTestimony) {
        return res.status(404).json({ error: "Testimony  not found" });
      }
  
      res.status(200).json({ message: "Testimony deleted successfully", deletedTestimony });
     } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };