const io = require('socket.io-client');

const socket = io.connect('http://localhost:3000');

export default class Chat {
  constructor() {
    this.pseudo = '';

    this.userPseudo = document.querySelector('#logIn');
    this.chatContainer = document.querySelector('#chat');
    this.logInContainer = document.querySelector('#logIn');
    this.contacts = document.querySelector('#userList ul');
    this.messages = document.querySelector('#messages');

    this.run();
  }

  renderUserLeave(pseudo) {
    const date = new Date().toLocaleString();

    return `
      <div class="leaveMessage" id="leaveMessage">
        <div class="messageBody">
          <p>${pseudo} has left the channel</p>
        </div>
        <small>${date}</small>
      </div>
    `;
  }

  renderNewUserInList(pseudo) {
    const newUserInList = document.createElement('li');
    newUserInList.innerHTML = `${pseudo}`;
    newUserInList.className = 'user';
    this.contacts.appendChild(newUserInList);
  }

  renderUserJoin(pseudo) {
    const date = new Date().toLocaleString();

    return `
      <div class="joinMessage" id="joinMessage">
        <div class="messageBody">
          <p>${pseudo} has joined the channel</p>
        </div>
        <small>${date}</small>
      </div>
    `;
  }

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

    socket.on('newUser', (pseudo) => {
      this.messages.innerHTML = this.renderUserJoin(pseudo);
      this.renderNewUserInList(pseudo);
    });

    socket.on('userLeave', (pseudo) => {
      this.messages.innerHTML = this.renderUserLeave(pseudo);
    });
  }
}
