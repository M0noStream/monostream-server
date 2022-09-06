import { readFile, writeFile } from 'fs';

export default async (req, res) => {
    const streamId = req.params.id;
    console.debug('debug')
    var stream = null;

    var streamsPath = `${ global.BASE_FILE_PATH }\\streams.json`;

    readFile(streamsPath, 'utf8', function (err, data) {
        let allStreams = data ? JSON.parse(data) : {};

        stream = allStreams[streamId]

        if (stream != null) {
            try {
                // cliServiceUtils.stopService(stream);
                allStreams[streamId]['status'] = 'stopped';

                writeFile(streamsPath, JSON.stringify(allStreams), () => { })
                res.statusCode = 200
                res.end(`Service ${streamId} was stopped`)
            } catch (error) {
                console.error(error)
                res.statusCode = 500
                res.end(`Service ${streamId} was not stopped due to error`)
            }
        }
    })

}