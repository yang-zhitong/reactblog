const fs = require('fs');

const instances = {};

const { sync } = require('../config/db.js');

fs.readdirSync(__dirname)
  .filter(it => !/(Model|index)\.js$/.test(it))
  .forEach((it) => {
    console.log('require model', it);
    const name = it.replace('.js', '');
    instances[name] = require(`./${it}`); // eslint-disable-line
  });

sync();

module.exports.instances = instances;

