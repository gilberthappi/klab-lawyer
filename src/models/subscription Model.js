import mongoose from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        min: 3,
        max: 255
    },
    email: {
        type: String,
        required: false,
        unique: false,
        min: 6,
        max: 255
    },
    phone: {
        type: String,
        required: false,
        min: 10,
        max: 15
    },
    subscriptionType: {
        type: String,
        required: false,
        enum: ['Basic', 'Premium', 'Gold', 'Diamond'],
    },
    subscriptionDuration: {
        type: String,
        enum: ['3 months', '6 months', '1 year', '2 years', '5 years', '10 years'],
        required: true
    },
    subscriptionAmount: {
        type: String,
        required: false,
        min: 3,
        max: 255
    },
    subscriptionDate: {
        type: String,
        required: false,
        min: 3,
        max: 255
    },
    subscriptionStatus: {
        type: String,
        required: false,
        default: 'Pending',
        enum: ['Pending', 'Approved', 'Rejected'],
    },
    subscriptionPaymentMethod: {
        type: String,
        required: false,
        min: 3,
        max: 255
    },
    subscriptionPaymentStatus: {
        type: String,
        required: false,
        default: 'Pending',
        enum: ['Pending', 'Approved', 'Rejected'],
    },
    subscriptionPaymentDate: {
        type: String,
        required: false,
        min: 3,
        max: 255
    },

     });
    
    subscriptionSchema.plugin(mongoosePaginate);
    export const Subscription = mongoose.model('subscription', subscriptionSchema);