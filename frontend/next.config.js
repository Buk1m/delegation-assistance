const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
  webpack: config => {
    const devMode = process.env.NODE_ENV !== "production";
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: devMode ? "[name].css" : "static/[name].[hash].css",
        chunkFilename: devMode ? "[id].css" : "static/[id].[hash].css"
      })
    );
    config.module.rules.push(
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.(ttf|eot|svg|png|gif|jpg)$/,
        use: [
          {
            loader: "file-loader",
            options: { outputPath: "static/", publicPath: "/_next/static" }
          }
        ]
      }
    );

    return config;
  }
};

module.exports = config;
