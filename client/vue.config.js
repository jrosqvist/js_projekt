const path = require('path');

module.exports = {
    outputDir: path.resolve(__dirname, "../../backend/public"),
    devServer: {
        // Sätter upp en proxy
        proxyTable: {
            "/users": {
              target: "http://localhost:3000",
              changeOrigin: true
            },
            "/api": {
              target: "http://localhost:3000",
              changeOrigin: true
            }
    }
}
};
