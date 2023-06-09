const userModel = require('../model/user');
// const findUser = async(userId)=>{
//         return await userModel.findOne({ _id: userId });
//      }
// const updateuser=async(userId)=>{
// await userModel.findOneAndUpdate({_id:userId},req.body,{
//     new:true,
//     runValidators:true,
//   })
// }

class UserService {
  async createUser(userInfo) {
    try {
      if (!userInfo) {
        throw new Error('User details is required');
      }

      const savedUser = await userModel.create(userInfo);

      if (savedUser) {
        return savedUser;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
  async getUser({ _id: userId }) {
    try {
      if (!{ _id: userId }) {
        throw new Error('User details is required');
      }

      const savedUser = await userModel
        .findOne({ _id: userId })
        .select('-password');

      if (savedUser) {
        return savedUser;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
  async updateUser({ _id: userId }) {
    try {
      if (!{ _id: userId }) {
        throw new Error('User details is required');
      }

      const savedUser = await userModel.findOneAndUpdate({ _id: userId });
      if (savedUser) {
        return savedUser;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
  async deleteUser({ _id: userId }) {
    try {
      if (!{ _id: userId }) {
        throw new Error('User details is required');
      }

      const savedUser = await userModel.findOneAndDelete({ _id: userId });

      if (savedUser) {
        return savedUser;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
