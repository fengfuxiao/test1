const path = require("path")

module.exports = {
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        // 加上自己的style.less的路径
        path.resolve(__dirname, "./src/themes/style.less"),
      ],
    }
  }
}