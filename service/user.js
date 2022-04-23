
import userModel from '../models/user/index.js'

//自动创建表
userModel.sync({ force: false });

class UserModelService {
  async userRegist(data) {
    return await userModel.create({
      userid: data.userid,
      username: data.userName,
      password: data.password,
      email: data.email,
    })
  }

  async getUserInfo(username,password) {
    if (username && password) {
      let res = await userModel.findOne({
        where: {
          username,
          password
        }
      })
      return res
    } 
    return false
    
  }

  async getAllUser() {
    return await userModel.findAll()
  }
}
const userModelService = new UserModelService()
export default userModelService