import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/assets/styles/__border-radius.module.scss";
          @import "./src/assets/styles/__colors.module.scss";
          @import "./src/assets/styles/__fonts.module.scss";
          @import "./src/assets/styles/__spacers.module.scss";
        `,
      },
    },
  },
  test: { globals: true, environment: 'jsdom', setupFiles: './src/test/setup.js' },
});
