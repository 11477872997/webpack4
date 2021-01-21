const path = require('path')  //引入path
const { CleanWebpackPlugin } = require('clean-webpack-plugin')  // 引入我们下载的插件
const HtmlWebpackPlugin = require('html-webpack-plugin')  // 引入自动生成HTML的插件
const webpack = require('webpack') //引入webpack
const VueLoaderPlugin = require('vue-loader/lib/plugin') // 引入下载完的vue-loader

module.exports = {
    mode: 'development', //将模式设置为 开发模式：
    devtool: 'source-map',  //开启调试：
    entry: './src/main.js', //入口文件
    output: {  //出口文件
        publicPath: '/',   //资源引入路径
        path:path.resolve(__dirname, 'dist'),   //输出文件 把项目打包成的 路径 以及文件夹名称
        filename: 'index.js',   //把我们的项目主文件打包后生产的js文件
    },
    plugins: [
        new CleanWebpackPlugin() ,//默认情况下，此插件将删除 webpack output.path目录中的所有文件，以及每次成功重建后所有未使用的 webpack 资产。
        new HtmlWebpackPlugin({ //使用我们的自动生成HTML插件，并对其相应的参数进行设置
            title: 'webpack搭建VUE项目',
            minify:{
                removeComments: true, //是否删除HTML中的注释
                collapseWhitespace: true, //是否删除HTML中多余的空格
                minifyCSS: true //是否要压缩我们的css文件
            },
            template: './public/index.html', //告诉我们的webpack打包的时候用哪一个作为模版文件生成HTML结构
            filename:  'index.html', //要生成什么名字的文件
        }),
        new webpack.HotModuleReplacementPlugin(), // 热部署模块
        new webpack.NamedModulesPlugin(),
        new VueLoaderPlugin()
    ], 
    module: {
        rules: [
        {
            test: /\.js$/, // 使用正则来匹配 js 文件
            exclude: /node_modules/, // 排除依赖包文件夹
            use: {
            loader: 'babel-loader' // 使用 babel-loader
            }
        },
        {
            test: /\.vue$/,  //解析vue
            loader: 'vue-loader'
          }
        ]
    },
    devServer: {  //对服务器进行相关配置
        contentBase: path.join(__dirname, 'dist'),
        port: 3000, // 本地服务器端口号
        hot: true, // 热重载
        overlay: true, // 如果代码出错，会在浏览器页面弹出“浮动层”。类似于 vue-cli 等脚手架
        proxy: {
          // 跨域代理转发
        //   '/comments': {
        //     target: 'https://m.weibo.cn',
        //     changeOrigin: true,
        //     logLevel: 'debug',
        //     headers: {
        //       Cookie: ''
        //     }
        //   }
        },
        historyApiFallback: {
          // HTML5 history模式
          rewrites: [{ from: /.*/, to: '/index.html' }]
        }
    }
}