import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import webpack from 'webpack';
import { merge } from 'webpack-merge';

import 'webpack-dev-server';

import commonConfig from './webpack.common.ts';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: '.env.public' });
const publicHost: string = process.env.PUBLIC_HOST || 'localhost';
const publicPort: number = parseInt(process.env.PUBLIC_PORT || '4000', 10);

const devConfig: webpack.Configuration = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, '../dist/client'),
        },
        hot: true,
        port: publicPort,
        host: publicHost,
    },
    output: {
        publicPath: `http://${publicHost}:${publicPort}/`,
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
};

export default merge(commonConfig, devConfig);
