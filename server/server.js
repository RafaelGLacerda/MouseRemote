const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const { execFile } = require('child_process'); // ← melhor que exec para arquivos .exe

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Caminho absoluto do nircmd
const nircmdPath = path.join(__dirname, 'tools', 'nircmd.exe');

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../client')));

// Funções para ações do mouse
function clickMouse(button = 'left') {
  const cmdArgs = ['sendmouse', button, 'click'];
  execFile(nircmdPath, cmdArgs, (error) => {
    if (error) console.error(`Erro ao clicar: ${error.message}`);
  });
}
function scrollMouse(amount) {
  const cmdArgs = ['sendmouse', 'wheel', amount.toString()];
  execFile(nircmdPath, cmdArgs, (error) => {
    if (error) console.error(`Erro ao scrollar: ${error.message}`);
  });
}


function moveMouseRelative(dx, dy) {
  const cmdArgs = ['movecursor', `${dx}`, `${dy}`];
  execFile(nircmdPath, cmdArgs, (error) => {
    if (error) console.error(`Erro ao mover: ${error.message}`);
  });
}

// Comunicação com o cliente
io.on('connection', (socket) => {
  console.log('📲 Cliente conectado');

  socket.on('click', (button) => {
    console.log(`🖱️ Clique: ${button}`);
    clickMouse(button);
  });

socket.on('scroll', (amount) => {
  console.log(`📜 Scroll: ${amount}`);
  scrollMouse(amount);
});

  socket.on('move', ({ dx, dy }) => {
    console.log(`➡️ Mover mouse: dx=${dx}, dy=${dy}`);
    moveMouseRelative(dx, dy);
  });
});

// Escutar em todas interfaces (pra funcionar no celular)
const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🖱️ Servidor rodando em: http://localhost:${PORT}`);
});
