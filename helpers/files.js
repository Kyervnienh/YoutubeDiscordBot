const fs = require('fs');

const getFiles = (path) => {
  const files = fs.readdirSync(path).filter((file) => file.endsWith('.js'));
  return files;
};

module.exports = {
  getFiles,
};
