const express = require('express')

const app = express()

// 引入跨域模块
app.use(require('cors')())
// 引入和body-parser功能类似de中间件，功能是在post请求获取到
// 客户端提交过来的req.body
app.use(express.json())

// 开辟出静态资源可以访问
app.use('/uploads',express.static(__dirname + '/uploads'))

// 引入admin的路由
require ('./routes/admin')(app)

// 引入连接数据库的mongoose
require('./plugins/db')(app)

app.get('/',function(req,res){
    res.send('hello express')
})

app.listen(3000,function(){
    console.log('express已经启动')
})