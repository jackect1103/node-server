import { sequelize, DataTypes } from '../../config/db/sequelize.js'

const articleModel = sequelize.define('article', {
  title: { // 文章标题
      type: DataTypes.STRING,
      allowNull: false,
      field:'title'
  },
  description: { // 文章简介
      type: DataTypes.TEXT,
      allowNull: true,
      field:'description'
  },
  content: { // 文章内容
      type: DataTypes.TEXT,
      allowNull: true,
      field:'content'
  },
}, {
  // Other model options go here
});

export default articleModel