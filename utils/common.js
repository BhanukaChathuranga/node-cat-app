import { writeFile } from 'fs';
import { join } from 'path';
import axios from 'axios';
import mergeImg from 'merge-img';

import { HOST_URL } from './variables.js';


export const getUrl = (message = '', width, height, color, size) => {
    let url = `${HOST_URL}'${message}'?width='${width}'&height='${height}'&color'${color}'&s='${size}'`;
    return url;
}

export const fetchData = async (url, responseType = 'json') => {
    try {
        let res = await axios.get(url, { responseType });
        return res.data;
    } catch (error) {
        console.log(error);
        return;
    }
}

const convertImgToBuffer = (img, encoding = 'binary') => {
    if (!img) return;

    const bufferImg = Buffer.from(img, encoding);
    return bufferImg;
}


export const mergeImage = async (img1, img2) => {

    try {

        const bufferImg1 = convertImgToBuffer(img1);
        const bufferImg2 = convertImgToBuffer(img2);

        let img = await mergeImg([
            { src: bufferImg1, x: 0, y: 0 },
            { src: bufferImg2, x: 400, y: 0 }
        ]);

        await img.getBuffer('image/jpeg', (err, buffer) => {
            if (err) {
                throw `Image error: ${err}`;
            }

            const fileOut = join(process.cwd(), `/cat-card.jpg`);

            writeFile(fileOut, buffer, 'binary', (err) => {
                if (err) {
                    throw `File error: ${err}`;
                }

                console.log("The file was saved!");
            });
        });

    } catch (error) {
        console.log(error);
        return;
    }
}
