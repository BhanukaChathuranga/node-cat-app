import argv from 'minimist';

import { mergeImage, Image } from '../utils/index.js';

export async function ImageService() {
    try {
        let {
            greeting = 'Hello', who = 'You',
            width = 400, height = 500, color = 'Pink', size = 100,
        } = argv(process.argv.slice(2));

        let firstImage = Image();
        let secondImage = Image();
        firstImage.setImagePara(greeting, width, height, color, size);
        secondImage.setImagePara(who, width, height, color, size);

        await mergeImage(firstImage, secondImage);

    } catch (error) {
        console.log('Image getting error...!');
        return;
    }
}
