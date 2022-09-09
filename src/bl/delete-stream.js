import { readFile, writeFile } from 'fs';
import { deleteStream as deleteStreamProcess } from '../services/manage-stream-service.js';

export default async (req, res) => {
    var idToDelete = req.params.id;
    var streamsPath = `${process.env.BASE_FILE_PATH}\\streams.json`;

    readFile(streamsPath, 'utf8', function (err, data) {
        let streams = data ? JSON.parse(data) : {};
        let stream = streams[idToDelete];
        
        if (stream) {
            deleteStreamProcess(idToDelete).then(() => {
                delete streams[idToDelete];

                writeFile(streamsPath, JSON.stringify(streams), () => { res.sendStatus(200); })
            });
        }
        else {
            res.statusCode = 404;
            res.end(`Stream with ID '${idToDelete}' was not found`);
        }
    })
}