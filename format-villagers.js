const fs = require('fs');
const villagerData = require('./villagers.json');

const villagers = Object.entries(villagerData).map(([key, data]) => {
  return {
    ...data,
    localizedNames: data.name,
    name: data.name['name-en'],
  };
});

fs.writeFileSync(
  './formatted-villagers.json',
  JSON.stringify(villagers),
  'utf-8'
);

// console.log(villagers);
