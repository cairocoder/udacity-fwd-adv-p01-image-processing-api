import sharp from 'sharp';

const toJPEG = async (
  image_path: string,
  image_width: number,
  image_height: number,
  new_image_path: string
) => {
  await sharp(image_path)
    .resize(image_width, image_height)
    .toFormat('jpeg')
    .toFile(new_image_path);
};

export default toJPEG;
