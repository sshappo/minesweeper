const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist')
};

const WEBPACK_MODES = {
    development: 'development',
    production: 'production'
};

module.exports = (env, {mode}) => {
    const devtool = mode === WEBPACK_MODES.development
        ? 'source-map'
        : void 0;

    return {
        devtool,
        target: 'web',
        entry: {
            index: './src/index.ts'
        },
        output: {
            path: PATHS.dist,
            filename: '[name].js',
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: [
                        {
                            loader: 'ts-loader'
                        }
                    ],
                    exclude: /node_modules/
                }
            ],
        },
        resolve: {
            extensions: [ '.ts', '.js' ],
        },
        externals: {
            "react": "React",
            "react-dom": "ReactDOM"
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    node_vendors: {
                        test: /node_modules/,
                        name: 'node_vendors',
                        chunks: 'all',
                        enforce: true
                    }
                }
            }
        },
        devServer: {
            contentBase: './',
            compress: true,
            port: 8080,
            open: false,
            writeToDisk: true
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: `${PATHS.src}/index.html`,
                filename: 'index.html',
                inject: true,
                hash: true,
                chunks: ['index'],
                meta: {
                    charset: 'UTF-8',
                    viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
                }
            }),
            new CleanWebpackPlugin()
        ]
    };
};
