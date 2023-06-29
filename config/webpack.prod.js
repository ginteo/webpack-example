const path = require('path')
const copyWebpackPlugin = require('copy-webpack-plugin')
const { merge } = require('webpack-merge')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CompressionPlugin = require('compression-webpack-plugin')
const commonConfig = require('./webpack.common.js')

module.exports = merge(commonConfig, {
  mode: 'production',

  devtool: 'nosources-source-map',

  output: {
    // 打包后的输出目录
    path: path.resolve(__dirname, '../dist'),
    // 打包后的文件名
    filename: 'js/main.js',
    // 打包后自动清除旧的输出目录
    clean: true
  },

  optimization: {
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()]
  },

  plugins: [
    new copyWebpackPlugin({
      patterns: [
        {
          // 设置从哪一个源中开始复制
          from: './public',
          globOptions: {
            // 忽略的文件
            ignore: ['**/index.html']
          }
        }
      ]
    }),

    new CssMinimizerPlugin(), // 去重压缩css

    // 打包体积分析
    new BundleAnalyzerPlugin(),

    // gzip压缩
    new CompressionPlugin({
      algorithm: 'gzip',
      threshold: 10240,
      minRatio: 0.8
    })
  ]
})
