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
	// Paste your bot token here (e.g. '1234567890:ABCdefGhIJKlmNoPQRsTuVwXyZ')
	botToken: '',

	// Paste your chat ID or group chat ID here (e.g. '987654321' or '-1001234567890')
	chatId: '',

	// Turn on when token and chatId are set
	enabled: false
};
