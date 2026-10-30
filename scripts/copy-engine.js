import { readdir, mkdir, copyFile } from 'node:fs/promises'
import { resolve, join, basename } from 'node:path'
const root = resolve('node_modules/stockfish')
const dest = resolve('public/engine')
async function walk(dir) { let entries; try { entries = await readdir(dir, {withFileTypes:true}) } catch {return []}; const out=[]; for(const e of entries){const p=join(dir,e.name); if(e.isDirectory()) out.push(...await walk(p)); else out.push(p)} return out }
const files=await walk(root)
const candidates=files.filter(f=>/stockfish.*lite.*single.*\.js$/i.test(basename(f)) && !/worker/i.test(basename(f)))
const preferred=candidates.find(f=>/17\.1/.test(basename(f))) ?? candidates[0]
if(!preferred){ console.warn('Stockfish lite single não encontrado. Arquivos disponíveis:', files.filter(f=>/stockfish.*\.js$/.test(basename(f))).map(basename)); process.exit(0) }
await mkdir(dest,{recursive:true})
const base=basename(preferred)
const prefix=base.replace(/\.js$/,'')
for(const file of files.filter(f=>basename(f).startsWith(prefix) && /\.(js|wasm|nnue)$/.test(f))){await copyFile(file,join(dest,basename(file))); console.log('Motor:',basename(file))}
const wasm=files.find(f=>basename(f)===`${prefix}.wasm`)
if(wasm) await copyFile(wasm,join(dest,'stockfish.wasm'))
await copyFile(preferred,join(dest,'stockfish.js'))
console.log('Stockfish pronto em public/engine/')
