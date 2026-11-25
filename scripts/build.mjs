import { build } from 'esbuild'
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const root = new URL('../', import.meta.url)
const result = await build({
    absWorkingDir: fileURLToPath(root),
    entryPoints: ['renderer/main.tsx'],
    outfile: 'ptc-link.js',
    bundle: true,
    write: false,
    minify: true,
    charset: 'utf8',
    target: 'safari15.4',
    define: { 'process.env.NODE_ENV': '"production"' },
    legalComments: 'inline',
})

const js = result.outputFiles.find(file => file.path.endsWith('.js')).text
const css = result.outputFiles.find(file => file.path.endsWith('.css')).text
const licenses = await Promise.all([
    'LICENSE.greenlight',
    'node_modules/react/LICENSE',
    'node_modules/react-dom/LICENSE',
    'node_modules/scheduler/LICENSE',
].map(async path => path + '\n' + await readFile(new URL(path, root), 'utf8')))

const html = `<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#1a1b1e">
    <title>PTC-link · Aperçu Greenlight</title>
    <style>${css}</style>
</head>
<body>
    <div id="root"></div>
    <noscript>Active JavaScript pour utiliser cet aperçu interactif.</noscript>
    <script>${js}</script>
    <script type="text/plain" id="licenses">${licenses.join('\n\n')}</script>
</body>
</html>
`

await writeFile(new URL('index.html', root), html)
