import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');

const lawyerSchema = new mongoose.Schema({
  // add lawyer specific fields here
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
        required: false,
        min: 6,
        max: 255
    },
    photo: {
        type: String,
        required: false,
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
    nationalID: {
        type: String,
        required: false,
        min: 3,
        max: 255
    },
    category: {
        type: String,
        required: false,
        min: 3,
        max: 255
    },
    isLawyer: {
        type: Boolean,
        default: false,
    },
    documents: {
        type: Array,
        required: false,
    },
    userType: {
        type: String,
        enum: ['individual', 'organization', 'admin', 'lawyer'],
        required: false,
      },
      role: {
        type: String,
        default: 'lawyer'
     },
    });
    
    lawyerSchema.plugin(mongoosePaginate);
    export const LAWYER = mongoose.model('lawyer', lawyerSchema);