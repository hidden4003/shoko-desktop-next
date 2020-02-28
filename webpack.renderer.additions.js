const merge = require('webpack-merge');
//const util = require('util')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const shokoConfig = {
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/react"],
            plugins: ["@babel/plugin-proposal-class-properties"]
          }
        }
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader']
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader'
      },
      {
        test:  /\.s([ac])ss$/,
        use: [
          /*{ loader: MiniCssExtractPlugin.loader },*/
          {
            loader: 'postcss-loader',
          }],
      },
      // Common Image Formats
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
        use: 'url-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    /*new MiniCssExtractPlugin({
      filename: "dist.bundle.css"
    })*/
  ],
  devtool: 'inline-source-map',
  target: 'web'
};



module.exports = function(config) {
  //console.log(util.inspect(config, { depth: null }));
  return merge.strategy(
    {
      entry: 'prepend',
      'module.rules': 'prepend'
    }
  )(config, shokoConfig);
};
