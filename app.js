const bodyParser = require('body-parser');
var express = require('express');
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());var fs = require('fs');

const HOST = '127.0.0.1';
const PORT = 3100;
const STREAMS_URL = '/streams'

// Get all streams
app.get(STREAMS_URL, (req, res) => {
  fs.readFile( __dirname + "/" + "streams.json", 'utf8', function (err, data) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json')
    res.end(data);
  })
})

// Add new stream
app.post(STREAMS_URL, (req, res) => {
  console.log('Post request', req.body);
  fs.readFile( __dirname + "/" + "streams.json", 'utf8', function (err, data) {    
    data = data ? JSON.parse( data ) : {};
    var newStreamId = createUUID();
    var newStream = req.body;
    data[newStreamId] = newStream;
    
    fs.writeFile( __dirname + "/" + "streams.json", JSON.stringify(data), () => {

    });
    

    console.log('Added new stream `%s`', newStreamId);
    res.end(JSON.stringify(newStream));
  });

})

// Start stream
app.put(`${STREAMS_URL}/start/:id`, (req, res) => {
  console.log(`ID to start: ${req.params.id}`);

  res.sendStatus(200);
})

// Stop stream
app.put(`${STREAMS_URL}/stop/:id`, (req, res) => {
  console.log(`ID to stop: ${req.params.id}`);

  res.sendStatus(200);
})

// Delete stream
app.delete(`${STREAMS_URL}/:id`, (req, res) => {
  var idToDelete = req.params.id;
  fs.readFile( __dirname + "/" + "streams.json", 'utf8', function (err, data) {
    streams = data ? JSON.parse( data ) : {};

    if (idToDelete && streams[idToDelete]) {
      delete streams[idToDelete];

      fs.writeFile( __dirname + "/" + "streams.json", JSON.stringify(streams), () => {})
    }

    res.sendStatus(200);
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
