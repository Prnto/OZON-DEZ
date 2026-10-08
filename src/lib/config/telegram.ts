/**
 * Telegram Bot Configuration for OZON-DEZ Lead Notification
 * 
 * Instructions for setting up:
 * 1. Create a bot in Telegram by messaging @BotFather:
 *    - Type /newbot and follow instructions to set a name and username.
 *    - Copy the generated API Token and paste it below into `botToken`.
 * 2. Get your Chat ID by messaging @userinfobot (or adding your bot to a group):
 *    - Copy the numeric Id and paste it below into `chatId`.
 * 3. Set `enabled: true`.
 * 4. Start a conversation with your bot (/start) so it has permission to send you messages!
 */

export const TELEGRAM_CONFIG = {
	// Telegram bot token from @BotFather
	botToken: '8923577626:AAHEp-z-pDGHaPf1x4fzi_-gpJTPx3kMl5I',

	// Telegram Chat ID from @userinfobot
	chatId: '341806822',

	// Turn on when token and chatId are set
	enabled: true
};
