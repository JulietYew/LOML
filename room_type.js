const mongoose = require('mongoose')

 

const roomTypeSchema = new mongoose.Schema  ({
  name: {
    type: String,
    required: true,  
  },
  description: {
    type: String
  }

}, {timestamps: true});
const RoomType = mongoose.model('roomType', roomTypeSchema);


module.exports = RoomType;
