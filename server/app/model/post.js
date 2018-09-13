const Sequelize = require('sequelize');
const { defineModel } = require('../config/db');

// 文章
const Post = defineModel('post', {
  title: { type: Sequelize.STRING }, //  unique: true 失败
  description: Sequelize.TEXT,
  category: Sequelize.STRING,
  filename: {
    type: Sequelize.STRING,
    unique: true,
  },
});

// 添加实例级别方法
Post.add = function add(post) {
  return this.create(post);
};

module.exports = Post;
