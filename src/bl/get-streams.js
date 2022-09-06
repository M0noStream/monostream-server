import { readFile } from 'fs';

export default async (req, res) => {
    var streamsPath = `${ global.BASE_FILE_PATH }\\streams.json`;
    
    readFile(streamsPath, 'utf8', function (err, data) {
        var resList = [];
        var streams = data ? JSON.parse(data) : {};

        for (const [key, value] of Object.entries(streams)) {
            value.id = key;

            resList.push(value);
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(resList));
    })
}