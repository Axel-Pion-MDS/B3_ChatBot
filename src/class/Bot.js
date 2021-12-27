import Action from './Action';

/**
 *
 */
export default class Bot {
  constructor(bot) {
    this.bot = bot;
  }

  /**
   *
   * @returns bot.name
   */
  getName() {
    return this.bot.name;
  }

  /**
   *
   * @param {*} Chat
   * @param {*} userMessage
   * @returns bot.actions
   */
  getActions(Chat, userMessage) {
    this.bot.actions.map((action) => new Action(userMessage, Chat, this, action));
    return this.bot.actions;
  }
}
