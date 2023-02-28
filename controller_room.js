const ServiceRoom = require('../service/service_room')
const ServiceRoomType = require('../service/service_roomType')
const constants = require('../constants')
const { MESSAGES } = constants


class ControllerRoom {

    // create a room
    async createRoom(req, res) {
        const {name , roomType , price } = req.body
        
        try{
            // check if rooms exist
            const existingRoom = await ServiceRoom.getRoom({
                name:name
            })
            if (existingRoom){
                return res.status(404).send({message: MESSAGES.EXIST || err.message, success: false})
            }
            // check if roomtype exist
            const existingRoomType = await ServiceRoomType.getRoomType({
                name:roomType
            })
            if (!existingRoomType){
                return res.status(404).send({message: "Roomtype does not exist" || err.message, success: false})
            }
            
            
        
        
        // create a new room
        const newRoom = await ServiceRoom.create({
            name: name,
            roomType: existingRoomType._id,
            price: price
        })
            return res.status(200).send({message: MESSAGES.CREATED, success: true, data:newRoom });
        
           
            
        }catch(error){
        console.log(error)
    }

}


    
    // get a single 
    async getRoom (req,res){
        const RoomId = req.params.id
        // check if the room exist
        try{
            const existingRoom = await ServiceRoom.getRoom({
                _id: RoomId
            })
            if (!existingRoom){
                return res.status(404).send({message: err.message || MESSAGES.NOTEXIST , success: false})

            }
            
           return res.status(200).send({message: MESSAGES.FETCHED, success: true , data:existingRoom});

        }catch(error){
            console.log(error)
        }

    }

    
    
    // get all rooms
    async getRooms(req,res){
        try{
            if(!search && !roomType && !minPrice && !maxPrice){
                const rooms = await ServiceRoom.getAllRooms({})
                return res.status(200).send({message: "Returned rooms", success: true})
            }
            const {search, roomType, minPrice, maxPrice} = req.query
            const query = {}
            if (search) {
                query.search = search 
            }
            if (roomType){
                query.roomType = roomType
            }
            if (minPrice && maxPrice){
                query.price = {}
                if (minPrice){
                    query.price.$gte = minPrice
                }
                if (maxPrice){
                    query.price.$lte = maxPrice
                }
            }
            const allRooms = await ServiceRoom.getAllRooms(query)
            res.status(200).send({message: 'Rooms found successfully', success: true, data:allRooms });

        }catch(error){
            console.log(error)
        }

    }
    // edit a room by 
    async editRoom(req, res){
        const roomId = req.params
        const editRoom = req.body
        // check if the room to edit exist
        try{
            const existingRoom = await ServiceRoom.getRoomById({
                _id: roomId
            
            })
            
            if(!existingRoom) { 
                res.status(404).send({message: err.message || MESSAGES.NOTEXIST , success: false})
            }
            

          const newRoom = await ServiceRoom.editRoomById({roomId: roomId, editRoom:editRoom})
          res.status(200).send({message: MESSAGES.UPDATED, success: true, data:newRoom});

        } catch(error){
            console.log(error)
        }

    }
    
    // delete a room by id
    async deleteRoom (req, res){
        const RoomId = req.params.id 
        try{
           const existingRoom = await ServiceRoom.getRoomById({
            _id: RoomId
           }) 
           if(!existingRoom){
               res.status(404).send({message: err.message || MESSAGES.NOTEXIST , success: false})

           }
           const deletedRoom = await ServiceRoom.deleteRoomById(RoomId)
           res.status(200).send({message: MESSAGES.DELETED, success: true, data:deletedRoom });

        }catch(error){
            console.log(error)
        }

    }



}
module.exports = new ControllerRoom();

