// const glob = require('glob');
const path = require('path');

const mdDir = path.resolve(__dirname, './post');
// const mds = glob.sync(`${mdDir}/*.md`);
const fs = require('fs');

// const { promisify } = require('util');

const content = {};

const post = require('./post.json').map((p, index) => {
  const tag = p.tag.split(',').map(it => it.trim());
  const filename = p.filename.replace('.md', '');
  content[filename] = fs.readFileSync(`${mdDir}/${p.filename}`, 'utf-8');
  return Object.assign(p, { index, tag, filename });
});

module.exports = {
  post,
  content,
};
