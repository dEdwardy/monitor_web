<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useI18n } from 'vue-i18n'
interface IProject {
    id?: string | number
    name?: string
    email?: string
    created?: string
    principal?: string
    sourcemap?: string
    [propName: string]: any
}
interface ISearchForm {
    name?: string
    principal?: string
    created?: string
}
const loading = ref<boolean>(false)
const searchForm = reactive<ISearchForm>({
    name: '',
    created: '',
})
const { t } = useI18n()
const formRef = ref<FormInstance>()
const form = reactive<IProject>({
    name: '',
    principal: '',
    email: '',
})
const rules = reactive<FormRules>({
    name: [
        { required: true, message: '请输入项目名称', trigger: 'blur' },
        {
            min: 2,
            max: 20,
            message: '项目名称长度在 2 到 20 个字符',
            trigger: 'blur',
        },
    ],
    principal: [
        { required: true, message: '请输入负责人', trigger: 'blur' },
        {
            min: 2,
            max: 20,
            message: '负责人长度在 2 到 20 个字符',
            trigger: 'blur',
        },
    ],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' },
    ],
})
const tableData = ref<IProject[]>([])
const dialogVisible = ref<boolean>(false)
const dialogLoading = ref<boolean>(false)
loading.value = true
setTimeout(() => {
    tableData.value = new Array(10).fill(1).map((i, idx) => ({
        id: idx,
        name: 'name' + idx,
        principal: 'name' + idx,
        email: i + 'sdfa@qq.com',
        apiKey: 'apiKey' + idx,
    }))

    loading.value = false
}, 1000)
const resetForm = () => {
    formRef.value && formRef.value.resetFields()
}
const handleAdd = () => {
    resetForm()
    dialogVisible.value = true
}
const handleSure = () => {
    formRef.value?.validate(async (valid: boolean) => {
        if (valid) {
            console.log('sure ............')
            dialogVisible.value = false
        }
    })
}
const handleCancel = () => {
    resetForm()
    dialogVisible.value = false
}
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
            <el-form-item label="项目">
                <el-input v-model="searchForm.name"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary">{{ t('common.search') }}</el-button>
                <el-button type="primary" @click="handleAdd">
                    <el-icon :size="16">
                        <SvgIcon icon-class="new" />
                    </el-icon>
                    {{ t('common.new') }}
                </el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="table">
        <el-table v-loading="loading" :data="tableData" height="500px">
            <el-table-column
                type="index"
                label="序号"
                width="100px"
            ></el-table-column>
            <el-table-column prop="name" label="项目名称"></el-table-column>
            <el-table-column prop="principal" label="负责人"></el-table-column>
            <el-table-column prop="created" label="创建日期"></el-table-column>
            <el-table-column prop="apiKey" label="ApiKey"></el-table-column>
        </el-table>
    </div>
    <el-dialog v-model="dialogVisible" v-loading="dialogLoading" width="500px">
        <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="项目名称" prop="name">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="负责人" prop="principal">
                <el-input v-model="form.principal" />
            </el-form-item>
            <el-form-item label="负责人邮件" prop="email">
                <el-input v-model="form.email" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div>
                <el-button @click="handleCancel">取消</el-button>
                <el-button type="primary" @click="handleSure">确定</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<style lang="scss" scoped>
.search-panel :deep(.el-form-item) {
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
