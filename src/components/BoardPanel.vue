<script setup>
import ChessBoard from './ChessBoard.vue'
import MoveHistory from './MoveHistory.vue'
defineProps({game:{type:Object,required:true},title:String,subtitle:String,recommendedMove:{type:Object,default:null}})
</script>
<template><section class="panel"><header class="panel-heading"><h2>{{title}}</h2><p>{{subtitle}}</p></header><ChessBoard :game="game" :recommended-move="recommendedMove"/><div class="turn">{{game.status.value}}</div><div class="controls"><button @click="game.flip()">⇅ Inverter</button><button @click="game.undo()" :disabled="!game.history.value.length">↶ Desfazer</button><button @click="game.reset()">⟳ Reiniciar</button></div><MoveHistory :history="game.history.value"/><slot/></section></template>
