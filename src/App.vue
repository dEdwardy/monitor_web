<script setup lang="ts">
import { ref, reactive } from 'vue'
import zhCn from 'element-plus/lib/locale/lang/zh-CN'
console.log(zhCn)
const locale = ref({
    ...zhCn,
})

const buttonConfig = reactive({
    autoInsertSpace: false,
})
const messageConfig = reactive({
    max: 3,
})
</script>

<template>
    <el-config-provider
        :locale="locale"
        :button="buttonConfig"
        :message="messageConfig"
    >
        <router-view />
    </el-config-provider>
</template>

<style lang="scss">
html,
body,
#app {
    height: 100%;
}
</style>
