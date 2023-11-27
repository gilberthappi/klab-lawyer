import mongoose from "mongoose";
const contactSchema = mongoose.Schema({
    email: String,
    fullNames: String,
    phoneNumber: String,
    message: String,

});
export const contact =mongoose.model("contact", contactSchema);
