/**
 * Class used for bots actions
 */
export default class Action {
  constructor(userMessage, chat, bot, actions) {
    const { title, cmd, action } = actions;

    this.title = title;
    this.cmd = cmd;
    this.action = action;

    this.runAction(userMessage, chat, bot);
  }

  /**
   * Returns the action's title
   * 
   * @returns
   */
  getTitle() {
    return this.title;
  }

  /**
   * Returns the action's command
   * 
   * @returns
   */
  getCommand() {
    return this.cmd;
  }

  /**
   * Gets the argument when calling an action in chat
   * Calls the renderBotMessage of the Chat class to renders the answer of the called action
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
        chat.renderBotMessage(botMessage);
      }, (error) => {
        botMessage.msg = error;
        chat.renderBotMessage(botMessage);
      });
    }
  }
}
