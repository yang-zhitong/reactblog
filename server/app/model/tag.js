const Sequelize = require('sequelize');
const { defineModel } = require('../config/db');


// 标签
const Tag = defineModel('tag', {
  name: Sequelize.STRING,
});

Tag.add = async function add(tag) {
  const res = await this.findOrCreate({ where: { name: tag } });
  return res;
};

module.exports = Tag;
