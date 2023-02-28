const jwt = require('jsonwebtoken')
const UserService = require('../service/userService')
const dotenv = require('dotenv')
dotenv.config();

// a middleware to autheticate users 

    const authUser = async(req, res, next) => {
        try{
            // the req.header.authorization is used to return the authentication token
            // the split ('')[1] is used to extract the token from the req.headers
            const token = req.header.authorization.split('')[1]
            const verified = jwt.verify(token, process.env.SECRET_JWT)
            const user = await UserService.getUser({_id:verified.userId, token:'tokens.token'})
    
            if(!user){
                console.log("Not verified")
            }
            req.token = token
            req.user = user
            next()
            
        }catch(error){
            res.status(404).send({message: err.message || 'Please authenticate' , success: false})
        
        }
    }
    
    
    


module.exports = authUser