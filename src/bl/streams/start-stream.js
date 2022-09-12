import { readFile, writeFile } from 'fs';
import { startStream as startStreamProcess } from '../../services/manage-stream-service.js';

const started_status = 'Active'

export default async (req, res) => {
    var streamsPath = streamsPath || `${process.env.BASE_FILE_PATH}\\streams.json`;
    const streamId = req.params.id;

    readFile(streamsPath, 'utf8', function (err, data) {
        let allStreams = data ? JSON.parse(data) : {};
        let stream = allStreams[streamId];
        if (!stream) {
            res.statusCode = 404;
            res.end(`Stream with ID ${streamId} was not found`);
        }
        else {
            if (stream.status === started_status) {
                res.statusCode = 200
                res.end(`Service ${streamId} is already been started`)
            }
            else {
                startStreamProcess(streamId).then((sshRes) => {
                    console.log(sshRes)
                    
                    allStreams[streamId].status = started_status;
                    writeFile(streamsPath, JSON.stringify(allStreams), () => {
                        res.statusCode = 200
                        res.end(`Service ${streamId} is started`)
                    })
                });
            }
        }
    })
}