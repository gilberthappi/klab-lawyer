import mongoose from "mongoose";
const caseSchema = mongoose.Schema({
    caseTitle: String,
    typeOfCase: String,
    dateOfIncident: String,
    location: String,

});
export const Case =mongoose.model("Case", caseSchema);


