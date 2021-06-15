import resize from '../modules/image_resize';
import path from 'path';
import fs from 'fs';

const images_full_url_path = 'src/assets/full/';
const images_thumb_url_path = 'src/assets/thumb/';

describe('Test image resize', function() {
  it('Test Transformation', async () => {
    const input_image: string = path.resolve(
      path.join(images_full_url_path, 'bigsur.jpg')
    );

    const width: number = 300;
    const height: number = 300;

    const thumb_filename = `bigsur_${width}_${height}.jpg`;

    const output_image_path = path.resolve(
      path.join(images_thumb_url_path, thumb_filename)
    );

    await resize(input_image, output_image_path, width, height);

    expect(fs.existsSync(output_image_path)).toBeTrue();

    // Delete test file
    fs.unlinkSync(output_image_path)
  });
});
