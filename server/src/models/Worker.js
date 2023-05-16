const mongoose = require('mongoose')
const {Schema} = require("mongoose")

const WorkerSchema = new Schema({
    name: {
        type:String,
        require: true
    },
    surname: {
        type:String,
        require: true
    },
    post: {
        type:String,
        require: true
    },
    experience: {
        type: Number,
        require:true
    }
})

const WorkerModel = mongoose.model('Worker', WorkerSchema)

module.exports = WorkerModel