import path from 'path';
import webpack from 'webpack';
import { dependencies } from './package.json';

const dist = path.join(__dirname, 'dist');

export default {
    context: path.join(__dirname),
    devtool: 'eval',
    mode: 'development',
    target: 'electron-renderer',
    externals: ['fsevents', 'crypto-browserify'],
    module: require('./webpack.config.dev.renderer.babel').default.module,
    
    output: {
        path: dist,
        library: 'renderer',
        filename: '[name].dev.dll.js',
        libraryTarget: 'var'
    },
    
    entry: {
        renderer: Object.keys(dependencies || {})
    },
    
    /**
     * Determine the array of extensions that should be used to resolve modules.
     */
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
        modules: [path.join(__dirname, 'src', 'renderer'), 'node_modules']
    },
    
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development'
        }),
        
        new webpack.NamedModulesPlugin(),
    
        new webpack.DllPlugin({
            path: path.join(dist, '[name].json'),
            name: '[name]'
        }),
        
        new webpack.LoaderOptionsPlugin({
            debug: true,
            options: {
                context: path.join(__dirname, 'src', 'renderer'),
                output: {
                    path: path.join(__dirname, 'dist')
                }
            }
        })
    ],
    
    
    
};