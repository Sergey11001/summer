const mongoose  = require('mongoose')
const {Schema} = require("mongoose")


const WorkTypeSchema = new Schema({
    name: {
        type:String,
        require:true
    },
    price: {
        type:Number,
        require: true,
    }
})

const WorkTypeModel = mongoose.model('WorkType', WorkTypeSchema)

module.exports = WorkTypeModel