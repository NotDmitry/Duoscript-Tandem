/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@mocks': path.resolve(__dirname, 'src/mocks'),
      '@models': path.resolve(__dirname, 'src/shared/models'),
      '@hooks': path.resolve(__dirname, 'src/shared/hooks'),
      '@context': path.resolve(__dirname, 'src/shared/context'),
      '@schemas': path.resolve(__dirname, 'src/shared/schemas'),
      '@shared-types': path.resolve(__dirname, 'src/shared/types'),
      '@utils': path.resolve(__dirname, 'src/shared/utils'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },
  test: {
    setupFiles: ['./vitest-setup.ts'],
    globals: true,
    environment: 'jsdom',
    pool: 'threads',
  },
});
