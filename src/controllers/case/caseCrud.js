
//CODES UNDER TESTING

// ================================================================================
  import multer from "multer";
  import { Case } from "../../models";
  import { isAdmin } from "../../middleware";
  import { storage, uploaded } from "../../middleware/photoStorage"; // Replace with the correct path to your multer configuration file

  export const createCase = async (req, res) => {
  try {
      uploaded(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
          return res.status(400).json({ error: "File upload error" });
        } else if (err) {
          return res.status(500).json({ error: "Internal server error" });
      }

        let CASE = req.body;
        
        // Assuming 'photo' is the name of the field for the uploaded photo
      if (req.files['photo']) {
          CASE.photo = req.files['photo'][0].filename;
      }

      // Assuming 'documents' is the name of the field for the uploaded documents
        if (req.files['documents']) {
          CASE.documents = req.files['documents'].map(doc => doc.filename);
      }

        let newCase = await Case.create(CASE);
        console.log(newCase);
        console.log('newcase================', newCase);
        res.status(201).json(newCase);
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

// ==========================-----------------------===============================














// import {Case} from "../../models";
// import { isAdmin } from "../../middleware";
// export const  createCase = async(req, res) =>{
//    try{
//     let CASE = req.body;
//     let newCase =   await Case.create(CASE);
//       console.log(newCase);
//       console.log('newcase================', newCase);
//       res.status(201).json(newCase);
//  }catch(error){
//    res.status(500).json({ error: "Internal server error" });
//   }
// };
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
