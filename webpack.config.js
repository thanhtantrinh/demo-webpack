const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // installed via npm
const webpack = require("webpack"); // to access built-in plugins

module.exports = (env) => {
  const isDevBuild = !(env && env.prod);
  const outputDir = env && env.publishDir ? env.publishDir : __dirname;
  const webpackConfig = [
    {
      watchOptions: {
        ignored: /node_modules/,
      },
      output: {
        filename: "ts/[name].js",
        path: path.join(outputDir, "dist"),
        publicPath: "/",
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            loader: "babel-loader",
          },
          {
            test: /\.s[ac]ss$/i,
            use: [
              // Creates `style` nodes from JS strings
              "style-loader",
              // Translates CSS into CommonJS
              "css-loader",
              // Compiles Sass to CSS
              "sass-loader",
            ],
          },
        ],
      },
      plugins: [
        //new webpack.ProgressPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({ template: '/src/index.html' }),
        //new CleanWebpackPlugin(),
        //new CleanWebpackPlugin(path.join(outputDir, 'js', 'dist')),
        //new CheckerPlugin(),
        //new ExtractTextPlugin({ // define where to save the file
        //    filename: 'dist/bundle.css',
        //    allChunks: true,
        //}),
      ],
    },
  ];

  return webpackConfig;
};
