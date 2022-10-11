<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { getErrorById } from '@/api'
const { params } = useRoute()
const getExceptionDetailById = () => {
    return getErrorById(params.id).then(({ data }) => {
        console.error('data', data)
    })
}

getExceptionDetailById()
</script>

<template>
    <div class="exception-detail"></div>
</template>

<style lang="scss" scoped></style>
