import { readFile, writeFile } from 'fs';

export default async (req, res) => {
    var idToDelete = req.params.id;
    var streamsPath = `${ global.BASE_FILE_PATH }\\streams.json`;

    readFile(streamsPath, 'utf8', function (err, data) {
        streams = data ? JSON.parse(data) : {};

        if (stream = streams[idToDelete]) {
            deleteStream(idToDelete, stream);
            delete streams[idToDelete];

            writeFile(streamsPath, JSON.stringify(streams), () => { res.sendStatus(200); })
        }
        else {
            res.statusCode = 404;
            res.end(`Stream with ID '${idToDelete}' was not found`);
        }
    })
}