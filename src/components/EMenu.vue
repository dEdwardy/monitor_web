<script setup>
import { ref } from 'vue'

const props = defineProps({
    value: {
        type: [Number, String],
    },
    mode: {
        type: String,
        default: 'vertical',
    },
    menu: {
        type: Array,
        required: true,
        default: () => [
            {
                name: '用户权限',
                path: 'user',
                icon: 'user',
                children: [
                    {
                        name: '部门管理',
                        icon: '',
                        path: 'department',
                    },
                ],
            },
        ],
    },
    defaultActive: {
        type: [String, Number],
    },
    ellipsis: {
        type: Boolean,
        default: false,
    },
})
const emit = defineEmits(['update:value'])
const current = ref()
const handleSelect = (key, path) => {
    current.value = key
    emit('update:value', { key, path })
}
</script>

<template>
    <el-menu
        :default-active="defaultActive"
        class="menu"
        :mode="props.mode"
        :ellipsis="props.ellipsis"
        @select="handleSelect"
    >
        <el-sub-menu v-for="item of menu" :key="item.path" :index="item.path">
            <template #title>{{ item.name }}</template>
            <el-menu-item
                v-for="i of item.children"
                :key="item.path + '/' + i.path"
                :index="item.path + '/' + i.path"
            >
                <template #title>{{ i.name }}</template>
            </el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>
