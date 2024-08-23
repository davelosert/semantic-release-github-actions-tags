import { defineConfig } from 'vite';

export default defineConfig({
  
  test: {
    coverage: {
      provider: 'v8',
      include: ['lib/**/*.js'],
      exclude: ['lib/**/*.test.js'],
      // you can include other reporters, but 'json-summary' is required, json is recommended
      reporter: ['text', 'json-summary', 'json'],
    }
  }
});
