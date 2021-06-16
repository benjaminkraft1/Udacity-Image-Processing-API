# Udacity Full Stack Java Script Developer ND
## Image-Processing-API

## Overview
This Project serves an API which can be use to visualize images and transform them via url parametrization.


## Requirement
### Build the Project
#### Install Dependencies
```
npm install
npm run build
```

### Start the Server
`npm start`

This command will start the server running on `http://localhost:3000`

## Testing and Linting
### Prettier
`npm run prettier`

### Linter
`npm run lint`

### Testing
`npm run test`


## Endpoints and Functionality. 
This project defines two endpoint. 

### 1. Homepage Endpoint
You can reach the index page here:`http://localhost:3000`. Right now there is nothing special implemented.

### 2. API Endpoint
You can reach the main API Route here:`http://localhost:3000/api`. Right now there is nothing special implemented.


### 3. Image Resize Endpoint
`http://localhost:3000/api/images?f=<pictureName>.<fileExtension>&w=<width>&h=<height>`

This Endpoint gives you the possibility to display a image and optianlly resize it if wanted.
You can currently choose between three pictures (e.g. `?f=bigsur.jpg`) to test the behavior.
* `bigsur.jpg`
* `download.jpeg`
* `hw1.jpg`

Resized pictures will be saved in `src/assets/thumb/` for upcoming request to reduce loading times.

#### Examples
* Display original image: `http://localhost:3000/api/images?f=bigsur.jpg`
* Display resized image: `http://localhost:3000/api/images?f=bigsur.jpg&w=400&h=300`


## Middlewwares 
`Morgan` Middleware is used as logger for development purposes and implemented under `utilities/logger`.
