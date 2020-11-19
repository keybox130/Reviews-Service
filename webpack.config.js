var path = require('path');
var SRC_DIR = path.join(__dirname, 'client', 'src');
var DIST_DIR = path.join(__dirname, 'public', 'dist');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlTemplatePlugin = require('html-webpack-template');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, argv) => {
  console.log(argv.mode);
  const isEnvProduction = argv.mode === 'production';
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
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
        }),
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
          links: [
            // {
            //   rel: 'preload',
            //   href: '[contenthash].bundle.js',
            //   as: 'script',
            // },
            {
              rel: 'preload',
              href: 'nunito-extralight-webfont.woff2',
              as: 'font',
              crossorigin: 'anonymous',
            },
            {
              rel: 'preload',
              href: 'nunito-regular-webfont.woff2',
              as: 'font',
              crossorigin: 'anonymous',
            },
            {
              rel: 'preload',
              href: 'nunito-semibold-webfont.woff2',
              as: 'font',
              crossorigin: 'anonymous',
            },
            {
              rel: 'preload',
              href: 'nunito-bold-webfont.woff2',
              as: 'font',
              crossorigin: 'anonymous',
            },
            {
              rel: 'preload',
              href: 'fonts.css',
              as: 'style',
            },
            {
              rel: 'stylesheet',
              href: 'fonts.css',
            },
            {
              rel: 'preconnect',
              href: 'https://keybox-review-images.s3-us-west-1.amazonaws.com',
            },
            {
              rel: 'dns-prefetch',
              href: 'https://keybox-review-images.s3-us-west-1.amazonaws.com',
            },
            {
              rel: 'preconnect',
              href: 'https://keybox-review-static.s3-us-west-1.amazonaws.com',
            },
            {
              rel: 'dns-prefetch',
              href: 'https://keybox-review-static.s3-us-west-1.amazonaws.com',
            },
          ],
          title: 'Keybox Reviews Service',
          minify: true,
        }),
      ],
    },
    plugins: [new CleanWebpackPlugin(), new BundleAnalyzerPlugin()],
  };
};
