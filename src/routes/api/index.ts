import express from 'express';
import images from './images';
import logger from '../../utilities/logger';

const routes = express.Router();

routes.get('/', logger, (req, res) => {
  res.send('Main api route!');
});


routes.use('/images', images);

export default routes;
