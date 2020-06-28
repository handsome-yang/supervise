const path = require('path')
module.exports = {
  lintOnSave: false,
  publicPath: '/supervise',
  outputDir: 'supervise',
  devServer: {
    port: 8899,
    open: true,
    proxy: {
      '/gis': {
        target: 'http://localhost:9080', //API服务器的地址
        ws: true,  //代理websockets
        changeOrigin: true, // 虚拟的站点需要更换origin
        pathRewrite: {   //重写路径
          '^/gis': ''
        }
      }
    },
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 192,
            // selectorBlackList: ['ivu-'],
            propList: ['*', '!border*'],
          }),
        ]
      },
      less: {
        javascriptEnabled: true
      }
    }
  },
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
  }
}

function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        // 需要全局导入的less路径
        path.resolve(__dirname, './src/assets/less/common.less'),
      ],
    })
}