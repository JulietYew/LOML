// a user model that add the roles of a guest and an admin
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const userSchema = new Schema({
    username:{
        type:String,
        required: true,
        lowercase: true

    },
    email:{
        type: String,
        required: true,
        lowercase: true

    },
    password:{
        type: String,
        required: true,
        lowercase: true
    }, 
    role:{
        type: String,
        required: true,
        enum: ['guest', 'admin'], default: 'guest'
    }

   
})


// saving the password to the database
userSchema.methods.isValidPassword = async function(password){
    try{
        return await bcrypt.compare(password, this.password)
    }catch(error){
        console.log(error)
    }
}



const User = mongoose.model('User', userSchema);
module.exports = User;