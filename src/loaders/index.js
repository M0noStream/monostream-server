import { config } from "../config/index.js";
import expressLoader from "./express-loader.js"

export default (app) => {
    // Load config
    for (var confProp of Object.keys(config)) {
        global[confProp] = config[confProp];
    }

    // Express
    expressLoader(app);
}