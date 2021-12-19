const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'src/[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader','css-loader','sass-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      hash: true,
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
      inject: 'body'
    })
  ],
  devServer: {
    host: '127.0.0.1',
    port: 9090,
    hot: true,
    open: true,
    inline: true
  }
};
