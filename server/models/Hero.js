const mongoose  = require('mongoose')

const schema = new mongoose.Schema({
    // 英雄名字
    name:{type:String},
    // 这里的parent是name的父级，在monbodb数据库中必须这样定义，ObjectId就是mongodb数据库自己生成的那个id
    //  ref表示关联哪个模型，在这里就是关联本身 Category schema模型
    avatar:{type:String},
    // 称号
    title:{type:String},
    // 分类，是战士，还是，刺客，注意这里一个英雄可能有多个分类,要用数组表示
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}],
    // 攻击几颗星
    scores:{
        difficult: {type:Number},
        skills: {type:Number},
        attack: {type:Number},
        survive: {type:Number},
    },
    // 英雄的四个技能
    skills:[
        {
            icon:{type:String},
            name:{type:String},
            description:{type:String},
            tips:{type:String}
        }
    ],
    // 顺风出装
    items1:[{type:mongoose.SchemaTypes.ObjectId,ref:'Item'}],
    // 逆风出装
    items2:[{type:mongoose.SchemaTypes.ObjectId,ref:'Item'}],
    // 使用技巧
    userTips:{type:String},
    battleTips:{type:String},
    teamTips:{type:String},
    partners:[
        {
            hero:{type:mongoose.SchemaTypes.ObjectId,ref:'Hero'},
            description:{type:String}
        }
    ]
})

module.exports = mongoose.model('Hero',schema)