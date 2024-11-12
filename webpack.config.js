const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',             // Entry file for TypeScript
  output: {
    filename: 'bundle.js',             // Output single JS file
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
};