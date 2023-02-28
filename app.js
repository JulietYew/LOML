const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const database = require('./database')
const dotenv = require('dotenv')
dotenv.config();
const router = require('./routes/indexRoutes')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const auth = require('./middleware/auth')
const userRouter = require('./routes/userroutes')


const port =  process.env.PORT|| 5050;


app.use('/api/v1', router)
app.use('/api/v1/',userRouter)
app.post('/', (req, res) => {
    console.log("Working")
})


// an authentication message 
//app.post('/welcome', auth, (req,res) =>{
    //res.status(200).send({message: 'Welcome', success: true})
//})

database()
    .then(() => {
       console.log("Connected to MongoDB Database") 
       app.listen(port, () =>{
   
         console.log(`Server started on port ${port}`)
    })
    
    
}).catch((error) => {
    console.log('An error occured while connecting with the database')
})
    
    
module.exports = app;

