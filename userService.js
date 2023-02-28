const User = require('../model/user');
class UserService {
    // create a new user
    async createUser (newUser){
        return await User.create(newUser)
    }
    // get all users
    async getAllUsers (filter){
       return await User.find(filter)

    }
    // edit a user by username
    async editUser (id, data){
        return await User.findByIdAndUpdate({_id:id}, data);

    }
    // delete a room by id
    async deleteUser (id){
        return await User.findByIdAndDelete({_id:id});
    }
    // get a room by id
    async getUser (filter) {
        return await User.findOne(filter);
    }

}

module.exports = new UserService();