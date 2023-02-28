const express = require('express')
 
const router= express.Router()
const  {
    createRoom,
    getRoom,
    getRooms,
    editRoom,
    deleteRoom

} = controller_room = require('../controller/controller_room')

router.post('/create', createRoom)
router.get('/:id', getRoom)
router.get('/', getRooms)
router.patch('/:id', editRoom)
router.delete('/:id', deleteRoom)
router.post('/', (req, res) => {
    console.log("Working")
})


module.exports = router
