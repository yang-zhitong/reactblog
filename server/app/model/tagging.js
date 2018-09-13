const Sequelize = require('sequelize');
const { defineModel } = require('../config/db');

// 文章与标签多对多关系
const Tagging = defineModel('tagging', {
  p_id: Sequelize.INTEGER,
  t_id: Sequelize.INTEGER,
});

Tagging.add = async function add(rows) {
  const res = await this.findOne({ where: rows });
  if (res && res.id) {
    return 0;
  }
  return this.bulkCreate(rows);
};

module.exports = Tagging;
