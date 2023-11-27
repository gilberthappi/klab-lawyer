import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');

const adminSchema = new mongoose.Schema({
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
        default: true,
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
        default: 'admin'
     },
    });
    
    adminSchema.plugin(mongoosePaginate);
    export const ADMIN = mongoose.model('admin', adminSchema);