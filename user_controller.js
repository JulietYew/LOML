const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserService = require('../service/userService')
//const auth = require('../middleware/auth')
const dotenv = require('dotenv')
dotenv.config();


const router = express.Router()

class UserController{
     async registerUser(req, res)  {
        const {username, email, password, role} = req.body  
        try{
            // check if user exist 
            const existingUser = await UserService.getUser({
                name:username
                
            })
            if (existingUser){
                res.status(404).send({message: 'User already exist' || err.message, success: false})
            } 
            const valid = await bcrypt.genSalt(8)
            const encryptedPassword = await bcrypt.hash(password, valid)
            
            // create a new user if the above condition was not met
            const user = await UserService.createUser({
                name:username,
                email: email,
                password: encryptedPassword,
                role: role
            })
            const duration = JWT_EXPIRES_IN
            const token = jwt.sign({
                userId: user._id}, process.env.SECRET_JWT,{expiresIn: duration})
            res.status(200).send({message: 'User registered in successfully',token, user, success: true })
        }catch(error){
        console.log(error)
    }
    }
    
    async loginUser(req, res) {
        const {username, password} = req.body 
        try{
            // check if the user exist
            const user = await UserService.getUser({
                name: username
            })
            if (!user){
                res.status(404).send({message: 'Please register your details before logging in' || err.message, success: false})
                
            }
            const passwordMatch = await bcrypt.compare(user.password, password)
            if (!passwordMatch){
                res.status(404).send({message: 'Invalid password' || err.message, success: false})
    
            }
    
            const token = jwt.sign({userId: user._id}, process.env.SECRET_JWT)
            res.status(200).send({message: 'User logged in successfully',token, user, success: true })
    
        }catch(error){
            console.log(error)
        }
    }
    
     async getOneUser(req,res){
        const userId = req.params.id
        // check if the user exists
        try{
            const existingUser = await UserService.getUser({
                _id: userId
            })
            if (!existingUser){
                res.status(404).send({message: 'User does not exist' , success: false})

            }
            // returns true if the user exist
           res.status(200).send({message: 'User fetched successfully', success: true , data:existingUser});

        }catch(error){
            console.log(error)
        }
     }
     async getUsers(req, res) {
        // get all existing users
        try{
            const users = await UserService.getAllUsers({})
            if(!users){
                res.status(404).send({message: 'Users not found' || err.message, success: false})
            }
            res.status(200).send({message: 'Users found successfully', users})
        }catch(error){
            console.log(error)
        }
            
    }
     async updateUser(req, res){
        const userId = req.params
        const {username, password} = req.body
        // check by id if a user exists
        try{
            
            const existingUser = await UserService.getUser({
                _id: userId
            })
            if (!existingUser){
                res.status(404).send({message:'User does not exist' , success: false})

            }
            // update the user details to the current one
            const updatedUser = await UserService.editUser({
                username:username,
                password: password,
                role: 'admin'
            })
                res.status(200).send({message: 'User updated successfully', success: true, data:updatedUser});      
            
        }catch(error){
            console.log(error)
        }
        
    }
    
     async  deleteOne (req,res) {
        const userId = req.params.id
        // check if a user exist before deleting
        try{
            const existingUser = await UserService.getUser({
                _Id: userId
            })
            if (!existingUser){
                res.status(404).send({message: 'Invalid User' , success: false})
    
            }
            // delete user if the above condition was met
            const deletedUser = await UserService.deleteUser(userId)
            res.status(200).send({message: 'User deleted successfully', success: true, data:deletedUser})
        }catch(error){
            console.log(error)
        }
    }
    

}

module.exports = new UserController()