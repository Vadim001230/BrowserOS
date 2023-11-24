const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  const isDev = env.mode === 'development';

  const config = {
    mode: env.mode ?? 'development',
    entry: path.resolve(__dirname, 'src', 'index.jsx'),
    externals: {
      'React': 'react'
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.(png|svg|jpg|webp|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                ["@babel/preset-react", {
                  "runtime": "automatic"
                }]
              ]
            }
          }
        }
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    devtool: isDev && 'source-map',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'build'),
      clean: true
    },
    plugins: [new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    })],
  };

  return config;
};
