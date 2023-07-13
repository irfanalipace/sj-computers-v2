const path = require("path");
const Dotenv = require("dotenv-webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const CompressionPlugin = require("compression-webpack-plugin");
// const BundleAnalyzerPlugin =
//     require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
// const CopyWebpackPlugin = require("copy-webpack-plugin");

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
        filename: "[name].js",
        chunkFilename: "[name].chunk.js", // Specify a different chunk filename
    },

    plugins: [
        new CleanWebpackPlugin(), // Clean output directory before each build
        new Dotenv(),
        // new BundleAnalyzerPlugin(),
        // new CompressionPlugin({
        //     // filename: "main.[ext]",
        //     algorithm: "gzip",
        //     test: /\.(js|css)$/,
        //     threshold: 10240,
        //     minRatio: 0.8,
        // }),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         {
        //             from: "./public/js/main.js.gz",
        //             to: "./public/js/main_c.js",
        //         },
        //     ],
        // }),
    ],
};
