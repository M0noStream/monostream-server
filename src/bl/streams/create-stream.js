import { readFile, writeFile } from 'fs';
import { createStream as createStreamProcess } from '../../services/manage-stream-service.js';

function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
       var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
       return v.toString(16);
    });
  }

export default async (req, res) => {
    var streamsPath = `${ process.env.BASE_FILE_PATH }\\streams.json`
    readFile(streamsPath, 'utf8', function (err, data) {
        data = data ? JSON.parse(data) : {};
        var newStreamId = createUUID();
        var newStream = req.body;
        newStream['status'] = 'stopped';
        newStream.id = newStreamId;
        data[newStreamId] = newStream;

        createStreamProcess(newStream).then((createRes) => {
            console.log(createRes)
            writeFile(streamsPath, JSON.stringify(data), () => {
                res.end(JSON.stringify(newStream));
            });
        });
    });
}