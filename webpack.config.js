// Generated using webpack-cli https://github.com/webpack/webpack-cli
const webpack = require("webpack");

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postcssPresetEnv = require("postcss-preset-env");
const postcssMinify = require("postcss-minify");
const isProduction = process.env.NODE_ENV === "production";
const useHotReloading = process.env.HOT === "true";

const useHTML = process.env.HTML === "true";

const config = {
  entry: {
     home: "./src/Home.tsx",
     signup: "./src/Signup.tsx",
     signin: "./src/Signin.tsx"
  },
  experiments: {
     outputModule: true
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    publicPath: "/",
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
        use: [ {
        loader: 'babel-loader',
        options: {
  "plugins": ["@babel/syntax-dynamic-import"],
  "presets": [
    [
      "@babel/preset-env",
      {
        "corejs": {"version": "3.20"},
        "targets": "defaults",
        "useBuiltIns": "usage",
        "modules": false
      }
    ],
    ["@babel/preset-react"]
  ]
        }
      } ,"ts-loader"]
      },
      {
        test: /\.css$/i,
        use: ["css-loader",{
            loader: 'postcss-loader',
            options: {
	      sourceMap: true,
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
config.plugins.push(new webpack.DefinePlugin({_SSR_: Boolean(process.env.SSR)}));
    	  if (process.env.SSR) {
        config.devtool = false;
    config.output.library = {type: "commonjs"};
    config.externals = {
     react: "react",
     "react-dom": "react-dom"
    }
	config.output.path = path.resolve(__dirname,"dist/ssr");
		  config.plugins.push(new webpack.IgnorePlugin({resourceRegExp: /\.css$/i}));
		  config.module.rules[0].use[0].options.plugins.push(["babel-plugin-transform-remove-imports",{test: /\.css$/i}]);
 } else {
config.devtool = "source-map";
config.plugins.push(new MiniCssExtractPlugin());
    config.module.rules[1].use.unshift(MiniCssExtractPlugin.loader); 
    config.module.rules[1].use[2].options.postcssOptions.plugins.unshift(postcssMinify); 
 }
} else {
    config.mode = "development";
    config.devtool = "inline-source-map";
    config.module.rules[1].use.unshift("style-loader"); 

	  if (useHTML) {
    for (let p in config.entry) {
     config.plugins.push(new HtmlWebpackPlugin({chunks: [p], filename: p.concat(".html"), template: "./public/template.html"}));
    }
	  }
  }

  return config;
};
