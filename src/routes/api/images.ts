import express from 'express';
import path from 'path';
import fs from 'fs';

import resize from '../../modules/image_resize';
import logger from '../../utilities/logger';

// Endpoint Access to Images
const endpoint_full = 'assets/full/';
const endpoint_thumb = 'assets/thumb/';

// Resources (Image Directories)
const full_image_path = path.resolve(__dirname, '../../assets/full/');
const thumb_path = path.resolve(__dirname, '../../assets/thumb/');

const images = express.Router();

images.get('/', logger, async (req, res, next) => {
  // Query from url
  const { h, w, f } = req.query;
  const width: number | null = w ? parseInt(w as string, 10) : null;
  const height: number | null = h ? parseInt(h as string, 10) : null;
  const file: string = f as string;

  console.log('Filename: ', f);
  console.log('Height: ', h);
  console.log('Width: ', w);

  let image_path: string = '';
  let resized: boolean = false;
  let noImage: boolean = false;

  if (file == undefined) {
    console.log('No Image given to resize');
    noImage = true;
  } else {
    // parameter given check
    if (width === null && height === null) {
      // Show original file if no resize information was given
      image_path = path.join(endpoint_full, file);

      console.log('Showing original image: ', image_path);

      resized = false;
    } else {
      try {
        const [filename, ext] = file.split('.');

        // Local path to input image
        const input_image_path: string = path.join(full_image_path, file);

        // Local path to transformed image
        const thumb_filename = `${filename}_${width}_${height}.${ext}`;
        const output_image_path: string = path.join(thumb_path, thumb_filename);

        if (!fs.existsSync(output_image_path)) {
          // Only resize if not already existing
          await resize(input_image_path, output_image_path, width, height);
        } else {
          console.log('Image already resized, taking it from thumb folder');
        }

        resized = true;
        // Image access online via endpoint
        image_path = path.join(endpoint_thumb, thumb_filename);
      } catch (e) {
        // error processing image goes here
        console.log('Image processing failed!');
      }
    } // End parameter given check
  } // End check if fileparameter given

  await new Promise(resolve => {
    setTimeout(() => {
      resolve('wait before rendering');
    }, 1000);
  });

  // Render view
  res.render('images', {
    image_path,
    noImage,
    resized,
    width,
    height
  });
});

export default images;
