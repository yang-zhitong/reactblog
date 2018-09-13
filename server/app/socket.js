const fs = require('fs');
const { join } = require('path');

const { path: { app: appPath } } = require('./config.js');

const postPath = filename => join(appPath, '/upload/post/', `${filename}.md`);

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('mypost', (data) => {
      const { content, filename } = data;
      if (filename) {
        fs.writeFile(postPath(filename), content, (err) => {
          if (err) console.log('err', err);
        });
      }
    });
  });
};
