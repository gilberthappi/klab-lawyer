import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');

const chatSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    receiver:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
    });
    
    chatSchema.plugin(mongoosePaginate);
    export const CHAT = mongoose.model('chat', chatSchema);