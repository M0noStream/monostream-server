import { readFile, writeFile } from 'fs';
import { stopStream as stopStreamProcess } from '../services/manage-stream-service.js';

export default async (req, res) => {
    const streamId = req.params.id;
    var stream = null;

    var streamsPath = `${global.BASE_FILE_PATH}\\streams.json`;

    readFile(streamsPath, 'utf8', function (err, data) {
        let allStreams = data ? JSON.parse(data) : {};

        stream = allStreams[streamId]

        if (!stream) {
            res.statusCode = 404;
            res.end(`Stream with ID ${streamId} was not found`);
        }
        else {
            if (stream.status === 'stopped') {
                res.statusCode = 200
                res.end(`Stream ${streamId} is already stopped`)
            }
            else {
                try {
                    stopStreamProcess(streamId).then(() => {
                        allStreams[streamId].status = 'stopped';

                        writeFile(streamsPath, JSON.stringify(allStreams), () => {
                            res.statusCode = 200
                            res.end(`Stream ${streamId} was stopped`)
                        })
                    });
                } catch (error) {
                    console.error(error)
                    res.statusCode = 500
                    res.end(`Service ${streamId} was not stopped due to error`)
                }
            }
        }
    })
}