import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        min: 3,
        max: 255
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: 6,
        max: 255
    },
    phone: {
        type: String,
        required: false,
        min: 10,
        max: 15
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    confirmPassword: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    image: {
         
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    country: {
        type: String,
        required: false,
        min: 3,
        max: 255
    },
    city: {
        type: String,
        required: false,
        min: 3,
        max: 255
    },
    district: {
        type: String,
        required: false,
        min: 3,
        max: 255
    },
    sector: {
        type: String,
        required: false,
        min: 3,
        max: 255
    },
    cell: {
        type: String,
        required: false,
        min: 3,
        max: 255
    },
    nationalID: {
        type: String,
        required: false,
        min: 3,
        max: 255
    },
    role: {
        type: String,
        default: 'user' 
         },
    date: {
        type: Date,
        default: Date.now
    },

});

clientSchema.plugin(mongoosePaginate);
export const CLIENT = mongoose.model('Client', clientSchema);