const axios = require('axios');
const fs = require('fs');
const villagers = require('./villagers.json');
// http://acnhapi.com/icons/villagers/1

const download_image = (url, image_path) =>
  axios({
    url,
    responseType: 'stream',
  }).then(
    (response) =>
      new Promise((resolve, reject) => {
        response.data
          .pipe(fs.createWriteStream(image_path))
          .on('finish', () => resolve())
          .on('error', (e) => reject(e));
      })
  );

// async to rate limit
const wait = (amount = 0) =>
  new Promise((resolve) => setTimeout(resolve, amount));

async function start() {
  for (const key in villagers) {
    const villager = villagers[key];
    await download_image(
      `http://acnhapi.com/icons/villagers/${villager.id}`,
      `data/villagers/${villager.name['name-en']}.png`
    );
    // wait one second after each request
    await wait(1000);
  }
}

start();
