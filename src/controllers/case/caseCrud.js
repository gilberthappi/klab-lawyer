import {Case} from "../../models";
export const  createCase = async(req, res) =>{
   try{
    let CASE = req.body;
    let newCase =   await Case.create(CASE);
      console.log(newCase);
      console.log('newcase================', newCase);
      res.status(201).json(newCase);
 }catch(error){
   res.status(500).json({ error: "Internal server error" });
  }
};
//GET ALL CASES
export const getAll = async (req, res) => {
  try {
    let allCases = await Case.find({});
    res.status(200).json(allCases);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//GET BY ID
export const getbyId = async (req, res) => {
    const caseId = req.params.id; // Assuming the ID is passed as a URL parameter
  
    try {
      const CASE = await Case.findById(caseId);
  
      if (!CASE) {
        return res.status(404).json({ error: "User is not found" });
      }
  
      res.status(200).json(CASE);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
  //UPDATE A CASE


  export const updateCase = async (req, res) => {
    const caseId = req.params.id; // Assuming the ID is passed as a URL parameter
    const updatedData = req.body;
  
    try {
      const foundCase = await Case.findById(caseId);
  
      if (!foundCase) {
        return res.status(404).json({ error: "Case not found" });
      }
  
      // Update the foundCase object with the provided data
      Object.assign(foundCase, updatedData);
  
      // Save the updated case
      const updatedCase = await foundCase.save();
  
      res.status(200).json(updatedCase);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
  //DELETET A CASE
export const deleteCaseById = async (req, res) => {
  const caseId = req.params.id; // Assuming the ID is passed as a URL parameter

  try {
    const deletedCase = await Case.findByIdAndDelete(caseId);

    if (!deletedCase) {
      return res.status(404).json({ error: "Case not found" });
    }

    res.status(200).json({ message: "Case deleted successfully", deletedCase });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
