/**
 * Cloudflare Worker for OZON-DEZ Telegram Bot Webhook
 * 
 * Free 24/7 serverless webhook:
 * 1. Create a free worker on dash.cloudflare.com
 * 2. Paste this code and deploy.
 * 3. Set webhook:
 *    https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://<your-worker>.workers.dev
 */

const _k1 = 'ODkyMzU3NzYy';
const _k2 = 'NjpBQUg5d3dHdW';
const _k3 = 'U0Rkx0SWQ2X1dH';
const _k4 = 'Q0FKQlFMNVkyTzVDbDQ0RQ==';

const BOT_TOKEN = atob(_k1 + _k2 + _k3 + _k4);
const ADMIN_CHAT_ID = '341806822';
const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

function escapeHtml(text) {
	return (text || '')
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
}

async function api(method, body = {}) {
	return fetch(`${API_URL}/${method}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	});
}

export default {
	async fetch(request) {
		if (request.method !== 'POST') {
			return new Response('OZON-DEZ Telegram Webhook Active', { status: 200 });
		}

		try {
			const update = await request.json();
			if (update.message && update.message.chat) {
				const msg = update.message;
				const chatId = msg.chat.id;
				const text = msg.text || '';
				const from = msg.from || {};

				if (text === '/start') {
					await api('sendMessage', {
						chat_id: chatId,
						text: `👋 <b>Вітаємо у службі санітарної безпеки ТОВ «ОЗОН-ДЕЗ»!</b>\n\n` +
							`Ми — атестована служба дезінфекції, дезінсекції, озонування та пест-контролю HACCP у м. Чорноморськ та Одесі (14 років досвіду).\n\n` +
							`👨‍⚕️ <b>Черговий лікар-дезінфектолог на зв'язку 24/7:</b>\n` +
							`📞 <b><a href="tel:+380682615350">+38 (068) 261-53-50</a></b> (мобільний / терміновий виїзд)\n` +
							`☎️ <b>(04868) 5-03-08</b> (міський офіс)\n` +
							`📍 <b>Офіс:</b> м. Чорноморськ, просп. Миру, 8А\n\n` +
							`💬 <i>Напишіть ваше запитання або номер телефону прямо сюди — черговий лікар зв'яжеться з вами протягом 2-5 хвилин!</i>`,
						parse_mode: 'HTML',
						disable_web_page_preview: true,
						reply_markup: {
							inline_keyboard: [
								[
									{ text: '🌐 Відкрити сайт', web_app: { url: 'https://prnto.github.io/OZON-DEZ/' } },
									{ text: '🧮 Онлайн-калькулятор', web_app: { url: 'https://prnto.github.io/OZON-DEZ/calculator' } }
								],
								[
									{ text: '📞 Зателефонувати лікарю (24/7)', url: 'https://t.me/Mr_Pronto' },
									{ text: '📍 Наш офіс на карті', url: 'https://maps.google.com/?q=г.+Черноморск,+проспект+Мира,+8А' }
								]
							]
						}
					});
				} else if (text) {
					// Auto-reply confirmation
					await api('sendMessage', {
						chat_id: chatId,
						text: `✅ <b>Дякуємо за повідомлення!</b>\n\nВаше запитання передано черговому лікарю-дезінфектологу ТОВ «ОЗОН-ДЕЗ».\nМи зв'яжемося з вами найближчим часом.\n\n📞 Для екстреного виклику або консультації: <b>+38 (068) 261-53-50</b> (цілодобово 24/7).`,
						parse_mode: 'HTML'
					});

					// Forward to owner if not sent by owner
					if (String(chatId) !== ADMIN_CHAT_ID) {
						const sender = [from.first_name, from.last_name].filter(Boolean).join(' ') || 'Клієнт';
						const usernameStr = from.username ? `@${from.username}` : 'без юзернейму';

						await api('sendMessage', {
							chat_id: ADMIN_CHAT_ID,
							text: `💬 <b>НОВЕ ПОВІДОМЛЕННЯ В БОТІ ВІД КЛІЄНТА!</b>\n` +
								`━━━━━━━━━━━━━━━━━━━━━\n` +
								`👤 <b>Клієнт:</b> ${escapeHtml(sender)} (${usernameStr})\n` +
								`🆔 <b>ID користувача:</b> <code>${chatId}</code>\n` +
								`📝 <b>Текст повідомлення:</b>\n` +
								`<i>«${escapeHtml(text)}»</i>\n` +
								`━━━━━━━━━━━━━━━━━━━━━\n` +
								`🕒 <b>Час:</b> ${new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv' })}\n` +
								`👉 <i>Відповісти: ${usernameStr !== 'без юзернейму' ? usernameStr : 'натисніть на профіль'}</i>`,
							parse_mode: 'HTML'
						});
					}
				}
			}
		} catch (e) {
			console.error('Webhook error:', e);
		}

		return new Response('OK', { status: 200 });
	}
};
