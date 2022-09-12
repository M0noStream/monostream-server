import cors from 'cors';
import bodyParser from 'body-parser';
import routes from '../api/routes/index.js';

export default (app) => {

    app.use(cors());
    app.use(bodyParser.json());

    app.use(process.env.API_PREFIX, routes);

    // Error handler - Not working - complete
    // process.on('uncaughtException', async (error) => {
    //     console.error(`Uncaught exception ${ error.name } occured\n`, error);
    // });

    // app.use((err, res, req, next) => {
    //     console.error('Uncaught exception occured', err.stack);
    //     res.status(500);

    //     return res.json({error: err});
    // })
}