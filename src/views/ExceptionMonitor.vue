<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { getErrors, getErrorById } from '@/api'
import { format, parseISO } from 'date-fns'
interface IError {
    _id?: string | number
    name?: string
    source?: string
    lineno?: number
    colno?: number
    createdDate?: string
    message?: string
    [propName: string]: any
}
interface ISearchForm {
    name?: string
    principal?: string
    createdDate?: string
}
const isList = ref<boolean>(false)
// const handleChangeView = (value:showrType) => {
//     console.error(value)
//     current.value =
//         current.value === showrType.LIST ? showrType.CHART : showrType.LIST
// }
const loading = ref<boolean>(false)
const searchForm = reactive<ISearchForm>({
    name: '',
    createdDate: '',
})
const { t } = useI18n()
const formRef = ref<FormInstance>()
const form = reactive<IError>({
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
const tableData = ref<IError[]>([])
const dialogVisible = ref<boolean>(false)
const dialogLoading = ref<boolean>(false)
const getData = () => {
    loading.value = true
    return getErrors().then(({ data }) => {
        tableData.value = data
        loading.value = false
    })
}
const getDetail = (id: any) => {
    console.error(id)
}
const handleSearch = () => getData()
handleSearch()
const resetForm = () => {
    formRef.value && formRef.value.resetFields()
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
const option = reactive({
    title: {
        text: 'Traffic Sources',
        left: 'center',
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines'],
    },
    series: [
        {
            name: 'Traffic Sources',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
                { value: 335, name: 'Direct' },
                { value: 310, name: 'Email' },
                { value: 234, name: 'Ad Networks' },
                { value: 135, name: 'Video Ads' },
                { value: 1548, name: 'Search Engines' },
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
            },
        },
    ],
})
</script>
<template>
    <div class="error-monitor">
        <div>
            <el-switch
                v-model="isList"
                class="mb-2"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="列表"
                inactive-text="图表"
            />
        </div>
        <div class="search-panel">
            <div style="margin-right: 40px">
                <el-switch
                    v-model="isList"
                    class="mb-2"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-text="列表"
                    inactive-text="图表"
                />
            </div>
            <el-form inline>
                <el-form-item label="创建时间">
                    <el-date-picker
                        v-model="searchForm.createdDate"
                        type="date"
                        placeholder="请选择创建时间"
                    />
                </el-form-item>
                <el-form-item label="项目">
                    <el-input v-model="searchForm.name"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="handleSearch">{{
                        t('common.search')
                    }}</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div v-show="isList" class="table">
            <el-table v-loading="loading" :data="tableData" height="500px">
                <el-table-column
                    type="index"
                    label="序号"
                    width="100px"
                ></el-table-column>
                <el-table-column prop="name" label="错误名称" />
                <el-table-column prop="message" label="错误信息" />
                <el-table-column prop="source" label="Source" />
                <el-table-column prop="createdDate" label="创建日期">
                    <template #default="{ row }">
                        <span>
                            {{
                                row.createdDate
                                    ? format(
                                          parseISO(row.createdDate),
                                          'yyyy-MM-dd hh:mm:ss',
                                      )
                                    : ''
                            }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="lineno" label="行" />
                <el-table-column prop="colno" label="列" />
                <el-table-column prop="operation" label="操作">
                    <template #default="{ row }">
                        <div>
                            <el-button type="text" @click="getDetail(row._id)">
                                detail
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-show="!isList" class="monitor-charts">
            <v-chart class="chart" :option="option" />
            <v-chart class="chart" :option="option" />
        </div>
        <el-dialog
            v-model="dialogVisible"
            v-loading="dialogLoading"
            width="500px"
        >
            <el-form
                ref="formRef"
                :model="form"
                :rules="rules"
                label-width="100px"
            >
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
                    <el-button type="primary" @click="handleSure"
                        >确定</el-button
                    >
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<style lang="scss" scoped>
.search-panel :deep(.el-form-item) {
    margin-bottom: 0 !important;
}

:deep(.el-input__wrapper) {
    width: 100%;
}

.error-monitor {
    .search-panel {
        display: flex;
        margin: 20px 0;
    }

    .table {
        transition: all 0.3s ease-in-out;
    }

    .monitor-charts {
        display: flex;
        align-items: center;
        transition: all 0.3s ease-in-out;
        .chart {
            height: 400px;
        }
    }
}
</style>
