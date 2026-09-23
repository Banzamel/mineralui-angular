// Runs the Angular CLI with Node's --preserve-symlinks.
//
//   node scripts/ng.mjs test --watch=false
//
// The library is linked from ../angular-pro/dist (file: dependency → junction / symlink). Without the flag, Node
// resolves the link to its real path and loads @angular/* from ../angular-pro/node_modules: two Angular instances
// and NG0203 errors in the Vitest workers. The build has the same setting (preserveSymlinks in angular.json).
import {spawn} from 'node:child_process'
import {createRequire} from 'node:module'

const cli = createRequire(import.meta.url).resolve('@angular/cli/bin/ng.js')
const nodeOptions = [process.env['NODE_OPTIONS'], '--preserve-symlinks'].filter(Boolean).join(' ')

const child = spawn(process.execPath, [cli, ...process.argv.slice(2)], {
    stdio: 'inherit',
    env: {...process.env, NODE_OPTIONS: nodeOptions},
})
child.on('exit', (code, signal) => process.exit(signal ? 1 : (code ?? 1)))
