

const mongoose = require('mongoose')

const testSchema = mongoose.Schema({
    fistName : String,
    lastName  : String,
    email : String,
    contact : String,
    project : String
})

const testModel = mongoose.model("test", testSchema)

module.exports = testModel