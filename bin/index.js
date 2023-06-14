import 'dotenv/config';

import { ImageService } from '../service/ImageService.js';

try {

  ImageService();

} catch (error) {
  console.log('Cat app is not working...!');
}

