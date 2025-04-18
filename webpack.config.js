const path = require('path')
const webpackNodeExternals = require('webpack-node-externals')
const { NODE_ENV = 'production' } = process.env
module.exports = {
  entry: './src/index.ts',
  mode: NODE_ENV,
  target: 'node',
  externals: [webpackNodeExternals()],
  watch: NODE_ENV === 'development',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
      },
    ],
  },
}
