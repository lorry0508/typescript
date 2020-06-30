const path = require('path');

const resolve = dir => {
    return path.join(__dirname, dir);
}

const BASE_URL = process.env.NODE_ENV === 'production' ? './' : '/';

module.exports = {
    publicPath: BASE_URL, // 公共文件路径
    lintOnSave: true, // 在保存文件时对代码进行格式校验
    devServer: {
        open: true, // 打开浏览器
    },
    chainWebpack: config => {
        config.resolve.alias.set('@', resolve('src')); //配置便捷路径，凡是src这一级路径用@代替
    }
}