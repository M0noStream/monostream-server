import expressLoader from "./express-loader.js"
import dotenv from 'dotenv'

export default (app) => {
    // Load config
    let configRes = dotenv.config({path: './src/config/.env.config'});
    
    if (configRes.error) {
        throw configRes.error;
    }
    else {
        console.debug('Env parsed', configRes.parsed);
    }

    // Express
    expressLoader(app);
}   