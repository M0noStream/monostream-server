import express from 'express';
import { readFile, writeFile } from 'fs';
import { startService, stopService, createService, deleteService } from './cliServiceUtils.js';
import cors from 'cors';
import path from 'path';
import {fileURLToPath} from 'url';
import bodyParser from 'body-parser';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('__dirname', __dirname);

var app = express();
app.use(cors());
app.use(bodyParser.json());



const HOST = '127.0.0.1';
const PORT = 3100;
const STREAMS_URL = '/streams'

// Get all streams
app.get(STREAMS_URL, (req, res) => {
  readFile( __dirname + "/" + "streams.json", 'utf8', function (err, data) {
    var resList = [];
    var streams = data ? JSON.parse(data) : {};

    for (const [key, value] of Object.entries(streams)) {
      value.id = key;

      resList.push(value);
    }
    
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(resList));
  })
})

// Add new stream
app.post(STREAMS_URL, (req, res) => {
  readFile( __dirname + "/" + "streams.json", 'utf8', function (err, data) {    
    data = data ? JSON.parse( data ) : {};
    var newStreamId = createUUID();
    var newStream = req.body;
    newStream['status']   = 'stopped'
    data[newStreamId] = newStream;
    
    createService(newStreamId, newStream);
    
    writeFile( __dirname + "/" + "streams.json", JSON.stringify(data), () => {
      console.log('Added new stream `%s`', newStreamId);
      res.end(JSON.stringify(newStream));
    });
  });
})

// Start stream
app.put(`${STREAMS_URL}/start/:id`, (req, res) => {
  const streamId = req.params.id;

  readFile(__dirname + "/" + "streams.json", 'utf8', function (err, data) {
    allStreams = data ? JSON.parse(data) : {};
    var stream;
    if (stream = allStreams[streamId]) {
      // cliServiceUtils.startService(streamId);
      allStreams[streamId]['status'] = 'started';

      writeFile( __dirname + "/" + "streams.json", JSON.stringify(allStreams), () => {res.sendStatus(200);})
    }
  })
})

// Stop stream
app.put(`${STREAMS_URL}/stop/:id`, (req, res) => {
  const streamId = req.params.id;
  console.debug('debug')
  var stream = null;

  readFile(__dirname + "/" + "streams.json", 'utf8', function (err, data) {
    allStreams = data ? JSON.parse(data) : {};
    
    console.debug(allStreams, streamId)
    stream = allStreams[streamId]
    console.log('stream', stream)

    if (stream != null) {
      console.debug(stream)
      
      try {
        // cliServiceUtils.stopService(stream);
        allStreams[streamId]['status'] = 'stopped';
    
        writeFile( __dirname + "/" + "streams.json", JSON.stringify(allStreams), () => {})
        res.statusCode = 200
        res.end(`Service ${ streamId } was stopped`)
      } catch (error) {
        console.error(error)
        res.statusCode = 500
        res.end(`Service ${ streamId } was not stopped due to error`)
      }
    }
  })

})

// Delete stream
app.delete(`${STREAMS_URL}/:id`, (req, res) => {
  var idToDelete = req.params.id;
  readFile( __dirname + "/" + "streams.json", 'utf8', function (err, data) {
    streams = data ? JSON.parse( data ) : {};

    if (stream = streams[idToDelete]) {
      deleteService(idToDelete, stream);
      delete streams[idToDelete];

      writeFile( __dirname + "/" + "streams.json", JSON.stringify(streams), () => {res.sendStatus(200);})
    }
    else {
      res.statusCode = 404;
      res.end(`Stream with ID '${idToDelete}' was not found`);
    }
  })
})

function createUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
     var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
     return v.toString(16);
  });
}

var server = app.listen(PORT, HOST, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.dir(server.address());
  console.log("Example app listening at http://%s:%s", host, port)
})
