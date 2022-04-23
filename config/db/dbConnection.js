/**
 *  测试连接
 */
 import {sequelize} from './sequelize.js'
const dbConnection = async () => {
    return new Promise(async(resolve, reject) => {
      try {
        await sequelize.authenticate(); // 测试连接是否正常
        console.info('********************连接数据库成功************************.');
        resolve()
      } catch (error) {
        console.error( `********************连接数据库失败${error}********************`);
        reject(error)
      }
    })
}
export default dbConnection