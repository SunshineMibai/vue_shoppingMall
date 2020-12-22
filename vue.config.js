
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const WebpackBar = require('webpackbar')
const TerserPlugin = require('terser-webpack-plugin')
const resolve = file => path.resolve(__dirname, file)
function resolves(dir) {
  return path.join(__dirname, './', dir)
}
module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new TerserPlugin({
            cache: true,
            parallel: true,
            sourceMap: true, // Must be set to true if using source-maps in production
            terserOptions: {
              compress: {
                warnings: false,
                drop_console: true,//console
                drop_debugger: false,
                pure_funcs: ['console.log']//移除console
              }
            }
          }),
          new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "windows.jQuery": "jquery"
          }),
          new WebpackBar({
            name: 'mmm-mibai',
            // color: '#4091FB'
          }),
          ["import", {
            "libraryName": "mand-mobile",
            "libraryDirectory": "lib"
          }],
        ]
      }
    } else {
      return {
        plugins: [
          new WebpackBar({
            name: 'mmm-mibai',
            // color: '#4091FB'
          }),
          new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "windows.jQuery": "jquery"
          }),
          ["import", {
            "libraryName": "mand-mobile",
            "libraryDirectory": "lib"
          }]
        ]
      }
    }
  },
  // 不解释，请自行查阅文档
  // https://cli.vuejs.org/zh/config/#configurewebpack
  configureWebpack: config => {
    config.plugins.forEach((item, i) => {
      if (item.tsconfig) {
        config.plugins.splice(i, 1);
      }
    })
  },
  devServer: {
   //  open: true,
    port: 8888
  },

  publicPath: './',
  //outputDir: '../www', // 构建输出目录
  assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
  productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  css: {
    loaderOptions: {
      sass: {
        prependData: `
              @import "@/assets/style/base.scss";
          `
      }
    }
  },

}