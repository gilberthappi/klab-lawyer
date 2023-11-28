import mongoose from "mongoose";
const caseSchema = mongoose.Schema({
    caseTitle: String,
    typeOfCase: String,
    dateOfIncident: String,
    progress: {
        type: String,
        enum: ['pending', 'complete', 'canselled'],
        required: false,
      },
    assignedTo:String,
    paymentMenthod:String,
    lawyer: String,
    location: String

});
export const Case =mongoose.model("Case", caseSchema);


