// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const path = require("path");
const autoprefixer = require("autoprefixer");
//const config = require("../config/webpack.config.dev.js");
//module.exports = config;
module.exports = {
  plugins: [
    // your custom plugins
  ],
  module: {
    rules: [
      // add your custom rules.
           {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            
            
            
          },
          {
            loader: 'css-loader',
            options: {
              modules: false,
             
            },
          },
            
        ],
      },
      //---
      {
    test: /\.(png|woff|woff2|eot|ttf|svg)$/,
    loaders: ['file-loader'],
    include: path.resolve(__dirname, '../')
}
    ],
  },
};

