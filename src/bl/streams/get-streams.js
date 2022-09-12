import { readFile } from 'fs';

export default async (req, res) => {
    var streamsPath = `${ process.env.BASE_FILE_PATH }\\streams.json`;
    var streamId = req.params.id
    var statusCode = 200
    readFile(streamsPath, 'utf8', function (err, data) {
        var streams = data ? JSON.parse(data) : {};
        var resValue = null;
        if (streamId) {
            if (streams[streamId]) {
                resValue = streams[streamId];
            }
            else {
                statusCode = 404;
                resValue = `Stream ${streamId} was not found`
            }
        }
        else {
            resValue = [];
    
            for (const [key, value] of Object.entries(streams)) {
                value.id = key;
    
                resValue.push(value);
            }
        }

        res.statusCode = statusCode;
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(resValue));
    })
}