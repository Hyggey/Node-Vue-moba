module.exports = app =>{
    const express = require('express')
    const router = express.Router()
    // 引入创建的分类schema模型
    const Category = require('../../models/category')

    // 新建分类接口  -----增
    router.post('/categories',async(req,res) =>{
        const model = await Category.create(req.body)
        res.send(model)
    })

    // 返回分类列表数据接口  ----查
    router.get('/categories',async(req,res) =>{
        const data = await Category.find().limit(10)
        res.send(data)
    })

    // 有id的情况下更新内容  -----改
    router.put('/categories/:id',async(req,res) =>{
        // console.log(req.params.id)
        // 为什么这里可以直接点出id，因为你定义接口时自己写的就是id,我故意改成a的
        const data = await Category.findByIdAndUpdate(req.params.id,req.body)
        res.send(data)
    })

    // 获取具体的分类名称接口   -----查
    router.get('/categories/:a',async(req,res) =>{
        console.log(req.params.a)
        // 为什么这里可以直接点出id，因为你定义接口时自己写的就是id,我故意改成a的
        const data = await Category.findById(req.params.a)
        res.send(data)
    })

    // 删除id分类  ----删
    router.delete('/categories/:id',async(req,res) =>{
        console.log(req.params.id)
        // 为什么这里可以直接点出id，因为你定义接口时自己写的就是id,我故意改成a的
        const data = await Category.findByIdAndDelete(req.params.id)
        res.send(data)
    })

    app.use('/admin/api',router)
}