const socket = io();

function sendClick(button) {
  socket.emit('click', button);
}

function sendScroll(dy) {
  socket.emit('scroll', dy);
}

let lastX, lastY;
let touchStartX, touchStartY;
let moved = false;

const touchpad = document.getElementById('touchpad');

touchpad.addEventListener('touchstart', (e) => {
  if (e.touches.length === 1) {
    // Um dedo: registra a posição inicial para move e clique
    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;
    touchStartX = lastX;
    touchStartY = lastY;
    moved = false;
  } else if (e.touches.length === 2) {
    // Dois dedos: registra posição média vertical para scroll
    lastY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
  }
});

touchpad.addEventListener('touchmove', (e) => {
  if (e.touches.length === 1) {
    const x = e.touches[0].clientX;
    const y = e.touches[0].clientY;

    const dx = x - lastX;
    const dy = y - lastY;

    lastX = x;
    lastY = y;

    // Se movimentou mais que 5px, considera que não é clique
    if (!moved && (Math.abs(x - touchStartX) > 5 || Math.abs(y - touchStartY) > 5)) {
      moved = true;
    }

    socket.emit('move', { dx, dy });
  } else if (e.touches.length === 2) {
    const currentY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
    const dy = currentY - lastY;
    lastY = currentY;

    sendScroll(dy);
  }
});

touchpad.addEventListener('touchend', (e) => {
  if (e.touches.length > 0) return; // Ainda tem dedos, não faz clique

  // Só envia clique se não houve movimentação
  if (!moved) {
    const touch = e.changedTouches[0];
    const rect = touchpad.getBoundingClientRect();
    const x = touch.clientX - rect.left;

    if (x < rect.width / 2) {
      sendClick('left');
    } else {
      sendClick('right');
    }
  }
});
