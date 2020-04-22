const mongoose  = require('mongoose')

const schema = new mongoose.Schema({
    // 标题
    title:{type:String},
    // 分类，是属于热门，还是公告，注意这里一个英雄可能有多个分类,要用数组表示
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}],
    // 详情
    body:{type:String}
})

module.exports = mongoose.model('Article',schema)