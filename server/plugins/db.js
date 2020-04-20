module.exports = app =>{
    const mongoose = require('mongoose')
// 27017是mongodb数据库的端口地址，后面是该项目数据库的名字
    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba',{
        useNewUrlParser: true
    })
}