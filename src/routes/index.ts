import express from 'express';
import images from './api/images';

const routes = express.Router();

routes.get('/', (req: express.Request, res: express.Response) => {
  res.send(
    'Welcome to the Image Processing API. <br>Created by <a href="https://github.com/CairoCoder">Said Abdul Aziem.</a>'
  );
});

routes.use('/images', images);

export default routes;
