<script setup>
import { ref,watch,onMounted,onBeforeUnmount } from 'vue'
import { useChessGame } from './composables/useChessGame.js'
import BoardPanel from './components/BoardPanel.vue'
import BestMoves from './components/BestMoves.vue'
import { createStockfish } from './services/stockfishService.js'
const real=useChessGame(),analysis=useChessGame(),depth=ref(20)
const result=ref({status:'Inicializando Stockfish...',depth:0,lines:[]})
let engine=null
function analyze(){if(analysis.chess.isGameOver()){engine?.stop();result.value={status:'Partida finalizada: não há jogadas para analisar.',depth:0,lines:[]};return}engine?.analyze(analysis.fen.value,Number(depth.value),analysis.chess.turn())}
onMounted(()=>{engine=createStockfish(data=>result.value=data);analyze()})
watch([analysis.fen,depth],analyze)
onBeforeUnmount(()=>engine?.dispose())
</script>
<template><main class="app"><header class="hero"><div class="brand">♟ <span>CHESS <em>AI</em> ASSISTANT</span></div><p>Dois tabuleiros independentes · Estudo e análise inteligente</p></header><div class="layout"><BoardPanel :game="real" title="Partida real" subtitle="Registre manualmente os movimentos da partida."/><BoardPanel :game="analysis" :recommended-move="result.lines[0] ?? null" title="Análise com IA" subtitle="Reproduza posições e explore as melhores jogadas."><div class="depth-setting"><label for="depth">Profundidade de análise</label><select id="depth" v-model.number="depth"><option v-for="n in [8,12,16,20,24,28]" :key="n" :value="n">{{n}}</option></select></div><BestMoves :result="result" :fen="analysis.fen.value" :depth="depth"/></BoardPanel></div><footer>Chess AI Assistant · Análise local com Stockfish · Os tabuleiros não são sincronizados.</footer></main></template>
