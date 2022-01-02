import Action from './Action';

/**
 * Class used for bots
 */
export default class Bot {
  constructor(bot) {
    this.bot = bot;
  }

  /**
   * Returns bot's name
   * 
   * @returns bot.name
   */
  getName() {
    return this.bot.name;
  }

  /**
   * Calls the bot's actions using the Action class
   * Returns the bot's actions
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
