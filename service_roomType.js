// a collection for room type
const RoomType = require('../model/room_type');

class ServiceRoomType {
// create a room type
    async createType(newRoomType){
        return await RoomType.create(newRoomType)
    }
    // get a single room type
    async getRoomType (filter){
        return await RoomType.findOne(filter)
    }
    // get all room types
    async getAllRoomTypes (filter){
       return await RoomType.find(filter)
    }
    // edit a room type
    async editRoomType(id, updatedRoom){
        return await RoomType.findByIdAndUpdate({_id:id}, updatedRoom)
    }
    // delete a room type
    async deleteRoomType(id){
        return await RoomType.findByIdAndDelete({_id:id})
    }

}
module.exports = new ServiceRoomType();