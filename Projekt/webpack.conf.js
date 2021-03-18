const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src/js/athena.jsx'), // defines the main class for our application (the entry point)
    output: { // defines where our component is compiled to and how it is accessible in the browser
        filename: '[name].js', // dynamic filename to resolve name conflicts
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: "var", // configure how our component can be accessed in the browser
        library: "Athena"
    },
    mode: 'development', // defines how much the transpiled code is optimised (almost no optimization)
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Athena',
            template: path.resolve(__dirname, 'src/index.html'),
            inject: false,
            xhtml: true
        })
    ],
    module: { // additional transpilation modules
        rules: [
            {
                test: /\.m?jsx$/, // define a regular expression that matches all jsx files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['babel-plugin-transform-class-properties']
                    }
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                includePaths: [path.resolve(__dirname, 'node_modules')]
                            }
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    devServer: { // include the server
        contentBase: path.resolve(__dirname, 'dist'),
        open: false,
        historyApiFallback: true //update the URL that is shown in the browser
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                commons: {
                    test: /node_modules/,
                    name: "athena-vendor",
                    chunks: "initial",
                    minSize: 1
                }
            }
        }
    }

    // run server: "node_modules/.bin/webpack serve --config webpack.conf.js"
};