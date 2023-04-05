const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: "./src/Index.js",
    mode: "development",
    // target: "node",
    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"] },
            },
            {
                test: /.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: 'images/',
                    },
                }
                ],
            },
        ],
    },

    resolve: {
        extensions: ["", ".js", ".jsx"],
        alias: {
            "@images": path.resolve(__dirname, "src/assets/images"),
            "@components": path.resolve(__dirname, "src/views/components"),
            "@common": path.resolve(__dirname, "src/views/components/common"),
            "@pages": path.resolve(__dirname, "src/views/pages"),
            "@store": path.resolve(__dirname, "src/core/store"),
            "@services": path.resolve(__dirname, "src/core/services"),
            "@api": path.resolve(__dirname, "src/core/api"),
        },
    },

    output: {
        path: path.resolve(__dirname, "public/js"),

        publicPath: "http://localhost:3000/js/",

        filename: "app.js",
    },

    devServer: {
        static: {
            directory: path.join(__dirname, "public"),
        },
        headers: { "Access-Control-Allow-Origin": "" },
        port: 3005,
        historyApiFallback: true,
    },

    plugins: [new webpack.HotModuleReplacementPlugin()],

    stats: {
        colors: true,
        modules: true,
        reasons: true,
        errorDetails: true,
    },
};
