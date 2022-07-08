/*
 * @Descripttion:
 * @version:
 * @Author: wwy
 * @Date: 2022-06-16 17:32:15
 * @LastEditors: wwy
 * @LastEditTime: 2022-07-07 15:33:30
 */

const path = require("path");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: "./dist",
    hot: true,
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          // 将 JS 字符串生成为 style 节点
          "style-loader",
          // 将 CSS 转化成 CommonJS 模块
          "css-loader",
        ],
      },
    ],
  },
};
