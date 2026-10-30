<script setup>
import { computed, ref } from 'vue'
const props=defineProps({game:{type:Object,required:true},recommendedMove:{type:Object,default:null}})
const selected=ref(null), dragging=ref(null)
const files='abcdefgh'
const board=computed(()=>{props.game.fen.value;return props.game.chess.board()})
const ranks=computed(()=>props.game.flipped.value?[0,1,2,3,4,5,6,7]:[7,6,5,4,3,2,1,0])
const columns=computed(()=>props.game.flipped.value?[7,6,5,4,3,2,1,0]:[0,1,2,3,4,5,6,7])
const pieces={wk:'♔',wq:'♕',wr:'♖',wb:'♗',wn:'♘',wp:'♙',bk:'♚',bq:'♛',br:'♜',bb:'♝',bn:'♞',bp:'♟'}
const legal=computed(()=>selected.value?props.game.chess.moves({square:selected.value,verbose:true}).map(m=>m.to):[])
const recommendedFrom=computed(()=>props.recommendedMove?.uci?.slice(0,2)??null)
const recommendedTo=computed(()=>props.recommendedMove?.uci?.slice(2,4)??null)
function clickSquare(square){const p=props.game.chess.get(square);if(selected.value===square){selected.value=null;return}if(selected.value && props.game.move(selected.value,square)){selected.value=null;return}selected.value=p?.color===props.game.chess.turn()?square:null}
function drop(square){if(dragging.value)props.game.move(dragging.value,square);dragging.value=null;selected.value=null}
</script>
<template><div class="board" role="grid" aria-label="Tabuleiro de xadrez">
 <template v-for="rank in ranks" :key="rank"><button v-for="col in columns" :key="`${rank}-${col}`" type="button" class="square" :class="{light:(rank+col)%2===1,dark:(rank+col)%2===0,selected:selected===files[col]+(rank+1),legal:legal.includes(files[col]+(rank+1)),last:game.lastMove.value && (game.lastMove.value.from===files[col]+(rank+1)||game.lastMove.value.to===files[col]+(rank+1)), 'recommended-from':recommendedFrom===files[col]+(rank+1), 'recommended-to':recommendedTo===files[col]+(rank+1)}" @click="clickSquare(files[col]+(rank+1))" @dragover.prevent @drop.prevent="drop(files[col]+(rank+1))" :aria-label="files[col]+(rank+1)">
 <span v-if="board[7-rank][col]" class="piece" :class="board[7-rank][col].color==='w'?'white-piece':'black-piece'" :draggable="board[7-rank][col].color===game.chess.turn()" @dragstart="dragging=files[col]+(rank+1)" @dragend="dragging=null">{{pieces[board[7-rank][col].color+board[7-rank][col].type]}}</span><span v-if="col===columns[0]" class="rank-label">{{rank+1}}</span><span v-if="rank===ranks[7]" class="file-label">{{files[col]}}</span>
 </button></template></div></template>
<style>
.square.recommended-from{box-shadow:inset 0 0 0 4px #f3c75f,inset 0 0 0 999px #f3c75f45}.square.recommended-to{box-shadow:inset 0 0 0 4px #5fe0a2,inset 0 0 0 999px #5fe0a245}
</style>
