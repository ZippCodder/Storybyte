// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const postcssPresetEnv = require("postcss-preset-env");
const isProduction = process.env.NODE_ENV == "production";
const useHotReloading = process.env.HOT === "true";

const stylesHandler = "style-loader";

const config = {
  entry: {
     main: "./src/App.tsx",
     home: "./src/home.tsx"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
    filename: "[name].bundle.js"
  },
  devServer: {
    open: true,
    port: 5000,
    host: "localhost", 
    hot: useHotReloading
  },
	plugins: [],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        use: ["babel-loader","ts-loader"]
      },
      {
        test: /\.css$/i,
        use: [stylesHandler,"css-loader",{
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
		      plugins: [postcssPresetEnv({stage: 4})],
              },
            },
          }]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
}

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
    config.devtool = "source-map";
  } else {
    config.mode = "development";
    config.devtool = "eval-source-map";
    for (let p in config.entry) {
     config.plugins.push(new HtmlWebpackPlugin({chunks: [p], filename: p.concat(".html"), template: "./public/template.html"}));
    }
  }
  return config;
};
