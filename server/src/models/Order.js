const mongoose = require('mongoose')
const {Schema} = require("mongoose")

const OrderSchema = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    worker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Worker'
    },
    work: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WorkType'
    }
}, {timestamps: true})

const OrderModel = mongoose.model('Order', OrderSchema)

module.exports = OrderModel