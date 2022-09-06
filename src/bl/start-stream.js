import { readFile, writeFile } from 'fs';
import { startStream as startStreamProcess } from '../services/manage-stream-service.js';

export default async (req, res) => {
    var streamsPath = streamsPath || `${global.BASE_FILE_PATH}\\streams.json`;
    const streamId = req.params.id;

    readFile(streamsPath, 'utf8', function (err, data) {
        let allStreams = data ? JSON.parse(data) : {};
        let stream = allStreams[streamId];
        if (!stream) {
            res.statusCode = 404;
            res.end(`Stream with ID ${streamId} was not found`);
        }
        else {
            if (stream.status === 'started') {
                res.statusCode = 200
                res.end(`Service ${streamId} is already been started`)
            }
            else {
                startStreamProcess(streamId).then(() => {
                    allStreams[streamId].status = 'started';
                    writeFile(streamsPath, JSON.stringify(allStreams), () => {
                        res.statusCode = 200
                        res.end(`Service ${streamId} is started`)
                    })
                });
            }
        }
    })
}