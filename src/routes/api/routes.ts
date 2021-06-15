import express from 'express';
import images from './images';
import path from 'path';
import logger from '../../utilities/logger';

const routes = express.Router();

routes.get('/', logger, (req, res) => {
  res.send('Main api route!');
});

// api/images
routes.use('/images', images);

// api/assets
routes.use('/assets', express.static(path.join(__dirname, '../../assets')));

export default routes;
