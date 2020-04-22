<template>
    <div>
        <h1>{{id?'编辑':'新增'}}管理员</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="用户名">
                <el-input v-model="model.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="model.password"></el-input>
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
            model:{},  // 新建的分类名字
        }
    },
    created() {
        console.log(this.id)
        // 意思是如果id存在，就执行fetch方法
        this.id && this.fetch()
        this.fetchParents()
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
                res = await this.$axios.put(`rest/admin_users/${this.id}`,this.model)
            }else{
                res = await this.$axios.post(`rest/admin_users`,this.model)
            }
            this.$router.push('/admin_users/list')
            this.$message({
                    type:'success',
                    message:'保存成功'
                })
        },
        // 获取分类名字的方法
        async fetch(){
            // 只能这样写
            const res = await this.$axios.get(`rest/admin_users/${this.id}`)
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
    },
}
</script>

<style>
    
</style>