import express from 'express';
import logger from '../../utilities/logger';


const images = express.Router();

images.get('/', logger, (req, res) => {
  res.send('Image Processing Route!');
});

export default images;
