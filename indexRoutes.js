const router = require('express').Router()
const roomRoutes = require('./room_routes')
const roomTypeRoutes = require('./roomType_routes')

router.use('/rooms',roomRoutes )
router.use('/room-types', roomTypeRoutes)

module.exports = router