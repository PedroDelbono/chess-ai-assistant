import { ref, computed } from 'vue'
import { Chess } from 'chess.js'
export function useChessGame(){
 const chess=new Chess(); const fen=ref(chess.fen()); const history=ref([]); const flipped=ref(false); const lastMove=ref(null)
 function sync(){fen.value=chess.fen();history.value=chess.history({verbose:true});lastMove.value=history.value.at(-1)??null}
 function move(from,to,promotion='q'){try{const result=chess.move({from,to,promotion});if(result){sync();return true}}catch{}return false}
 function undo(){chess.undo();sync()}
 function reset(){chess.reset();sync()}
 const turn=computed(()=>chess.turn()==='w'?'Brancas':'Pretas')
 const status=computed(()=>chess.isCheckmate()?'Xeque-mate':chess.isStalemate()?'Afogamento':chess.isDraw()?'Empate':chess.isCheck()?'Xeque':`Vez: ${turn.value}`)
 return {chess,fen,history,flipped,lastMove,move,undo,reset,turn,status,flip:()=>flipped.value=!flipped.value}
}
