import userModelService from '../../service/user.js'
import genPassword from '../../utils/cryp.js'
import jwt from 'jsonwebtoken'
class UserController {
  /**
   * 注册账号
   * @param {*} ctx 
   */
  async registerHandle(ctx) {
    const req = ctx.request.body
    if (req.userName && req.password) {
      try {
        // 加密密码
        req.password = genPassword(req.password); 

        const query = await userModelService.getUserInfo(req.userName,req.password);
        if (query) {
          ctx.response.status = 200;
          ctx.body = {
            code: -1,
            message: '用户已存在'
          }
        } else {
          const allUser = await userModelService.getAllUser()
          const param = {
            userid:allUser.length + 1,
            password: req.password,
            userName: req.userName,
            email: req.email
          }
          await userModelService.userRegist(param);
          ctx.response.status = 200;
          ctx.body = {
            code: 0,
            message: '用户注册成功',
            userInfo: param
          }
        }
      } catch (error) {
        console.log('error', error)
        ctx.response.status = 416;
        ctx.body = {
          code: -1,
          message: '参数不齐全'
        }
      }
    }


  }

  /**
   * 登录账号
   * @param {*} ctx 
   */
  async loginHandle(ctx) {
    const req = ctx.request.body
    // 加密密码
    req.password = genPassword(req.password); 
    const query = await userModelService.getUserInfo(req.userName,req.password);
    ctx.response.status = 200;
    if (query) {
      const token = jwt.sign(
        { name: req.userName },
        "Gopal_token", // secret
        { expiresIn: 60 * 60 } // 1 * 60 s
      );
      ctx.body = {
        code: 0,
        data: {
          message:'登录成功',
          token
        }
      }
    } else {
      ctx.body = {
        code: -1,
        data: {
          message:'登录失败',
        }
      }
    }
  }

  /**
   * 退出登录
   * @param {*} ctx 
   */
  async signOut(ctx){
    
  }
}

const userController = new UserController()
export default userController