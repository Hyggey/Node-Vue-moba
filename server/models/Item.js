const mongoose  = require('mongoose')

const schema = new mongoose.Schema({
    name:{type:String},
    // 这里的parent是name的父级，在monbodb数据库中必须这样定义，ObjectId就是mongodb数据库自己生成的那个id
    //  ref表示关联哪个模型，在这里就是关联本身 Category schema模型
    icon:{type:String}
})

module.exports = mongoose.model('Item',schema)