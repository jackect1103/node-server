/**
 * 
 * 创建Sequelize对象
 * const sequelize = new Sequelize('database', 'username', 'password', { // 数据库名，用户名，密码
 *      host: 'localhost', // 输入域名
 *      port: 'port', // 输入端口
 *      dialect: one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' , // 选择数据库类型
 *      logging: false // 是否开启日志
 * });
 * @returns
 */
import {Sequelize,DataTypes} from 'sequelize'
var sequelize = new Sequelize('数据库名称','账号','密码',{
  host:'数据库对应的服务位置',
  dialect:'mysql',  // 选择数据库类型
  operatorsAliases:false,
  logging: false, // 是否开启日志
  dialectOptions:{
    //字符集
    charset:'utf8mb4',
    supportBigNumbers: true,
    bigNumberStrings: true
  },
  pool:{
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  timezone: '+08:00'  //东八时区
});

export {
  sequelize,
  DataTypes
}