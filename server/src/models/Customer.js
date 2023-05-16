const mongoose = require('mongoose')
const {Schema} = require("mongoose")

const CustomerSchema = new Schema({
    name: {
        type:String,
        require: true
    },
    surname: {
        type:String,
        require: true
    },
    email: {
        type: String,
        match: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    }
})

const CustomerModel = mongoose.model('Customer', CustomerSchema)

module.exports = CustomerModel