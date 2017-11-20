var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    // Set the "homepage"
    entry: "./src/index.jsx",

    // Output the js bundle to the dist folder
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist",
        publicPath: "/dist"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        extensions: [".js", ".jsx", ".json"]
    },

    module: {
        rules: [
            // All files with a '.jsx' extension will be handled by 'jsx-loader'.
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ["es2015", "react"]
                }
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    plugins: [
        new CopyWebpackPlugin([
            //{ from: 'index.html' }
        ])
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "aframe" : "AFRAME"
    },

    devServer: {
        inline: true,
        open: true,
        progress: true
    }
};