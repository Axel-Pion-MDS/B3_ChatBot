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

  renderMessageForOtherUsers(pseudo, message) {
    const userMessageDiv = document.createElement('div');
    const messageBody = document.createElement('div');
    const messageTitle = document.createElement('h4');
    const userMessage = document.createElement('p');
    const messageDate = document.createElement('small');
    const date = new Date().toLocaleString();

    userMessageDiv.className = 'message';
    userMessageDiv.id = 'other';
    messageBody.className = 'messageBody';
    messageTitle.innerHTML = pseudo;
    userMessage.innerHTML = message;
    messageDate.innerHTML = date;

    this.messages.appendChild(userMessageDiv);
    userMessageDiv.appendChild(messageTitle);
    userMessageDiv.appendChild(messageBody);
    userMessageDiv.appendChild(messageDate);
    messageBody.appendChild(userMessage);
  }

  renderUserMessage(message) {
    const userMessageDiv = document.createElement('div');
    const messageBody = document.createElement('div');
    const messageTitle = document.createElement('h4');
    const userMessage = document.createElement('p');
    const messageDate = document.createElement('small');
    const date = new Date().toLocaleString();

    userMessageDiv.className = 'message';
    userMessageDiv.id = 'you';
    messageBody.className = 'messageBody';
    messageTitle.innerHTML = 'You';
    userMessage.innerHTML = message;
    messageDate.innerHTML = date;

    this.messages.appendChild(userMessageDiv);
    userMessageDiv.appendChild(messageTitle);
    userMessageDiv.appendChild(messageBody);
    userMessageDiv.appendChild(messageDate);
    messageBody.appendChild(userMessage);

    socket.emit('typingMessage', message);
  }

  typingMessage() {
    const el = document.querySelector('#messageInput input');
    const btn = document.querySelector('#messageInput button');
    const contentMessageEl = document.querySelector('#messages');

    el.addEventListener('keypress', (e) => {
      if (e.keyCode === 13 && !!e.currentTarget.value) {
        const message = e.currentTarget.value;
        e.currentTarget.value = '';
        this.renderUserMessage(message)
        // (() => new Message(message))();
        //
        // this.contacts.map((contact) => contact.getActions(this, message));
        //
        // contentMessageEl.innerHTML += this.renderTypedMessage(message);
      }
    });
    btn.addEventListener('click', (e) => {
      const btnParent = btn.parentElement;
      if (btnParent && !!btnParent.querySelector('#messageInput input').value) {
        const message = btnParent.querySelector('#messageInput input').value;
        e.currentTarget.value = '';
        this.renderUserMessage(message)
        // (() => new Message(message))();
        //
        // this.contacts.map((contact) => contact.getActions(this, message));
        //
        // contentMessageEl.innerHTML += this.renderTypedMessage(message);
      }
    });
  }

  removeUserInList(pseudo) {
    const userInListToDelete = document.getElementById(`userInList_${pseudo}`);

    this.contacts.removeChild(userInListToDelete);
  }

  renderUserLeave(pseudo) {
    const date = new Date().toLocaleString();
    const newUserJoin = document.createElement('div');
    const newUserJoinBody = document.createElement('div');
    const newUserJoinBodyP = document.createElement('p');
    const newUserJoinDate = document.createElement('small');

    newUserJoin.className = 'leaveMessage';
    newUserJoin.id = 'leaveMessage';
    newUserJoinBody.className = 'messageBody';
    newUserJoinBodyP.innerHTML = `${pseudo} has left the channel`;
    newUserJoinDate.innerHTML = `${date}`;

    this.messages.appendChild(newUserJoin);
    newUserJoin.appendChild(newUserJoinBody);
    newUserJoinBody.appendChild(newUserJoinBodyP);
    newUserJoin.appendChild(newUserJoinDate);
  }

  renderNewUserInList(pseudo) {
    const newUserInList = document.createElement('li');

    newUserInList.innerHTML = `${pseudo}`;
    newUserInList.id = `userInList_${pseudo}`;
    newUserInList.className = 'user';

    this.contacts.appendChild(newUserInList);
  }

  renderUserJoin(pseudo) {
    const date = new Date().toLocaleString();
    const newUserJoin = document.createElement('div');
    const newUserJoinBody = document.createElement('div');
    const newUserJoinBodyP = document.createElement('p');
    const newUserJoinDate = document.createElement('small');

    newUserJoin.className = 'joinMessage';
    newUserJoin.id = 'joinMessage';
    newUserJoinBody.className = 'messageBody';
    newUserJoinBodyP.innerHTML = `${pseudo} has joined the channel`;
    newUserJoinDate.innerHTML = `${date}`;

    this.messages.appendChild(newUserJoin);
    newUserJoin.appendChild(newUserJoinBody);
    newUserJoinBody.appendChild(newUserJoinBodyP);
    newUserJoin.appendChild(newUserJoinDate);
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

    socket.on('userJoin', (pseudo) => {
      this.renderUserJoin(pseudo);
      this.renderNewUserInList(pseudo);
    });

    socket.on('userLeave', (pseudo) => {
      this.renderUserLeave(pseudo);
      this.removeUserInList(pseudo);
    });

    socket.on('messageForOtherUsers', (pseudo, message) => {
      this.renderMessageForOtherUsers(pseudo, message);
    });

    this.typingMessage();
  }
}
