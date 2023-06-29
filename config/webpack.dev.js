const { merge } = require('webpack-merge')
const ESLintPlugin = require('eslint-webpack-plugin')
const commonConfig = require('./webpack.common')

module.exports = merge(commonConfig, {
  mode: 'development',

  devtool: 'eval-cheap-module-source-map',

  devServer: {
    port: 8000,
    hot: true,
    open: true // 自动打开浏览器
  },

  plugins: [
    new ESLintPlugin({
      // 运行的时候自动帮你修复错误
      fix: true
    })
  ]
})
