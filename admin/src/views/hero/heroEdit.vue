<template>
    <div>
        <h1>{{id?'编辑':'新增'}}英雄</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
           <el-tabs  value="skills" type="border-card">
               <el-tab-pane label="基础信息">
                    <el-form-item label="名称">
                        <el-input v-model="model.name"></el-input>
                    </el-form-item>
                    <el-form-item label="头像">
                        <el-upload
                            class="avatar-uploader"
                            :action="$axios.defaults.baseURL+'/upload'"
                            :show-file-list="false"
                            :on-success="afterUpload"
                            >
                        <img v-if="model.avatar" :src="model.avatar" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="称号">
                        <el-input v-model="model.title"></el-input>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select v-model="model.categories" multiple>
                            <el-option
                                v-for="item in categories"
                                :label="item.name"
                                :key="item._id"
                                :value="item._id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="难度">
                        <el-rate style="margin-top:0.7rem" :max="9" show-score v-model="model.scores.difficult"></el-rate>
                    </el-form-item>
                    <el-form-item label="技能">
                        <el-rate style="margin-top:0.7rem" :max="9" show-score v-model="model.scores.skills"></el-rate>
                    </el-form-item>
                    <el-form-item label="攻击">
                        <el-rate style="margin-top:0.7rem" :max="9" show-score v-model="model.scores.attack"></el-rate>
                    </el-form-item>
                    <el-form-item label="生存">
                        <el-rate style="margin-top:0.7rem" :max="9" show-score v-model="model.scores.survive"></el-rate>
                    </el-form-item>
                    <el-form-item label="顺风出装">
                        <el-select v-model="model.items1" multiple>
                            <el-option
                                v-for="item in items"
                                :label="item.name"
                                :key="item._id"
                                :value="item._id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="逆风出装">
                        <el-select v-model="model.items2" multiple>
                            <el-option
                                v-for="item in items"
                                :label="item.name"
                                :key="item._id"
                                :value="item._id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="使用技巧">
                        <el-input type="textarea" v-model="model.userTips"></el-input>
                    </el-form-item>
                    <el-form-item label="对抗技巧">
                        <el-input type="textarea" v-model="model.battleTips"></el-input>
                    </el-form-item>
                    <el-form-item label="团战思路">
                        <el-input type="textarea" v-model="model.teamTips"></el-input>
                    </el-form-item>
               </el-tab-pane>
               <el-tab-pane label="技能" name="skills">
                   <el-button type="primary" @click="model.skills.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
                   <el-row type="flex" style="flex-wrap:wrap">
                       <el-col :md="12" v-for="(item,index) in model.skills" :key="index">
                           <el-form-item label="名称">
                               <el-input v-model="item.name"></el-input>
                           </el-form-item>
                           <el-form-item label="图标">
                               <el-upload
                                    class="avatar-uploader"
                                    :action="$axios.defaults.baseURL+'/upload'"
                                    :show-file-list="false"
                                    :on-success="res => $set(item,'icon',res.url)"
                                    >
                                    <img v-if="item.icon" :src="item.icon" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                           </el-form-item>
                           <el-form-item label="描述">
                               <el-input type="textarea" v-model="item.description"></el-input>
                           </el-form-item>
                           <el-form-item label="小提示">
                               <el-input type="textarea" v-model="item.tips"></el-input>
                           </el-form-item>
                           <el-form-item>
                               <el-button size="small" type="danger" @click="model.skills.splice(index,1)">删除</el-button>
                           </el-form-item>
                       </el-col>
                   </el-row>
               </el-tab-pane>
           </el-tabs>
            <el-form-item style="margin-top:1.5rem">
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    // 自己传自己
    props:{
        id:{
            type:String
        }
    },
    data(){
        return {
            items:[],
            categories:[],  // 英雄的类型，战士，法师...
            model:{
                name:'',
                avatar:'',
                skills:[],
                scores:{
                    difficult:0
                } //难度
                // avatar:''    不写默认数据的话，后面就用$set
            },  // 新建的分类名字
            parents:[]  // 分类父级列表
        }
    },
    created() {
        console.log(this.id)
        // 意思是如果id存在，就执行fetch方法
        this.id && this.fetch()
        this.fetchCategories()
        this.fetchItems()
    },
    methods: {
        // 上传成功后做什么
        afterUpload(res){
            this.model.avatar = res.url  //初始data中没有给
            // this.$set(this.model,'avatar',res.url)
            console.log(res)
        },
        // 新增分类的方法,下面是老式写法，也可以用
        // save(){
        //     this.$axios({
        //         method:'post',
        //         url:'categories',
        //         data: this.model
        //     }).then(res =>{
        //         console.log(res)
        //         // 跳到列表页面
        //         this.$router.push('/categories/list')
        //         // console.log(this)
        //         this.$message({
        //             type:'success',
        //             message:'保存成功'
        //         })
        //     })
        // },
        // 新的写法
        async save(){
            let res;
            if(this.id){
                res = await this.$axios.put(`rest/heros/${this.id}`,this.model)
            }else{
                res = await this.$axios.post(`rest/heros`,this.model)
            }
            this.$router.push('/heros/list')
            this.$message({
                    type:'success',
                    message:'保存成功'
                })
        },
        // 获取分类名字的方法
        async fetch(){
            // 只能这样写
            const res = await this.$axios.get(`rest/heros/${this.id}`)
            // 不能这样写，因为这样写请求的url地址多了一个0=？，而0=是不要的
            // http://localhost:3000/admin/api/categories?0=5e9dc555ba604936a0a408d4
            // const res = await this.$axios({
            //     method:'get',
            //     url:'categories',
            //     params: this.id
            // })
            console.log(res)
            // 不能这样赋值，因为后端返回过来的数据中没有scores数据
            // this.model = res.data
            // 使用下面这种，可以保留自己定义的scores
            this.model = Object.assign({},this.model,res.data)
        },
        // 获取分类类型
        async fetchCategories(){
            const res = await this.$axios.get(`rest/categories`)
            console.log(res)
            this.categories = res.data
        },
        // 获取装备名字
        async fetchItems(){
            const res = await this.$axios.get(`rest/items`)
            console.log(res)
            this.items = res.data
        }
    },
}
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>