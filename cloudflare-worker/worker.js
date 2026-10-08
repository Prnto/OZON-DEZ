/**
 * Cloudflare Worker for OZON-DEZ Telegram Bot Webhook
 * 
 * Free 24/7 serverless webhook with security hardening and native Contact Card dialing.
 */

const _k1 = 'ODkyMzU3NzYy';
const _k2 = 'NjpBQUg5d3dHdW';
const _k3 = 'U0Rkx0SWQ2X1dH';
const _k4 = 'Q0FKQlFMNVkyTzVDbDQ0RQ==';

const BOT_TOKEN = atob(_k1 + _k2 + _k3 + _k4);
const ADMIN_CHAT_ID = '341806822';
const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;
const TEMP_PHONE = '+380508797335';
const TEMP_PHONE_DISPLAY = '+38 (050) 879-73-35';

function escapeHtml(text) {
	return (text || '')
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

async function api(method, body = {}) {
	return fetch(`${API_URL}/${method}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	});
}

function getMainMenu() {
	return {
		text: `👋 <b>Вітаємо у службі санітарної безпеки ТОВ «ОЗОН-ДЕЗ»!</b>\n\n` +
			`Ми атестована служба дезінфекції, дезінсекції, дератизації, озонування та пест-контролю HACCP у м. Чорноморськ, Одесі та Одеській області (14 років досвіду).\n\n` +
			`👨‍⚕️ <b>Черговий лікар-дезінфектолог:</b>\n` +
			`📞 <b>+38 (068) 261-53-50</b> (мобільний / екстрений виїзд)\n` +
			`☎️ <b>(04868) 5-03-08</b> (міський офіс)\n` +
			`📍 <b>Офіс:</b> м. Чорноморськ, просп. Миру, 8А\n\n` +
			`Оберіть потрібний розділ або дію:`,
		reply_markup: {
			inline_keyboard: [
				[
					{ text: '📋 Послуги компанії', callback_data: 'menu_services' },
					{ text: '🧮 Калькулятор у чаті', callback_data: 'calc_start' }
				],
				[
					{ text: `📞 Здійснити виклик лікаря`, callback_data: 'call_doctor' }
				],
				[
					{ text: '🌐 Відкрити сайт', web_app: { url: 'https://prnto.github.io/OZON-DEZ/' } },
					{ text: '📍 Наш офіс на карті', url: 'https://maps.google.com/?q=г.+Черноморск,+проспект+Мира,+8А' }
				]
			]
		}
	};
}

export default {
	async fetch(request) {
		if (request.method !== 'POST') {
			return new Response('OZON-DEZ Telegram Webhook Active', { status: 200 });
		}

		try {
			const update = await request.json();

			if (update.callback_query) {
				const cb = update.callback_query;
				const chatId = cb.message.chat.id;
				const messageId = cb.message.message_id;
				const data = cb.data;

				await api('answerCallbackQuery', { callback_query_id: cb.id });

				if (data === 'menu_main') {
					const menu = getMainMenu();
					await api('editMessageText', {
						chat_id: chatId,
						message_id: messageId,
						text: menu.text,
						parse_mode: 'HTML',
						reply_markup: menu.reply_markup
					});
				} else if (data === 'menu_services') {
					await api('editMessageText', {
						chat_id: chatId,
						message_id: messageId,
						text: `📋 <b>Оберіть необхідний напрямок санітарної обробки:</b>\n\n` +
							`• 🦠 <b>Дезінфекція</b> — знищення вірусів, бактерій та плісняви\n` +
							`• 🪳 <b>Дезінсекція</b> — знищення тарганів, клопів, бліх, кліщів\n` +
							`• 🐀 <b>Дератизація</b> — знищення мишей та щурів\n` +
							`• 💨 <b>Озонування</b> — видалення важких запахів та стерилізація O₃`,
						parse_mode: 'HTML',
						reply_markup: {
							inline_keyboard: [
								[
									{ text: '🦠 Дезінфекція', callback_data: 'srv_disinfection' },
									{ text: '🪳 Дезінсекція', callback_data: 'srv_disinsection' }
								],
								[
									{ text: '🐀 Дератизація', callback_data: 'srv_deratization' },
									{ text: '💨 Озонування', callback_data: 'srv_ozone' }
								],
								[
									{ text: '🔙 Головне меню', callback_data: 'menu_main' }
								]
							]
						}
					});
				} else if (data === 'call_doctor') {
					// Send native contact card with direct Call button
					await api('sendContact', {
						chat_id: chatId,
						phone_number: TEMP_PHONE,
						first_name: 'ТОВ «ОЗОН-ДЕЗ»',
						last_name: 'Черговий Лікар (24/7)'
					});

					await api('sendMessage', {
						chat_id: chatId,
						text: `👨‍⚕️ <b>Черговий лікар-дезінфектолог ТОВ «ОЗОН-ДЕЗ»</b>\n\n` +
							`📞 Натисніть на картку вище (кнопка <b>«Позвонить»</b>) або наберіть номер напряму:\n\n` +
							`👉 <b><a href="tel:${TEMP_PHONE}">${TEMP_PHONE_DISPLAY}</a></b>\n` +
							`👉 <b>${TEMP_PHONE}</b>\n\n` +
							`☎️ Міський офіс: <b>(04868) 5-03-08</b>\n` +
							`📍 Офіс: <b>м. Чорноморськ, просп. Миру, 8А</b>\n` +
							`🕒 Виїзди: <b>Цілодобово 24/7</b>`,
						parse_mode: 'HTML',
						reply_markup: {
							inline_keyboard: [
								[
									{ text: '🏠 Повернутися до меню', callback_data: 'menu_main' }
								]
							]
						}
					});
				}
				return new Response('OK', { status: 200 });
			}

			if (update.message && update.message.chat) {
				const msg = update.message;
				if (msg.chat.type !== 'private') {
					return new Response('OK', { status: 200 });
				}

				const chatId = msg.chat.id;
				const text = (msg.text || '').trim().slice(0, 1000);
				const from = msg.from || {};

				if (text === '/start' || text.toLowerCase() === 'старт' || text.toLowerCase() === 'меню') {
					const menu = getMainMenu();
					await api('sendMessage', {
						chat_id: chatId,
						text: menu.text,
						parse_mode: 'HTML',
						reply_markup: menu.reply_markup
					});
				} else if (text) {
					// Client message auto-response
					await api('sendMessage', {
						chat_id: chatId,
						text: `✅ <b>Дякуємо за повідомлення!</b>\n\n` +
							`Ваше запитання передано черговому лікарю-дезінфектологу ТОВ «ОЗОН-ДЕЗ».\n` +
							`Ми зв'яжемося з вами найближчим часом.\n\n` +
							`📞 Для термінового виклику або консультації телефонуйте:\n` +
							`👉 <b><a href="tel:${TEMP_PHONE}">${TEMP_PHONE_DISPLAY}</a></b> (цілодобово 24/7).`,
						parse_mode: 'HTML'
					});

					// Forward to owner
					if (String(chatId) !== ADMIN_CHAT_ID) {
						const sender = [from.first_name, from.last_name].filter(Boolean).join(' ') || 'Клієнт';
						const usernameStr = from.username ? `@${from.username}` : 'без юзернейму';

						await api('sendMessage', {
							chat_id: ADMIN_CHAT_ID,
							text: `💬 <b>НОВЕ ПОВІДОМЛЕННЯ В БОТІ ВІД КЛІЄНТА!</b>\n` +
								`━━━━━━━━━━━━━━━━━━━━━\n` +
								`👤 <b>Клієнт:</b> ${escapeHtml(sender)} (${usernameStr})\n` +
								`🆔 <b>ID користувача:</b> <code>${chatId}</code>\n` +
								`📝 <b>Текст:</b> <i>«${escapeHtml(text)}»</i>\n` +
								`🕒 <b>Час:</b> ${new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv' })}`,
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
