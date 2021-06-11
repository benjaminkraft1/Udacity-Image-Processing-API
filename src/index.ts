import express from 'express';
import { promises as fsPromises } from 'fs';
import routes from './routes/api/index';

// Get express
const app = express();

// Setup port to 3000
const port = 3000;

// Use router defined in another file
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Image Processing API Server started at localhost:${port}`);
});
