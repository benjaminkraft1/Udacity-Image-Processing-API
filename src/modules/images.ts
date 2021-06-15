import express from 'express';
import logger from '../utilities/logger';
import path from 'path';

import sharp from 'sharp';
import fs from 'fs';

const images_full_path = 'assets/full/'
const images_thumb_path = 'assets/thumb/'
const images = express.Router();

images.get('/', logger, async (req, res, next) => {
  // Query from url
  const { h, w, f} = req.query;
  const width: number | null = w ? parseInt(w as string, 10) : null;
  const height: number | null = h ? parseInt(h as string, 10) : null;
  const file: string = f as string;

  console.log("Filename: ", f);
  console.log("Height: ", h);
  console.log("Width: ", w);

  let output_image_path: string = '';
  let resized: boolean = false;
  let noImage: boolean = false;

  if (file == undefined) {
    console.log("No Image given to resize")
    noImage = true;

  } else {

    // parameter given check
    if (width === null && height === null ) {
      
      // Show original file if no resize information was given
      output_image_path = path.join(
        images_full_path,
        file
      ); 

      console.log("Showing original image: ", output_image_path)

      resized = false;

    } else {
      
      try {
        
        const [filename, ext] = file.split('.');

        const thumb_filename = `${filename}_${width}_${height}.${ext}`;

        const images_full_filepath: string = path.join(
          images_full_path,
          file
        );
          
        const thumb_filepath: string = path.join(
          images_thumb_path,
          thumb_filename
        );
        output_image_path = thumb_filepath;

        const format = "jpeg"
        await resize(images_full_filepath, thumb_filepath, format, width, height);

        
        resized = true;
        
      } catch (e) {
        // error processing image goes here
        console.log('Image processing failed!');
      }   
     
    } // End parameter given check
  } // End check if fileparameter given  
  
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve('wait before rendering');
    }, 1000);
  });

  // Render view
  res.render('images', {
    output_image_path,
    noImage,
    resized,
    width,
    height
  });

});


function resize(
  inputPath: string,
  outputPath: string,
  format: string,
  width: number | null,
  height: number | null
): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Resizing original image: ", inputPath, " - saving as: ", outputPath)

      const readStream: fs.ReadStream = fs.createReadStream(inputPath);
      const writeStream: fs.WriteStream = fs.createWriteStream(outputPath);

      writeStream.on('error', () => console.log('Error'));
      writeStream.on('close', () => console.log('Successfully saved'));

      let transform: sharp.Sharp = sharp();
      if (format === 'jpeg' || format === 'png') {
        transform = transform.toFormat('jpeg');
      }

      transform = transform
        .resize(width, height)
        .on('info', (fileInfo) => console.log('Successfully resized'));

      readStream.pipe(transform).pipe(writeStream);
      resolve('slow');
    }, 1000);
  });
}

export default images;