<script setup>
import { computed } from 'vue'
import cloneDeep from 'lodash-es/cloneDeep'
const defaultOption = {
    title: {
        text: '',
    },
    tooltip: {
        trigger: 'item',
    },
    legend: {
        orient: 'vertical',
    },
    series: [
        {
            name: 'Exception Type',
            type: 'pie',
            radius: '50%',
            data: [],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
            },
        },
    ],
}
const props = defineProps({
    title: {
        type: String,
        default: 'test',
    },
    name: {
        type: String,
        default: 'test',
    },
    data: {
        type: Array,
        default: () => [
            { name: 'c', value: 2 },
            { name: 'asasfasfaff', value: 22 },
            { name: 'asf', value: 22 },
            { name: 'zss', value: 12 },
        ],
    },
})
const option = computed(() => {
    const ops = cloneDeep(defaultOption)
    ops.title.text = props.title
    ops.series[0].data = props.data
    ops.series[0].name = props.name
    return ops
})
</script>

<template>
    <v-chart :option="option" />
</template>
