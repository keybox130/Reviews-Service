var path = require('path');
var SRC_DIR = path.join(__dirname, 'client', 'src');
var DIST_DIR = path.join(__dirname, 'public', 'dist');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlTemplatePlugin = require('html-webpack-template');

module.exports = () => {
  const isEnvProduction = true; //= env === 'production';
  return {
    devtool: 'source-map',
    mode: 'development',
    entry: {
      main: `${SRC_DIR}/index.jsx`,
    },
    output: {
      path: DIST_DIR,
      filename: '[contenthash].bundle.js',
      sourceMapFilename: '[contenthash].js.map',
    },
    module: {
      rules: [
        {
          test: /\.jsx?/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env', '@babel/preset-react'] },
        },
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new HtmlWebpackPlugin({
          inject: true,
          template: HtmlTemplatePlugin,
          appMountId: 'reviews',
          meta: [
            {
              name: 'description',
              content: 'Keybox Review Service',
            },
            {
              name: 'author',
              content: 'Chris Bell',
            },
          ],
          lang: 'en-US',
          mobile: true,
          links: ['fonts.css'],
          title: 'Keybox Reviews Service',
          minify: isEnvProduction,
        }),
      ],
    },
    plugins: [new CleanWebpackPlugin()],
  };
};
