/**
 * 初始化数据库操作
 * 关联模型（表）：
 * A.hasOne(B); // A 有一个 B
 * A.belongsTo(B); // A 属于 B
 * A.hasMany(B); // A 有多个 B
 * A.belongsToMany(B, { through: 'C' }); // A 属于多个 B , 通过联结表 C
 */
import {sequelize} from './sequelize.js'
import dbConnection from './dbConnection.js'

import userModel from '../../models/user/index.js'
import articleModel from '../../models/article/index.js'

// 建立模型之间的联系
const initRelation = () => {
  // 用户和文章：一对多（一个用户可以有多个文章）
  userModel.hasMany(articleModel, {
      onDelete: 'CASCADE'
  })
  articleModel.belongsTo(userModel)
}

// 同步数据库，sequelize.sync()
const initDB = () => {
  return new Promise(async (resolve, reject) => {
      try {
          // 建立数据库连接
          await dbConnection()
          // 初始化model关系
          initRelation()
          // 同步model到数据库
          await sequelize.sync({ force: true });

          resolve()
      } catch (error) {
          console.log(error);
          reject(error)
      }
  })
}

export default initDB