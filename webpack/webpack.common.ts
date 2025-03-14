import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import webpack from 'webpack';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const commonConfig: webpack.Configuration = {
    context: path.resolve(__dirname, '../'),
    entry: './src/entry.client.tsx',
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, '../dist'),
        chunkFilename: '[name].[contenthash].bundle.js',
        assetModuleFilename: 'assets/[name].[hash][ext][query]',
        clean: true,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            '@': path.resolve(__dirname, '../src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.module\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName:
                                    '[name]__[local]-[hash:base64:5]',
                            },
                        },
                    },
                    'postcss-loader',
                ],
            },
            {
                test: /\.css$/,
                exclude: /\.module\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.(png|jpg|gif|svg|webp)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/[path][name].[hash:base64:5].[ext]',
                            context: 'src',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new WebpackManifestPlugin({
            writeToFileEmit: true,
            fileName: path.resolve(__dirname, '../dist/client/assets.json'),
            generate: (seed, files) => {
                const manifest = files.reduce((manifest, { name, path }) => {
                    const cleanPath = path.replace(/^auto\//, '');
                    manifest[name] = cleanPath;
                    return manifest;
                }, seed);

                return manifest;
            },
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: 'css/[id].css',
            ignoreOrder: false,
        }),
    ],
};

export default commonConfig;
