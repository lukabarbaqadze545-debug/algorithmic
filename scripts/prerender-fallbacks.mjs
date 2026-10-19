// Static hosts without rewrite rules (e.g. GitHub Pages) serve 404.html for unknown paths.
// Copying the SPA shell lets deep links like /books/xyz resolve client-side.
import { copyFileSync } from 'node:fs'
copyFileSync('dist/index.html', 'dist/404.html')
console.log('dist/404.html created from index.html')
