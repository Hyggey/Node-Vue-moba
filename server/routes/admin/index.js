
// ***通用CRUD改装 ****

module.exports = app =>{
    const express = require('express')

    // 不加这个mergeParams，就获取不到后面的那个资源参数  require(`../../models/${req.params.resource}`)
    // Error: Cannot find module '../../models/undefined'
    const router = express.Router({
        mergeParams: true
    })
    // 引入创建的分类schema模型
    // const Category = require('../../models/category')

    // 新建分类接口  -----增
    router.post('/',async(req,res) =>{
        // const Model = require(`../../models/${req.params.resource}`)
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    // 返回分类列表数据接口  ----查
    router.get('/',async(req,res) =>{
        // 一：这是查出数据库中的所有数据，但paent只是一个id，不能点出任何东西
        // const data = await Category.find().limit(10)
        // 加了个populate，作用是将有关联关系的数据parent转化为对象结构，能点出name属性
        // 二： 需要下载 inflection 这个包，作用是将复数转化为单数，并且首字母为大写，因为
        // 看到下面报的错误，他请求的地址名字，与自己取得名字不同
        // Error: Cannot find module '../../models/categories
        // const modelName= require('inflection').classify(req.params.resource) 
        // const Model = require(`../../models/${modelName}`)
        // 三：populate('parent')并不是所有接口都需要，只用使用Category模型时需要,所以加个判断

        const queryOptions = {}
        if(req.Model.modelName === 'Category'){
            queryOptions.populate = 'parent'
        }
        const data = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(data)
    })

    // 有id的情况下更新内容  -----改
    router.put('/:id',async(req,res) =>{
        // console.log(req.params.id)
        // 为什么这里可以直接点出id，因为你定义接口时自己写的就是id,我故意改成a的
        const data = await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(data)
    })

    // 获取具体的分类名称接口   -----查
    router.get('/:a',async(req,res) =>{
        console.log(req.params.a)
        // 为什么这里可以直接点出id，因为你定义接口时自己写的就是id,我故意改成a的
        const data = await req.Model.findById(req.params.a)
        res.send(data)
    })

    // 删除id分类  ----删
    router.delete('/:id',async(req,res) =>{
        console.log(req.params.id)
        // 为什么这里可以直接点出id，因为你定义接口时自己写的就是id,我故意改成a的
        const data = await req.Model.findByIdAndDelete(req.params.id)
        res.send(data)
    })

    // 加一个中间件，来公共处理那个参数,上面有
    app.use('/admin/api/rest/:resource',async(req,res,next) =>{
        const modelName= require('inflection').classify(req.params.resource) 
        req.Model = require(`../../models/${modelName}`)
        next()
    }, router)

    // 上传图片的路由
    // 这里需要下载一个处理文件的插件叫multer
    const multer = require('multer')
    // dirname 表示将图片文件存到这个目录中去
    const upload = multer({dest: __dirname + '/../../uploads'})
    // single表示接收单个文件图片的上传，同时定义上传文件的类型为file类型
    app.post('/admin/api/upload',upload.single('file'),async(req,res) =>{
        const file = req.file;
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
}