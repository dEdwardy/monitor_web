<script setup>
import { useAppStore } from '@/store'
const store = useAppStore()
const uinfo = store.uninfo
console.error('uinfo', uinfo)
</script>

<template>
    <div class="login">Login {{ uinfo }}<el-button>124</el-button></div>
</template>
