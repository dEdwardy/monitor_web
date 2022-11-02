import hljs from 'highlight.js' // 导入代码高亮文件
import 'highlight.js/styles/a11y-dark.css' // 导入代码高亮样式

export default {
    mounted(el, binding) {
        console.error('binding', binding)
        const blocks = el.querySelectorAll('pre code')
        blocks.forEach((block: any) => {
            console.errpr('block', block)
            hljs.highlightBlock(block)
        })
    },
}
