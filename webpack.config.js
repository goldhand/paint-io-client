const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PROJECT_ROOT = process.cwd();
const createResolveProjectPath = (...addPath) =>
  (...relPath) => path.resolve(PROJECT_ROOT, ...addPath, ...relPath);

const resolveProject = createResolveProjectPath();
const resolveBuild = createResolveProjectPath('dist');

module.exports = {
  entry: [
    'babel-polyfill',
    resolveProject('src/app.js'),
  ],
  output: {
    filename: 'PaintApp.js',
    path: resolveBuild(),
    publicPath: '/',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [resolveProject('src')],
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        include: [resolveProject('src')],
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ],
};
