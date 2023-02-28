const authAdmin = async (req,res,next) =>{
    if ( req.user && req.user.role == 'admin'){
        res.status(200).send({message: 'Authorized access ', success:true})
        next()
    }else{
        res.status(404).send({message: "Unauthorized access", success: false})
    }

}
module.exports = authAdmin
    

