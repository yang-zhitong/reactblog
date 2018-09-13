const { db: mysql } = require('../config');

const Sequelize = require('sequelize');

const { Op } = Sequelize;

console.log('init sequelize...');

const sequelize = new Sequelize(mysql.database, mysql.user, mysql.password, {
  host: mysql.host,
  port: mysql.port,
  dialect: 'mysql',
  operatorsAliases: false,
  timezone: '+08:00',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    charset: 'utf8',
  },
});


function defineModel(name, attributes) {
  const attrs = {};

  attrs.id = {
    type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, unique: true,
  };

  Object.keys(attributes).forEach((key) => {
    const value = attributes[key];
    if (typeof value === 'object' && value.type) {
      value.allowNull = value.allowNull || false;
      attrs[key] = value;
    } else {
      attrs[key] = {
        type: value,
        allowNull: false,
      };
    }
  });

  // 使用query原生查询不会调用get方法。。使用find自动更改时区，不需要自己处理
  // attrs.createdAt = {
  //   type: Sequelize.DATE,
  //   get() {
  //     return new Date(this.getDataValue('createdAt'));
  //   },
  // };

  // attrs.updatedAt = {
  //   type: Sequelize.DATE,
  //   set(val) {
  //     return new Date(val).toLocaleString();
  //   },
  // };

  return sequelize.define(name, attrs, {
    tableName: name,
    timestamps: true,
  });
}


module.exports = {
  Op,
  defineModel,
  sequelize,
  sync: async () => {
    await sequelize.sync();
  },
};
