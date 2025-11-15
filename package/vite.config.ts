import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: './src/timeline.ts',
      name: 'LitTimeline',
      fileName: (format) => `timeline.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      output: {
        // 确保样式和资源正确输出
        assetFileNames: 'timeline.[ext]'
      }
    }
  }
});

