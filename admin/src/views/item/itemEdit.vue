<template>
    <div>
        <h1>{{id?'编辑':'新增'}}物品</h1>
        <el-form label-width="120px" @submit.native="save">
            <!-- <el-form-item label="上级分类">
                <el-select v-model="model.parent">
                    <el-option 
                    v-for="item in parents"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="图标">
                <el-upload
                    class="avatar-uploader"
                    :action="$axios.defaults.baseURL+'/upload'"
                    :show-file-list="false"
                    :on-success="afterUpload"
                    >
                <img v-if="model.icon" :src="model.icon" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
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
            model:{
                // icon:''    不写默认数据的话，后面就用$set
            },  // 新建的分类名字
            parents:[]  // 分类父级列表
        }
    },
    created() {
        console.log(this.id)
        // 意思是如果id存在，就执行fetch方法
        this.id && this.fetch()
        this.fetchParents()
    },
    methods: {
        // 上传成功后做什么
        afterUpload(res){
            // this.model.icon = res.url  //初始data中没有给
            this.$set(this.model,'icon',res.url)
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
                res = await this.$axios.put(`rest/items/${this.id}`,this.model)
            }else{
                res = await this.$axios.post(`rest/items`,this.model)
            }
            this.$router.push('/items/list')
            this.$message({
                    type:'success',
                    message:'保存成功'
                })
        },
        // 获取分类名字的方法
        async fetch(){
            // 只能这样写
            const res = await this.$axios.get(`rest/items/${this.id}`)
            // 不能这样写，因为这样写请求的url地址多了一个0=？，而0=是不要的
            // http://localhost:3000/admin/api/categories?0=5e9dc555ba604936a0a408d4
            // const res = await this.$axios({
            //     method:'get',
            //     url:'categories',
            //     params: this.id
            // })
            console.log(res)
            this.model = res.data
        },
        async fetchParents(){
            const res = await this.$axios.get(`rest/items`)
            console.log(res)
            this.parents = res.data
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