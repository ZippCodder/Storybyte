// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const postcssPresetEnv = require("postcss-preset-env");
const isProduction = process.env.NODE_ENV == "production";
const useHotReloading = process.env.HOT === "true";
const useHTML = process.env.HTML === "true";

const stylesHandler = "style-loader";

const config = {
  entry: {
     home: "./src/Home.tsx",
     signup: "./src/Signup.tsx",
     signin: "./src/Signin.tsx"
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
		      plugins: [postcssPresetEnv({stage: false, features: {"all-property": true,"media-query-ranges": true,"custom-properties": true}})],
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

	  if (useHTML) {
    for (let p in config.entry) {
     config.plugins.push(new HtmlWebpackPlugin({chunks: [p], filename: p.concat(".html"), template: "./public/template.html"}));
    }
	  }
  }
  return config;
};
