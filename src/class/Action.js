/**
 *
 */
export default class Action {
  constructor(userMessage, chat, bot, actions) {
    const { title, cmd, action } = actions;

    this.title = title;
    this.cmd = cmd;
    this.action = action;
    this.messages = document.querySelector('#messages');

    this.runAction(userMessage, chat, bot);
  }

  /**
   *
   * @returns
   */
  getTitle() {
    return this.title;
  }

  /**
   *
   * @returns
   */
  getCommand() {
    return this.cmd;
  }

  /**
   *
   * @param {*} message
   * @param {*} chat
   * @param {*} bot
   */
  async runAction(message, chat, bot) {
    const msg = message.split(' ');
    const command = msg[0];
    const param = msg[1];
    if (this.cmd.includes(command)) {
      const promise = this.action(param);
      const botMessage = {
        name: bot.bot.name,
        msg: ''
      };
      promise.then((value) => {
        botMessage.msg = value;
        this.messages.innerHTML += chat.renderMessage(botMessage);
      }, (error) => {
        botMessage.msg = error;
        this.messages.innerHTML += chat.renderMessage(botMessage);
      });
    }
  }
}
