const dotenv = require('dotenv')
dotenv.config();
const constants = {
    DATABASE_URI: process.env.DATABASE_URI,

    MESSAGES: {
       EXIST: "Room already exist",
       FETCHED: "Room fetched successfully",
       UPDATED: "Room updated successfully",
       CREATED: "Room created successfully",
       ERROR: "Resource error",
       DELETED: "Room deleted successfully",
       NOTEXIST: "Room does not exist"
    }
};
module.exports = constants;