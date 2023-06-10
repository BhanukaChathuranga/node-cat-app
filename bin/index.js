import argv from 'minimist';

import { fetchData, mergeImage, getUrl } from '../utils/index.js';

try {

  let {
    greeting = 'Hello', who = 'You',
    width = 400, height = 500, color = 'Pink', size = 100,
  } = argv(process.argv.slice(2));


  const firstImgUrl = getUrl(greeting, width, height, color, size);
  const secondImgUrl = getUrl(who, width, height, color, size);

  let firstImg = await fetchData(firstImgUrl, "arraybuffer");
  let secondImg = await fetchData(secondImgUrl, "arraybuffer");

  await mergeImage(firstImg, secondImg);

} catch (error) {
  console.log('Cat app is not working...!');
}

