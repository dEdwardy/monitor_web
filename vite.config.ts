import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import styleImport from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        //设置别名
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    server: {
        port: 8082, //启动端口
        hmr: {
            host: '127.0.0.1',
            port: 8082,
        },
        // 设置 https 代理
        // proxy: {
        //   "/api": {
        //     target: "your https address",
        //     changeOrigin: true,
        //     rewrite: (path: string) => path.replace(/^\/api/, ""),
        //   },
        // },
    },
    plugins: [
        vue(),
        styleImport({
            libs: [
                {
                    libraryName: 'element-plus',
                    esModule: true,
                    resolveStyle: (name) => {
                        return `element-plus/lib/theme-chalk/${name}.css`
                    },
                    ensureStyleFile: true, // 忽略文件是否存在, 导入不存在的CSS文件时防止错误。
                },
            ],
        }),
    ],
})
