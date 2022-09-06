import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import loader from './loaders/index.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
global.BASE_FILE_PATH = __dirname;

var app = express();

loader(app);

var server = app.listen(global.PORT, global.HOST, function () {
  console.dir(server.address());
  console.log(`Server is running on ${HOST}:${PORT}`)
})
