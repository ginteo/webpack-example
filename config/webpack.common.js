const path = require('path')
const { DefinePlugin } = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')

module.exports = {
  entry: './src/js/index.js',

  // 路径别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    },
    extensions: ['.js', '.ts', '.scss'] // 引入文件时省略后缀名
  },

  module: {
    rules: [
      {
        test: /\.(css|s[ac]ss)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },

      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        // 自定义文件的输出路径和文件名
        generator: {
          filename: 'images/[name]_[hash:5][ext]'
        }
      },

      {
        test: /\.(eot|ttf|woff2?)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name]_[hash:5][ext]'
        }
      },

      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: [
          'thread-loader',
          {
            loader: 'babel-loader',
            // 若配置了babel.config.js，则options不用配置
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new htmlWebpackPlugin({
      title: 'webpack-config',
      // 指定我们要使用的模块所在的路径
      template: path.resolve(__dirname, '../public/index.html')
    }),

    new MiniCssExtractPlugin({
      // 将css代码输出到dist/styles文件夹下
      filename: 'styles/chunk-[contenthash].css',
      ignoreOrder: true
    }),

    new DefinePlugin({
      BASE_URL: '"./"'
    }),

    new ProgressBarPlugin({
      format: ` build [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`
    })
  ]
}
