const express = require('express')
 
const routerType = express.Router()
const  {
    createRoomType,
    getRoomtype,
    RoomTypes,
    editRoomType,
    deleteRoomType

} = controller_roomtype = require('../controller/controller_roomtype')

routerType.post('/create', createRoomType)
routerType.get('/:id', getRoomtype)
routerType.get('/', RoomTypes)
routerType.patch('/:id', editRoomType)
routerType.delete('/:id', deleteRoomType)

module.exports = routerType