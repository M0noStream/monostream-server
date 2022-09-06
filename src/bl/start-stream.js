import { readFile, writeFile } from 'fs';

export default async (req, res) => {
    var streamsPath = streamsPath || `${ global.BASE_FILE_PATH }\\streams.json`;
    const streamId = req.params.id;

    readFile(streamsPath, 'utf8', function (err, data) {
        let allStreams = data ? JSON.parse(data) : {};
        let stream;
        if (stream = allStreams[streamId]) {
        // cliServiceUtils.startService(streamId);
        allStreams[streamId]['status'] = 'started';

        writeFile(streamsPath, JSON.stringify(allStreams), () => {res.sendStatus(200);})
        }
    })
}