import sharp from 'sharp';
import fs from 'fs';

function resize(
  inputPath: string,
  outputPath: string,
  width: number | null,
  height: number | null
): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(
        'Resizing original image: ',
        inputPath,
        ' - saving as: ',
        outputPath
      );

      // File Streams
      const readStream: fs.ReadStream = fs.createReadStream(inputPath);
      const writeStream: fs.WriteStream = fs.createWriteStream(outputPath);

      writeStream.on('error', () => console.log('Error'));
      writeStream.on('close', () => console.log('Successfully saved'));

      // Initialize Sharp to transform
      let transform: sharp.Sharp = sharp();

      // Transform to jpeg
      transform = transform.toFormat('jpeg');

      // Resize
      transform = transform
        .resize(width, height)
        .on('info', fileInfo => console.log('Resize successful!: ', fileInfo));

      readStream.pipe(transform).pipe(writeStream);
      resolve('slow');
    }, 1000);
  });
}

export default resize;
