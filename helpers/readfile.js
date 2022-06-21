const { readFile } = require('fs').promises;

const readTalkers = () => readFile('./talker.json', 'utf-8')
  .then((data) => JSON.parse(data)).catch((_err) => []);

module.exports = {
  readTalkers,
};