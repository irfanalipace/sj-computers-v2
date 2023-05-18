const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
    entry: "./src/Index.js",
    mode: "production",
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
                test: /\.(png|jpe?g|gif|webp|svg)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "images/",
                        },
                    },
                ],
            },
        ],
    },

    resolve: {
        extensions: ["", ".js", ".jsx"],
        alias: {
            "@src": path.resolve(__dirname, "src"),
            "@images": path.resolve(__dirname, "src/assets/images"),
            "@components": path.resolve(__dirname, "src/views/components"),
            "@common": path.resolve(__dirname, "src/views/components/common"),
            "@pages": path.resolve(__dirname, "src/views/pages"),
            "@store": path.resolve(__dirname, "src/core/store"),
            "@services": path.resolve(__dirname, "src/core/services"),
            "@plugins": path.resolve(__dirname, "src/core/plugins"),
            "@api": path.resolve(__dirname, "src/core/api"),
            "@hooks": path.resolve(__dirname, "src/core/hooks"),
            "@utils": path.resolve(__dirname, "src/core/utils"),
        },
    },

    output: {
        path: path.resolve(__dirname, "public/js"),
        publicPath: "/js/",
        filename: "app.js",
    },

    devServer: {
        static: {
            directory: path.join(__dirname, "public"),
        },
        headers: { "Access-Control-Allow-Origin": "" },
        port: 3000,
        historyApiFallback: true,
    },
    plugins: [new Dotenv()],
};
