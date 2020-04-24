/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const path = require('path');


var config = {
    entry: './main.js',
    output: {
        path: path.resolve(__dirname, './'),
        filename: 'index.js'
    },
    devServer: {
        inline: true,
        port: 3000,
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader:'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    
    mode: 'development'
};

module.exports = config;
