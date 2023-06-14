import { writeFile } from 'fs/promises';
import { join } from 'path';
import axios from 'axios';
import mergeImg from 'merge-img';

const getUrl = (message = '', width, height, color, size) => {
    let url = `${process.env.HOST_URL}'${message}'?width='${width}'&height='${height}'&color'${color}'&s='${size}'`;
    return url;
}

const fetchData = async (url, responseType = 'json') => {
    try {
        let res = await axios.get(url, { responseType });
        return res.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const convertImgToBuffer = (img, encoding = 'binary') => {
    if (!img) return;

    const bufferImg = Buffer.from(img, encoding);
    return bufferImg;
}

export function Image() {
    let message = '';
    let width = 0;
    let height = 0;
    let color = '';
    let size = 0;
    let image = '';

    return {
        getBinaryImage: async function () {
            let url = await getUrl(message, width, height, color, size);
            if (url === '') return '';

            let data = await fetchData(url, "arraybuffer");
            if (!data) return '';

            image = convertImgToBuffer(data);
            return image;
        },
        setImagePara: function (msg, newWidth, newHeight, color, size) {
            if (msg === '') { throw new Error('Empty message...!'); }
            message = msg;

            if (isNaN(newWidth)) {
                throw new Error(`${newWidth} not a number...!`)
            }
            width = newWidth;

            if (isNaN(newHeight)) {
                throw new Error(`${newHeight} not a number...!`)
            }
            height = newHeight;
        }
    }
}


export const mergeImage = async (img1, img2) => {

    try {

        const bufferImg1 = await img1.getBinaryImage();
        const bufferImg2 = await img2.getBinaryImage();

        let img = await mergeImg([
            { src: bufferImg1, x: 0, y: 0 },
            { src: bufferImg2, x: 400, y: 0 }
        ]);

        await img.getBuffer('image/jpeg', async (err, buffer) => {
            if (err) {
                throw `Image error: ${err}`;
            }

            const fileOut = join(process.cwd(), `/cat-card.jpg`);

            const writeFilePromise = writeFile(fileOut, buffer, 'binary');

            await writeFilePromise.then(() => {
                console.log("The file was saved!");
                return;
            }).catch(err => {
                throw new Error('File writing error...!')
            })
        });

    } catch (error) {
        console.log(error);
        return;
    }
}
