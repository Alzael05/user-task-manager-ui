import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input:
    'http://localhost:3000/api/openapi-yaml',
  output: {
    path: './src/api/generated',
    postProcess: ['prettier', 'eslint'],
  },
  plugins: [
    '@hey-api/schemas',
    {
      dates: true,
      name: '@hey-api/transformers',
    },
    {
      enums: 'javascript',
      name: '@hey-api/typescript',
    },
    {
      name: '@hey-api/sdk',
      transformer: true,
    },
  ],
});
