<script setup lang="ts">
import { watchEffect, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()
const active = ref<string>('')
const handleSelect = (name: string) => {
    router.push({ name })
}
const handleChangeLang = () => {
    const current = localStorage.getItem('locale') ?? 'zh-CN'
    const lang = current === 'zh_CN' ? 'en_US' : 'zh_CN'
    localStorage.setItem('locale', lang)
    locale.value = lang
}
watchEffect(() => {
    active.value = route.path.slice(1)
})
</script>
<template>
    <div class="e-layout">
        <el-container>
            <el-header class="header">
                <span class="app_name"> Fe_Monitor</span>
                <div class="info">
                    <div class="lang">
                        <el-popover
                            placement="bottom"
                            :width="200"
                            trigger="hover"
                            content="this is content, this is content, this is content"
                        >
                            <el-button type="text" @click="handleChangeLang">
                                {{ locale === 'zh_CN' ? 'English' : '中文' }}
                            </el-button>
                            <template #reference>
                                <el-icon :size="20">
                                    <SvgIcon icon-class="lang"></SvgIcon>
                                </el-icon>
                            </template>
                        </el-popover>
                    </div>
                    <div>Admin</div>
                </div>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu
                        active-text-color="#ffd04b"
                        background-color="#545c64"
                        class="aside-menu"
                        :default-active="active"
                        text-color="#fff"
                        @select="handleSelect"
                    >
                        <el-menu-item index="user-manage">
                            <el-icon>
                                <SvgIcon icon-class="user-manage" />
                            </el-icon>
                            <span>用户管理</span>
                        </el-menu-item>
                        <el-menu-item index="project-manage">
                            <el-icon>
                                <SvgIcon icon-class="project-manage" />
                            </el-icon>
                            <span>项目管理</span>
                        </el-menu-item>
                        <el-menu-item index="error-monitor">
                            <el-icon>
                                <SvgIcon icon-class="error-monitor" />
                            </el-icon>
                            <span>异常监控</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main class="main">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style lang="scss" scoped>
.e-layout {
    height: 100%;

    .header {
        height: 60px;
        line-height: 60px;
        display: flex;
        justify-content: space-between;
        .app_name {
            font-size: 16px;
            font-style: italic;
        }
        .info {
            display: flex;
            align-items: center;

            .lang {
                cursor: pointer;
                padding: 0 10px;
            }
        }
    }

    .aside-menu {
        height: 100%;
        border-right: 0 !important;
    }

    .main {
        background-color: rgba(0, 0, 0, 0.1);
        height: calc(100vh - 60px);
        overflow-y: auto;
    }
}
</style>
