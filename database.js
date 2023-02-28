// connecting to MongoDB
const mongoose = require('mongoose')
const constants = require('./constants')

function database (){
    return mongoose.connect(constants.DATABASE_URI,{useNewUrlParser: true, useUnifiedTopology: true})
    
}
module.exports = database;