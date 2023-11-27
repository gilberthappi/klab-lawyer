//(Feedback.email,Feedback.subject,Feedback.content
import mongoose from "mongoose";
const feedbackSchema = mongoose.Schema({
    email: String,
    fullNames: String,
    subject: String,
    content: String,

});
export const feedback =mongoose.model("feedback", feedbackSchema);
