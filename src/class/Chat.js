const io = require('socket.io-client');

const socket = io.connect('http://localhost:3000');

export default class Chat {
  constructor() {
    this.pseudo = '';

    this.userPseudo = document.querySelector('#logIn');
    this.chatContainer = document.querySelector('#chat');
    this.logInContainer = document.querySelector('#logIn');

    this.run();
  }

  /*
  renderUserJoin(element, content) {
    const newElement = document.createElement('div');

    switch (element) {
      case 'newUser':
        newElement.classList.add(element);
    }
  }
  */

  hideLogIn() {
    this.chatContainer.classList.remove('hide');
    this.chatContainer.classList.add('show');
    this.logInContainer.classList.remove('show');
    this.logInContainer.classList.add('hide');
  }

  hasPseudo() {
    const btn = document.querySelector('#logIn button');
    btn.addEventListener('click', () => {
      const btnParent = btn.parentElement;
      if (btnParent && !!btnParent.querySelector('#logIn input').value) {
        this.pseudo = btnParent.querySelector('#logIn input').value;
        if (this.pseudo) {
          socket.emit('pseudo', this.pseudo);
          this.hideLogIn();
        }
      }
    });
  }

  renderUserLogIn() {
    return `
      <div class="inputButton">
        <input type="text" placeholder="Your nickname here">
        <button type="button">Save</button>
      </div>
    `;
  }

  run() {
    this.userPseudo.innerHTML = this.renderUserLogIn();
    this.hasPseudo();
//    socket.on('newUser', (pseudo) => {
//      this.renderUserJoin(element, pseudo);
//    })
  }
}