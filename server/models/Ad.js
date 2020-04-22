const mongoose  = require('mongoose')

const schema = new mongoose.Schema({
    // 广告位名字
    name:{type:String},
    items:[{
        image:{type:String},
        url:{type:String}
    }]
})

module.exports = mongoose.model('Ad',schema)