<template>
    <div>
        <h1>文章列表</h1>
        <el-table :data="tableData">
            <el-table-column prop="_id" label="ID" width="240"></el-table-column>
            <!-- 下面的parent是在数据库模型中设计的，所以可以直接用 -->
            <!-- <el-table-column prop="parent.name" label="上级分类"></el-table-column> -->
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="200">
            <template slot-scope="scope">
                <el-button 
                @click="$router.push(`/articles/creat/${scope.row._id}`)"
                 type="primary" size="small">编辑</el-button>
                 <el-button 
                @click="remove(scope.row)"
                 type="primary" size="small">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data(){
        return{
            tableData:[]
        }
    },
    created() {
        this.fetch()
    },
    methods: {
        // 定义fetch方法获取列表内容
        // fetch(){
        //    this.$axios({
        //         method:'get',
        //         url:'categories'
        //     }).then(res =>{
        //         // console.log(res.data)
        //         this.tableData = res.data
        //     }) 
        // }
        async fetch(){
            const res = await this.$axios({
                method:'get',
                url:'rest/articles'
            })
            this.tableData = res.data
        },
        async remove(row){
            this.$confirm(`确定是否要删除文章"${row.title}"?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async () => {
                    const res  = await this.$axios.delete(`rest/articles/${row._id}`)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })     
                this.fetch()
            })
        }
    }
}
</script>

<style>
    
</style>