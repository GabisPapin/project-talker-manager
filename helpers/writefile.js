const { writeFile } = require('fs').promises;

const writeTalkers = async (data) => {
  const result = await writeFile('./talker.json', JSON.stringify(data));
  return result;
};

module.exports = {
  writeTalkers,
};