# MouseRemote 🖱️🐭

O **MouseRemote** é um aplicativo que permite usar o seu celular como mouse para o seu computador ou notebook. Com ele, você pode controlar o cursor, clicar e fazer scroll diretamente pelo seu smartphone, facilitando a navegação sem precisar estar ao lado do computador.

---

## Como funciona?

Você vai rodar um servidor no seu computador que escuta os comandos enviados pelo celular via navegador. Ao acessar o endereço IP do seu computador pelo celular, seu smartphone se transforma em um controle remoto para o mouse.

---

## Como usar

### Pré-requisitos

- Node.js instalado no seu computador (https://nodejs.org/)
- Computador e celular conectados na mesma rede Wi-Fi

### Passo a passo

1. Clone o repositório no seu computador:

   ```bash
   git clone https://github.com/RafaelGLacerda/MouseRemote.git
   cd MouseRemote
   cd server
   npm install express
   node server.js

2. Descubra o IP do seu computador:
Encontre o endereço IPv4 da sua conexão de rede (exemplo: 192.168.0.105).
No terminal do VSCode (ou prompt de comando), digite o comando:
ipconfig


3. No navegador do seu celular, digite o endereço IP com a porta 3000, no formato:
Exemplo: http://192.168.0.105:3000


