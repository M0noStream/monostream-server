import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import loader from './loaders/index.js'
import dotenv from 'dotenv';
let configRes = dotenv.config({path: './src/config/.env.config'});
    
if (configRes.error) {
    throw configRes.error;
}
else {
    console.debug('Env parsed', configRes.parsed);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
process.env.BASE_FILE_PATH = __dirname;
var app = express();

loader(app);

var server = app.listen(process.env.PORT, process.env.HOST, function () {
  console.dir(server.address());
  console.log(`Server is running on ${process.env.HOST}:${process.env.PORT}`)
})
