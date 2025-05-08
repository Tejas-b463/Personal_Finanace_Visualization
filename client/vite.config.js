import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
    plugins: [
        react(),
        visualizer({
            filename: './dist/stats.html', // Customize the filename of the output
            open: true, // Automatically open the visualization in the browser
            gzipSize: true, // Show gzipped file sizes
            brotliSize: true, // Show Brotli file sizes
        })
    ],
})