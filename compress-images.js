const fs = require('fs');
const tinify = require('tinify');

tinify.key = 'Y631jxxKBXGV3RMgyGg2XvsLKTx1B3Yw';

const files = fs.readdirSync('./public/villagers');

files.forEach((file) => {
  const path = `./public/villagers/${file}`;
  const source = tinify.fromFile(path);
  source.toFile(path);
});
