import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://bigskycontinent.tourground.com',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  compressHTML: true,
  prefetch: false,
  devToolbar: { enabled: false },
  image: { responsiveStyles: false },
});
