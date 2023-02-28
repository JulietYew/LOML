const ServiceRoomType = require('../service/service_roomType')


class ControllerRoomType {
    // create a roomtype
    async createRoomType(req, res) {
        const {roomTypeName, description} = req.body 
        try{
            const existingRoom = await ServiceRoomType.getRoomType({
                name:roomTypeName
            })
            if (existingRoom){
                res.status(404).send({message: 'Roomtype does not exist' || err.message, success: false})
            }

        

            const newRoomType = await ServiceRoomType.createType({
                name: roomTypeName,
                description: description
            
            })
                
                res.status(200).send({message: 'Roomtype created succesfully', success: true, data:newRoomType });
    } catch(error){
        console.log(error)
    }

}
    // get a single roomtype
    async getRoomtype (req,res){
        const RoomTypeId = req.params.id
        try{
            const existingRoom = await ServiceRoomType.getRoomType({
                _id: RoomTypeId
            })
            if (!existingRoom){
                res.status(404).send({message: err.message || 'Roomtype does not exist' , success: false})

            }
            
           res.status(200).send({message:'Roomtype fetched successfully', success: true , data:existingRoom});

        }catch(error){
            console.log(error)
        }

    }

    // get all roomtypes
    async RoomTypes(req,res){
        try{
            const roomtype = await ServiceRoomType.getAllRoomTypes({})
            res.status(200).send({message: 'Roomtypes fetched successfully', success: true, data:roomtype });

        }catch(error){
            console.log(error)
        }

    }
    // edit a roomtype by id
    async editRoomType(req, res){
        const roomTypeId = req.params
        const editRoomType = req.body
        try{
            const existingRoomType = await ServiceRoomType.getRoomType({
                _id: roomTypeId
            
            })
            
            if(!existingRoomType) { 
                res.status(404).send({message: err.message || 'Roomtype does not exist' , success: false})
            }
            

          const newRoomType = await ServiceRoomType.editRoomType({roomTypeId: roomTypeId, editRoomType:editRoomType})
          res.status(200).send({message: 'Roomtype updated successfully', success: true, data:newRoomType});

        } catch(error){
            console.log(error)
        }

    }
    // delete a roomtype by id
    async deleteRoomType (req, res){
        const RoomTypeId = req.params.id 
        try{
           const existingRoom = await ServiceRoomType.getRoomType({
            _id: RoomTypeId
           }) 
           if(!existingRoom){
               res.status(404).send({message: err.message || 'Roomtype does not exist', success: false})

           }
           const deletedRoomType = await ServiceRoomType.deleteRoomType(RoomId)
           res.status(200).send({message: 'Roomtype deleted successfully', success: true, data:deletedRoomType });

        }catch(error){
            console.log(error)
        }

    }

}

module.exports = new ControllerRoomType()
