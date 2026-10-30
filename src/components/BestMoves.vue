<script setup>
import { computed } from 'vue'
import { Chess } from 'chess.js'
const props=defineProps({result:Object,fen:String,depth:Number})
const options=computed(()=>props.result.lines.map(line=>{let san=line.uci;try{const c=new Chess(props.fen);san=c.move({from:line.uci.slice(0,2),to:line.uci.slice(2,4),promotion:line.uci[4]||'q'})?.san||san}catch{}return {...line,san,display:line.scoreType==='mate'?`Mate ${line.score>0?'+':''}${line.score}`:`${line.score>=0?'+':''}${(line.score/100).toFixed(2)}`}}))
const recommended=computed(()=>options.value.find(line=>line.rank===1)??null)
</script>
<template><section class="subpanel"><div class="analysis-header"><h3>♟ Análise Stockfish</h3><label>Profundidade: {{result.depth}} / {{depth}}</label></div><p class="muted">{{result.status}}</p><div v-if="recommended" class="best-recommendation"><span class="recommendation-label">JOGADA RECOMENDADA</span><strong class="recommended-san">{{recommended.san}}</strong><span class="recommended-instruction">No jogo oficial, mova a peça de <strong>{{recommended.uci.slice(0,2)}}</strong> para <strong>{{recommended.uci.slice(2,4)}}</strong>.</span></div><div v-for="line in options" :key="line.rank" class="suggestion" :class="{'suggestion-best':line.rank===1}"><span class="medal">{{['🥇','🥈','🥉'][line.rank-1]}}</span><strong>{{line.san}}</strong><span v-if="line.rank===1" class="best-tag">RECOMENDADA</span><span class="score">{{line.display}}</span></div><p v-if="!options.length" class="muted">As sugestões aparecerão aqui após a análise.</p><small class="muted">Avaliação: positivo favorece as brancas; negativo favorece as pretas.</small></section></template>
<style>
.best-recommendation{display:grid;grid-template-columns:auto 1fr;align-items:center;gap:4px 12px;background:#203d39;border:1px solid #4f9d79;border-left:5px solid #66d6a5;border-radius:8px;padding:12px;margin:12px 0}.recommendation-label{grid-column:1/-1;color:#8ce5bb;font-size:11px;font-weight:800}.recommended-san{font-size:22px;color:#fff}.recommended-instruction{font-size:13px;color:#d4e7df}.suggestion-best{border:1px solid #538d73}.best-tag{color:#8ce5bb;font-size:10px;font-weight:800}
</style>
