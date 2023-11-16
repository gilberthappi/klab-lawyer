import mongoose from "mongoose";
const contactSchema = mongoose.Schema({
    emails: String,
    replays: String
});
export const contact =mongoose.model("contact", contactSchema);