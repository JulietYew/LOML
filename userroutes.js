const express = require('express')

const userRouter = express.Router()

const  {
    registerUser,
    loginUser,
    getOneUser,
    getUsers,
    updateUser,
    deleteOne

} = user_controller = require('../controller/user_controller')
const authAdmin = require('../middleware/authAdmin')
const authUser = require('../middleware/auth')



userRouter.post('/register',authAdmin, authUser, registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/users',authAdmin, authUser, getUsers)
userRouter.get('/:id', authAdmin, getOneUser)
userRouter.patch('/:id',authAdmin, authUser, updateUser)
userRouter.delete('/:id',authAdmin, authUser, deleteOne)

module.exports = userRouter