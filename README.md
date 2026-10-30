# Chess AI Assistant

Aplicação Vue 3 + Vite + chess.js + Stockfish para registrar uma partida e analisar outra posição de forma **totalmente independente**.

## Instalação (Node.js 20+)

```bash
npm install
npm run dev
```

Abra o endereço exibido pelo Vite (normalmente http://localhost:5173).

No Windows PowerShell, caso `npm` seja bloqueado por política de scripts, utilize `npm.cmd install` e `npm.cmd run dev`.

O `postinstall` procura o arquivo **Stockfish lite single-thread** dentro de `node_modules/stockfish` e copia o JS e os arquivos auxiliares para `public/engine/`. Os arquivos do motor não estão incluídos no ZIP: serão instalados pelo npm. Se o motor não carregar, confira se `public/engine/stockfish.js` e o `.wasm` correspondente existem. É necessário servir a aplicação por Vite/HTTP, não abrir `index.html` diretamente.

## Recursos

- Dois tabuleiros independentes, sem sincronização
- Movimentos por clique ou arrastar, validação via chess.js
- Histórico SAN, desfazer, reiniciar, inverter individualmente
- Promoção automática para dama (versão inicial)
- Análise local UCI Stockfish, MultiPV 3, profundidade ajustável
- Sugestões progressivas e avaliação na perspectiva das brancas

## Observações

O motor pode demorar a carregar no primeiro acesso. É necessária uma instalação npm com acesso à internet. O ZIP contém o código-fonte, mas não o binário WebAssembly do Stockfish. O projeto ainda não foi testado em um navegador nesta entrega.
