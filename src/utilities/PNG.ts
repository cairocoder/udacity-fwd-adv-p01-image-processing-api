import sharp from 'sharp';

const toPNG = async (
  image_path: string,
  image_width: number,
  image_height: number,
  new_image_path: string
): Promise<string | void> => {
  await sharp(image_path)
    .resize(image_width, image_height)
    .toFormat('png')
    .toFile(new_image_path);
};

export default toPNG;
