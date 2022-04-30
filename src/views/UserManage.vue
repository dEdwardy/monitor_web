<script setup lang="ts">
import { ref, reactive } from 'vue'
interface IUser {
    id?: string | number
    name?: string
    email?: string
    created?: string
    [propName: string]: any
}
interface ISearchForm {
    name?: string
    created?: string
}
const loading = ref<boolean>(false)
const searchForm = reactive<ISearchForm>({
    name: '',
    created: '',
})
const tableData = ref<IUser[]>([])
loading.value = true
setTimeout(() => {
    tableData.value = new Array(10).fill(1).map((i, idx) => ({
        id: idx,
        name: 'name' + idx,
        email: i + 'sdfa@qq.com',
    }))

    loading.value = false
}, 1000)
</script>
<template>
    <div class="search-panel">
        <el-form inline>
            <el-form-item label="创建时间">
                <el-date-picker
                    v-model="searchForm.created"
                    type="date"
                    placeholder="请选择创建时间"
                />
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="searchForm.name"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary">搜索</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="table">
        <el-table :data="tableData" height="500px">
            <el-table-column
                type="index"
                label="序号"
                width="100px"
            ></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="created" label="创建日期"></el-table-column>
        </el-table>
    </div>
</template>

<style lang="scss" scoped>
:deep(.el-form-item) {
    margin-bottom: 0 !important;
}

:deep(.el-input__wrapper) {
    width: 100%;
}

.search-panel {
    margin: 20px 0;
}

.table {
}
</style>
