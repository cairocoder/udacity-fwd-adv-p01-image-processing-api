import express from 'express';
import fs from 'fs';
import path from 'path';
import toJPEG from './JPEG';
import toPNG from './PNG';

const resize = async (
  req: express.Request,
  res: express.Response
): Promise<Response | void> => {
  // Check endpoint URL.
  if (
    req.query.filename === undefined ||
    req.query.width === undefined ||
    req.query.height === undefined
  ) {
    res.send(`Oops: Please double check your endpoint URL.`);
    return;
  }

  // get URL parameters
  try {
    if (!req.query.filename) {
      res.status(404).send('please provide a valid image name');
      return;
    }
    if (!req.query.height || !((req.query.height as unknown as number) > 0)) {
      res.status(404).send('please provide a valid image height');
      return;
    }
    if (!req.query.width || !((req.query.width as unknown as number) > 0)) {
      res.status(404).send('please provide a valid image width');
      return;
    }
  } catch (e) {
    res.send(`Image width and height should both specified and greater than 0`);
    return;
  }

  const image_name = req.query.filename as string;
  const image_width = parseInt(req.query.width as string);
  const image_height = parseInt(req.query.height as string);

  let fileFormat = req.query.format as string;
  let fileExtension = '.' + fileFormat;

  // set JPEG as default image format.
  if (fileFormat === undefined) {
    fileFormat = 'jpeg';
    fileExtension = '.jpg';
  }

  const image_path: string = path.join(
    __dirname + '../../../images/full/' + image_name + fileExtension
  );

  if (isNaN(image_width) || isNaN(image_height)) {
    res.send(`Error: Please enter valid number for width and height`);
    return;
  }

  // Specify thumb directory path
  const new_image_name: string =
    image_name + image_width + image_height + fileExtension;
  const new_image_directory: string = path.join(
    __dirname + '../../../images/thumb/'
  );

  const new_image_path: string = new_image_directory + new_image_name;

  try {
    // Check if the requested image exist
    try {
      fs.accessSync(image_path, fs.constants.F_OK);
    } catch (err) {
      res.send(`Requested image not exist.`);
      return;
    }

    // Check if the resized version of requested image exist
    try {
      fs.accessSync(new_image_path, fs.constants.F_OK);
      // Return the full path of the resized version
      res.sendFile(new_image_path);
      return;
    } catch (err) {}

    // Create the 'thumb' folder if it's not exist
    try {
      fs.accessSync(new_image_directory, fs.constants.F_OK);
    } catch (err) {
      try {
        fs.mkdirSync(new_image_directory);
      } catch (err) {
        res.send(`Failed to creeate 'thumb' folder'`);
        return;
      }
    }

    // Start resizing requested image
    if (fileFormat === 'jpeg') {
      await toJPEG(image_path, image_width, image_height, new_image_path);
    } else if (fileFormat === 'png') {
      await toPNG(image_path, image_width, image_height, new_image_path);
    }

    // Return the full path of the resized image
    res.sendFile(new_image_path);
    return;
  } catch (err) {}
};

export default resize;
