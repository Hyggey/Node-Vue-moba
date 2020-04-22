<template>
    <div>
        <h1>{{id?'编辑':'新增'}}广告位</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="广告">
                <el-button size="small" type="primary" @click="model.items.push({})"><i class="el-icon-plus"></i>添加广告</el-button>
                <el-row type="flex" style="flex-wrap:wrap">
                    <el-col :md="24" v-for="(item,index) in model.items" :key="index">
                        <el-form-item label="跳转链接(url)">
                            <el-input v-model="item.url"></el-input>
                        </el-form-item>
                        <el-form-item label="图片" style="margin-top:1.2rem">
                            <el-upload
                                class="avatar-uploader"
                                :action="$axios.defaults.baseURL+'/upload'"
                                :show-file-list="false"
                                :on-success="res => $set(item,'image',res.url)"
                                >
                                <img v-if="item.image" :src="item.image" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item>
                            <el-button size="small" type="danger" @click="model.items.splice(index,1)">删除</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
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
                items:[]
            },  // 新建的分类名字
        }
    },
    created() {
        console.log(this.id)
        // 意思是如果id存在，就执行fetch方法
        this.id && this.fetch()
    },
    methods: {
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
                res = await this.$axios.put(`rest/ads/${this.id}`,this.model)
            }else{
                res = await this.$axios.post(`rest/ads`,this.model)
            }
            this.$router.push('/ads/list')
            this.$message({
                    type:'success',
                    message:'保存成功'
                })
        },
        // 获取分类名字的方法
        async fetch(){
            // 只能这样写
            const res = await this.$axios.get(`rest/ads/${this.id}`)
            // 不能这样写，因为这样写请求的url地址多了一个0=？，而0=是不要的
            // http://localhost:3000/admin/api/categories?0=5e9dc555ba604936a0a408d4
            // const res = await this.$axios({
            //     method:'get',
            //     url:'categories',
            //     params: this.id
            // })
            console.log(res)
            this.model = res.data
            // 如果获取不到数据的话就用下面这种
            // this.model = Object.assign({},this.model,res.data)
        },
    },
}
</script>

<style scoped>
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
    width: 25rem;
    height: 195px;
    line-height: 195px;
    text-align: center;
  }
  .avatar {
    width: 25rem;
    height: 195px;
    display: block;
  }
</style>