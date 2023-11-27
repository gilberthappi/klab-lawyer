//(Feedback.email,Feedback.subject,Feedback.content
import mongoose from "mongoose";
const testimoniesSchema = mongoose.Schema({
    fullNames: String,
    content: String,

});
export const testimony =mongoose.model("testimony", testimoniesSchema);
