//引入db配置
import { sequelize, DataTypes } from '../../config/db/sequelize.js'
const userModel = sequelize.define('user', {
  username: { // 用户名
    type: DataTypes.STRING,
    allowNull: false,
    field: 'username'
  },
  password: { // 密码
    type: DataTypes.STRING,
    allowNull: false,
    field: 'password'
  },
  avatar: { // 头像
    type: DataTypes.TEXT,
    allowNull: true
  },
  email: {  // 电子邮箱
    type: DataTypes.STRING,
    allowNull: false,
    field: 'email'
  },
  introduce: { // 个人简介
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'introduce'
  }
},{
  // Other model options go here
})
export default userModel