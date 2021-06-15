import express from 'express';
import routes from './routes/api/routes';
import logger from './utilities/logger';
import path from 'path';

// Get express
export const app = express();

// Setup port to 3000
const port = 3000;

// Start server
app.listen(port, () => {
  console.log(`Image Processing API Server started at localhost:${port}`);
});

app.get('/', logger, (req, res) => {
  res.send('Index Page');
});

// Use router defined in another file
app.use('/api', routes);

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger);
