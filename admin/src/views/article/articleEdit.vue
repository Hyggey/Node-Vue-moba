<template>
    <div>
        <h1>{{id?'编辑':'新增'}}文章</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="所属分类">
                <el-select v-model="model.categories" multiple>
                    <el-option 
                    v-for="item in categories"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model="model.title"></el-input>
            </el-form-item>
            <el-form-item label="详情">
                <vue-editor
                useCustomImageHandler
                @image-added="handleImageAdded"
                 v-model="model.body"></vue-editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {VueEditor} from 'vue2-editor'
export default {
    // 自己传自己
    props:{
        id:{
            type:String
        }
    },
    components:{
        VueEditor
    },
    data(){
        return {
            model:{},  // 新建的分类名字
            categories:[]  // 分类父级列表
        }
    },
    created() {
        console.log(this.id)
        // 意思是如果id存在，就执行fetch方法
        this.id && this.fetch()
        this.fetchCategories()
    },
    methods: {
        // 处理富文本编辑器图片的方法
        async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)
 
            var formData = new FormData();
            formData.append("file", file);

            const res = await this.$axios.post('upload',formData)
            Editor.insertEmbed(cursorLocation, "image", res.data.url);
            resetUploader();
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
                res = await this.$axios.put(`rest/articles/${this.id}`,this.model)
            }else{
                res = await this.$axios.post(`rest/articles`,this.model)
            }
            this.$router.push('/articles/list')
            this.$message({
                    type:'success',
                    message:'保存成功'
                })
        },
        // 获取文章详情的方法
        async fetch(){
            // 只能这样写
            const res = await this.$axios.get(`rest/articles/${this.id}`)
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
        async fetchCategories(){
            const res = await this.$axios.get(`rest/categories`)
            console.log(res)
            this.categories = res.data
        }
    },
}
</script>

<style>
    
</style>