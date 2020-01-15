
const path = require('path');

module.exports = {
    outputDir: path.resolve(__dirname, "../backend/public"),
    devServer: {
        // Sätter upp en proxy
        proxy: {
            "/api": {
              target: "http://localhost:3000",

            }
    }
}
};
