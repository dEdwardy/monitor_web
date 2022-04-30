<script setup>
import { ref, computed, toRaw, watch } from 'vue'
import { useAppStore } from '@/store'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

const { menu } = storeToRefs(useAppStore())
// const uinfo = computed(() => useAppStore().uinfo)
// const menuAsideRef = ref()
const currentTop = ref('')
const menuTop = computed(() => {
    const data = menu.value.map((i) => {
        return {
            id: i.id,
            name: i.name,
            route: i.route,
        }
    })
    return [{ id: '000', name: '首页', route: '' }, ...data]
})
// const route = useRoute()
// const currentPath = computed(() => route.path)
// const currentAside = ref('')
// const menuAsideArr = computed(() => {
//     const item = menu.value.filter((i) => {
//         return toRaw(i).route === toRaw(currentTop.value)
//     })
//     return item[0] ? item[0]?.children : []
// })
</script>
<template>
    <div class="e-layout">
        <el-container>
            <el-header>
                <!-- <EMenu
                    v-model:value="currentTop"
                    :menu="menuTop"
                    mode="horizontal"
                /> -->
            </el-header>
            <el-container>
                <el-aside width="200px">Aside</el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
