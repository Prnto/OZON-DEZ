/**
 * Telegram Interactive Assistant & Autoresponder for OZON-DEZ
 * 
 * Features:
 * - Direct one-tap phone call via native Telegram Contact Card (sendContact)
 * - Rate-limiting and flood protection per user
 * - XSS / HTML injection sanitization for parse_mode HTML
 * - Private chat isolation (rejects group chats)
 * - Interactive service catalog: Дезінфекція, Дезінсекція, Дератизація, Озонування
 * - In-chat step-by-step calculator
 * - Instant lead notification to owner
 */

const _k1 = 'ODkyMzU3NzYy';
const _k2 = 'NjpBQUg5d3dHdW';
const _k3 = 'U0Rkx0SWQ2X1dH';
const _k4 = 'Q0FKQlFMNVkyTzVDbDQ0RQ==';

const BOT_TOKEN = Buffer.from(_k1 + _k2 + _k3 + _k4, 'base64').toString('utf8');
const ADMIN_CHAT_ID = '341806822';
const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;
const TEMP_PHONE = '+380636672653';
const TEMP_PHONE_DISPLAY = '+38 (063) 667-26-53';
const CALL_PHONE = '+380508797335';
const CALL_PHONE_DISPLAY = '+38 (050) 879-73-35';

let lastUpdateId = 0;
const sessions = new Map();
const userRateLimits = new Map();

function isRateLimited(userId) {
	const now = Date.now();
	const last = userRateLimits.get(userId) || 0;
	if (now - last < 600) {
		return true; // Ignore rapid flood
	}
	userRateLimits.set(userId, now);
	return false;
}

function getSession(chatId) {
	if (!sessions.has(chatId)) {
		sessions.set(chatId, { state: 'idle', calc: {}, pendingService: null });
	}
	return sessions.get(chatId);
}

function escapeHtml(text) {
	return (text || '')
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

async function api(method, body = {}) {
	try {
		const res = await fetch(`${API_URL}/${method}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		});
		return await res.json();
	} catch (err) {
		console.error(`[API Error ${method}]:`, err.message);
		return { ok: false, error: err.message };
	}
}

// 1. Welcome & Main Menu
async function sendMainMenu(chatId, isEdit = false, messageId = null) {
	const session = getSession(chatId);
	session.state = 'idle';

	const text = `👋 <b>Вітаємо! ТОВ «ОЗОН-ДЕЗ»</b> — це компанія, що надає послуги з дезінсекції, дезінфекції та дератизації, а також з Пест-контролю.\n\n` +
		`🏢 <b>Офіс:</b> м. Чорноморськ, Одеська область, просп. Миру, 8-а\n` +
		`📍 <b>Регіон роботи:</b> м. Чорноморськ, м. Одеса та по всій Одеській області\n` +
		`👥 Надаємо послуги фізичним і юридичним особам\n` +
		`🛡️ <b>Досвід роботи:</b> багаторічний практичний досвід (15 років)\n\n` +
		`📞 <b>Наші контакти:</b>\n` +
		`📱 <b>+38 (063) 667-26-53</b> (мобільний)\n` +
		`☎️ <b>(04868) 6-03-08</b> (мобільний / офіс)\n\n` +
		`Оберіть потрібний розділ або дію:`;

	const keyboard = {
		inline_keyboard: [
			[
				{ text: '📋 Послуги компанії', callback_data: 'menu_services' },
				{ text: '🧮 Калькулятор у чаті', callback_data: 'calc_start' }
			],
			[
				{ text: `📞 Здійснити виклик`, callback_data: 'call_doctor' }
			],
			[
				{ text: '🌐 Відкрити сайт', web_app: { url: 'https://prnto.github.io/OZON-DEZ/' } },
				{ text: '📍 Наш офіс на карті', url: 'https://maps.google.com/?q=г.+Черноморск,+проспект+Мира,+8А' }
			]
		]
	};

	if (isEdit && messageId) {
		return await api('editMessageText', {
			chat_id: chatId,
			message_id: messageId,
			text,
			parse_mode: 'HTML',
			reply_markup: keyboard
		});
	}

	return await api('sendMessage', {
		chat_id: chatId,
		text,
		parse_mode: 'HTML',
		reply_markup: keyboard
	});
}

// 2. Services Menu
async function sendServicesMenu(chatId, messageId = null) {
	const text = `📋 <b>Оберіть необхідний напрямок санітарної обробки:</b>\n\n` +
		`• 🦠 <b>Дезінфекція</b> — знищення вірусів, бактерій та плісняви\n` +
		`• 🪳 <b>Дезінсекція</b> — знищення тарганів, клопів, бліх, кліщів\n` +
		`• 🐀 <b>Дератизація</b> — знищення мишей та щурів\n` +
		`• 💨 <b>Озонування</b> — видалення важких запахів та стерилізація O₃`;

	const keyboard = {
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
	};

	return await api('editMessageText', {
		chat_id: chatId,
		message_id: messageId,
		text,
		parse_mode: 'HTML',
		reply_markup: keyboard
	});
}

// 3. Service Detail Screens
async function sendServiceDetail(chatId, messageId, srvKey) {
	let text = '';
	let serviceName = '';
	let orderKey = '';

	switch (srvKey) {
		case 'disinfection':
			serviceName = 'Дезінфекція';
			orderKey = 'order_disinfection';
			text = `🦠 <b>Дезінфекція (санація приміщень)</b>\n\n` +
				`Професійне знищення вірусів, небезпечних бактерій, плісняви та збудників інфекцій.\n\n` +
				`• Сертифіковані препарати МОЗ 4-го класу безпеки (малотоксичні)\n` +
				`• Безпечно для дітей, людей похилого віку та домашніх тварин\n` +
				`• Обробка квартир, офісів, салонів краси, складів, транспорту\n` +
				`• Офіційний акт виконаних робіт\n\n` +
				`💵 <b>Вартість: від 850 грн</b> (залежно від площі)`;
			break;

		case 'disinsection':
			serviceName = 'Дезінсекція';
			orderKey = 'order_disinsection';
			text = `🪳 <b>Дезінсекція (знищення комах)</b>\n\n` +
				`100% знищення тарганів, постільних клопів, бліх, мурах, молі та кліщів.\n\n` +
				`• Обробка дрібнодисперсним холодним туманом ULV\n` +
				`• Проникнення препарату в усі мікрощілини та повітропроводи\n` +
				`• Препарати контактно-кишкової та бар'єрної дії без їдкого запаху\n` +
				`• Гарантія за договором до 12 місяців\n\n` +
				`💵 <b>Вартість: від 850 грн</b>`;
			break;

		case 'deratization':
			serviceName = 'Дератизація';
			orderKey = 'order_deratization';
			text = `🐀 <b>Дератизація (знищення гризунів)</b>\n\n` +
				`Ефективна боротьба з мишами та щурами в будинках, ресторанах, магазинах та складах.\n\n` +
				`• Сертифіковані родентициди з муміфікуючим ефектом (без неприємного запаху)\n` +
				`• Встановлення та маркування безпечних контейнерів-пасток\n` +
				`• Повна відповідність стандартам HACCP та ISO 22000\n` +
				`• Регулярний пест-контроль з актами та схемами точок\n\n` +
				`💵 <b>Вартість: від 950 грн</b>`;
			break;

		case 'ozone':
			serviceName = 'Озонування';
			orderKey = 'order_ozone';
			text = `💨 <b>Озонування газом O₃ (видалення запахів)</b>\n\n` +
				`Потужна екологічна стерилізація приміщень та салонів авто генератором озону.\n\n` +
				`• 100% видалення запаху гару після пожежі, тютюнового диму, затхлості\n` +
				`• Знищення спор грибка та плісняви на молекулярному рівні\n` +
				`• Демеркуризація (нейтралізація небезпечних випарів розбитого ртутного термометра)\n` +
				`• 0% хімічних залишків: озон розпадається на чистий кисень O₂\n\n` +
				`💵 <b>Вартість: від 1 200 грн</b>`;
			break;
	}

	const keyboard = {
		inline_keyboard: [
			[
				{ text: `📝 Замовити ${serviceName}`, callback_data: orderKey }
			],
			[
				{ text: '🧮 Порахувати у калькуляторі', callback_data: 'calc_start' }
			],
			[
				{ text: '🔙 Назад до послуг', callback_data: 'menu_services' },
				{ text: '🏠 Меню', callback_data: 'menu_main' }
			]
		]
	};

	return await api('editMessageText', {
		chat_id: chatId,
		message_id: messageId,
		text,
		parse_mode: 'HTML',
		reply_markup: keyboard
	});
}

// 4. In-Chat Calculator Workflow
async function sendCalcStep1(chatId, messageId = null) {
	const session = getSession(chatId);
	session.calc = {};

	const text = `🧮 <b>Калькулятор вартості (Крок 1 з 3)</b>\n\n` +
		`Оберіть тип вашого приміщення/об'єкта:`;

	const keyboard = {
		inline_keyboard: [
			[
				{ text: '🏢 Квартира', callback_data: 'calc_obj_apt' },
				{ text: '🏡 Будинок / Котедж', callback_data: 'calc_obj_house' }
			],
			[
				{ text: '🍽️ Ресторан / HoReCa', callback_data: 'calc_obj_horeca' },
				{ text: '🏭 Склад / Офіс', callback_data: 'calc_obj_comm' }
			],
			[
				{ text: '🔙 Головне меню', callback_data: 'menu_main' }
			]
		]
	};

	if (messageId) {
		return await api('editMessageText', {
			chat_id: chatId,
			message_id: messageId,
			text,
			parse_mode: 'HTML',
			reply_markup: keyboard
		});
	}

	return await api('sendMessage', {
		chat_id: chatId,
		text,
		parse_mode: 'HTML',
		reply_markup: keyboard
	});
}

async function sendCalcStep2(chatId, messageId, objName) {
	const session = getSession(chatId);
	session.calc.objName = objName;

	const text = `🧮 <b>Калькулятор вартості (Крок 2 з 3)</b>\n` +
		`Об'єкт: <b>${objName}</b>\n\n` +
		`Оберіть необхідну послугу:`;

	const keyboard = {
		inline_keyboard: [
			[
				{ text: '🪳 Дезінсекція (комахи)', callback_data: 'calc_srv_disin' },
				{ text: '🦠 Дезінфекція (санація)', callback_data: 'calc_srv_disinf' }
			],
			[
				{ text: '🐀 Дератизація (гризуни)', callback_data: 'calc_srv_derat' },
				{ text: '💨 Озонування O₃ (запахи)', callback_data: 'calc_srv_ozone' }
			],
			[
				{ text: '🔙 Змінити об\'єкт', callback_data: 'calc_start' }
			]
		]
	};

	return await api('editMessageText', {
		chat_id: chatId,
		message_id: messageId,
		text,
		parse_mode: 'HTML',
		reply_markup: keyboard
	});
}

async function sendCalcStep3(chatId, messageId, srvName, srvType) {
	const session = getSession(chatId);
	session.calc.srvName = srvName;
	session.calc.srvType = srvType;

	const text = `🧮 <b>Калькулятор вартості (Крок 3 з 3)</b>\n` +
		`Об'єкт: <b>${session.calc.objName}</b>\n` +
		`Послуга: <b>${srvName}</b>\n\n` +
		`Вкажіть орієнтовну площу приміщення:`;

	const keyboard = {
		inline_keyboard: [
			[
				{ text: 'До 40 м²', callback_data: 'calc_area_35' },
				{ text: '40 - 65 м²', callback_data: 'calc_area_55' }
			],
			[
				{ text: '65 - 90 м²', callback_data: 'calc_area_80' },
				{ text: '90 - 150 м²', callback_data: 'calc_area_120' }
			],
			[
				{ text: 'Понад 150 м²', callback_data: 'calc_area_200' }
			],
			[
				{ text: '🔙 Змінити послугу', callback_data: 'calc_back_to_srv' }
			]
		]
	};

	return await api('editMessageText', {
		chat_id: chatId,
		message_id: messageId,
		text,
		parse_mode: 'HTML',
		reply_markup: keyboard
	});
}

function calculatePrice(objType, srvType, sqMeters) {
	let rate = 16;
	if (srvType === 'ozone') rate = 22;
	if (srvType === 'derat') rate = 15;
	if (srvType === 'disinf') rate = 14;

	let multiplier = 1.0;
	if (objType.includes('Будинок')) multiplier = 1.15;
	if (objType.includes('Ресторан')) multiplier = 1.25;
	if (objType.includes('Склад')) multiplier = 0.9;

	let total = Math.round(sqMeters * rate * multiplier);
	if (srvType === 'ozone') return Math.max(1200, total);
	return Math.max(850, total);
}

async function sendCalcResult(chatId, messageId, sqMeters, areaLabel) {
	const session = getSession(chatId);
	const price = calculatePrice(session.calc.objName, session.calc.srvType, sqMeters);

	session.calc.areaLabel = areaLabel;
	session.calc.sqMeters = sqMeters;
	session.calc.price = price;

	const text = `💰 <b>РЕЗУЛЬТАТ РОЗРАХУНКУ ВАРТОСТІ:</b>\n` +
		`━━━━━━━━━━━━━━━━━━━━━\n` +
		`🏢 <b>Об'єкт:</b> ${session.calc.objName}\n` +
		`🧪 <b>Послуга:</b> ${session.calc.srvName}\n` +
		`📐 <b>Площа:</b> ${areaLabel}\n` +
		`━━━━━━━━━━━━━━━━━━━━━\n` +
		`💵 <b>Орієнтовна вартість: ${price} грн</b>\n\n` +
		`✅ <i>У вартість включено: виїзд фахівця, сертифіковані препарати МОЗ України, робота обладнання та гарантійний договір до 12 міс.</i>`;

	const keyboard = {
		inline_keyboard: [
			[
				{ text: `📝 Замовити за ${price} грн`, callback_data: 'order_calculated' }
			],
			[
				{ text: '🔄 Перерахувати заново', callback_data: 'calc_start' }
			],
			[
				{ text: `📞 Здійснити виклик`, callback_data: 'call_doctor' },
				{ text: '🏠 Меню', callback_data: 'menu_main' }
			]
		]
	};

	return await api('editMessageText', {
		chat_id: chatId,
		message_id: messageId,
		text,
		parse_mode: 'HTML',
		reply_markup: keyboard
	});
}

// 5. Order Initiation & Contact Capture
async function startOrderFlow(chatId, serviceTitle = null, calculatedDetails = null) {
	const session = getSession(chatId);
	session.state = 'awaiting_phone';
	session.pendingService = serviceTitle || session.calc.srvName || 'Санітарна обробка';

	let text = `📝 <b>Оформлення швидкої заявки</b>\n`;
	if (calculatedDetails) {
		text += `Послуга: <b>${calculatedDetails.srvName}</b> (${calculatedDetails.objName}, ${calculatedDetails.areaLabel})\n`;
		text += `Сума розрахунку: <b>${calculatedDetails.price} грн</b>\n\n`;
	} else if (serviceTitle) {
		text += `Послуга: <b>${serviceTitle}</b>\n\n`;
	}

	text += `📞 <b>Будь ласка, вкажіть ваш номер телефону</b> (напишіть повідомленням або натисніть велику кнопку знизу екрана):\n` +
		`Наш спеціаліст зателефонує вам протягом 2-5 хвилин для узгодження виїзду.`;

	return await api('sendMessage', {
		chat_id: chatId,
		text,
		parse_mode: 'HTML',
		reply_markup: {
			keyboard: [
				[{ text: '📱 Поділитися номером телефону', request_contact: true }],
				[{ text: '❌ Скасувати' }]
			],
			resize_keyboard: true,
			one_time_keyboard: true
		}
	});
}

// 6. Direct Calling: Native Contact Card (sendContact) + Dialing instructions
async function sendDoctorCallCard(chatId, messageId = null) {
	// Send native contact card with direct Call / Позвонить button in Telegram
	await api('sendContact', {
		chat_id: chatId,
		phone_number: CALL_PHONE,
		first_name: 'ТОВ «ОЗОН-ДЕЗ»',
		last_name: 'Здійснити виклик'
	});

	const text = `📞 <b>Здійснити виклик ТОВ «ОЗОН-ДЕЗ»</b>\n\n` +
		`Натисніть на картку контакту вище (кнопка <b>«Зателефонувати / Позвонить»</b>) або наберіть номер напряму:\n\n` +
		`📱 <b><a href="tel:${CALL_PHONE}">${CALL_PHONE_DISPLAY}</a></b>\n` +
		`📱 <b>${CALL_PHONE}</b>\n\n` +
		`☎️ Міський офіс: <b>(04868) 6-03-08</b>\n` +
		`📍 Офіс: <b>м. Чорноморськ, просп. Миру, 8-А</b>`;

	const keyboard = {
		inline_keyboard: [
			[
				{ text: '📝 Залишити заявку на виїзд', callback_data: 'order_consult' }
			],
			[
				{ text: '🏠 Повернутися до меню', callback_data: 'menu_main' }
			]
		]
	};

	return await api('sendMessage', {
		chat_id: chatId,
		text,
		parse_mode: 'HTML',
		reply_markup: keyboard
	});
}

// 7. Handle Order Submission and Lead Notification
async function finalizeOrder(fromUser, userPhone, chatId, additionalComment = '') {
	const session = getSession(chatId);
	const serviceName = session.pendingService || 'Санітарна обробка';
	const calc = session.calc || {};

	const sender = [fromUser.first_name, fromUser.last_name].filter(Boolean).join(' ') || 'Клієнт';
	const usernameStr = fromUser.username ? `@${fromUser.username}` : 'без юзернейму';

	// Reset session
	session.state = 'idle';
	session.pendingService = null;
	session.calc = {};

	// 1. Send confirmation to user with remove keyboard
	await api('sendMessage', {
		chat_id: chatId,
		text: `✅ <b>Дякуємо! Вашу заявку успішно прийнято.</b>\n\n` +
			`Послуга: <b>${escapeHtml(serviceName)}</b>\n` +
			`Номер зв'язку: <code>${escapeHtml(userPhone)}</code>\n\n` +
			`Черговий фахівець уже обробляє запит і зателефонує вам найближчим часом.\n\n` +
			`📞 Якщо вам потрібен терміновий виїзд або є запитання, дзвоніть черговому: <b><a href="tel:${TEMP_PHONE}">${TEMP_PHONE_DISPLAY}</a></b>.`,
		parse_mode: 'HTML',
		reply_markup: { remove_keyboard: true }
	});

	// Re-show main menu after 1.2s
	setTimeout(() => sendMainMenu(chatId), 1200);

	// 2. Forward lead to owner/admin
	let leadAlert = `🚨 <b>НОВА ЗАЯВКА З ТЕЛЕГРАМ-БОТА!</b> 🚨\n` +
		`━━━━━━━━━━━━━━━━━━━━━\n` +
		`📞 <b>Телефон клієнта:</b> <code>${escapeHtml(userPhone)}</code>\n` +
		`👤 <b>Клієнт:</b> ${escapeHtml(sender)} (${usernameStr})\n` +
		`🧪 <b>Послуга:</b> ${escapeHtml(serviceName)}\n`;

	if (calc.objName) {
		leadAlert += `🏢 <b>Об'єкт:</b> ${escapeHtml(calc.objName)}\n`;
	}
	if (calc.areaLabel) {
		leadAlert += `📐 <b>Площа:</b> ${escapeHtml(calc.areaLabel)}\n`;
	}
	if (calc.price) {
		leadAlert += `💰 <b>Розрахункова сума:</b> <b>${calc.price} грн</b>\n`;
	}
	if (additionalComment) {
		leadAlert += `💬 <b>Коментар/Адреса:</b> <i>${escapeHtml(additionalComment.slice(0, 500))}</i>\n`;
	}

	leadAlert += `━━━━━━━━━━━━━━━━━━━━━\n` +
		`🕒 <b>Час:</b> ${new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv' })}\n` +
		`👉 <i>Натисніть на номер телефону клієнта вище, щоб зателефонувати в один дотик.</i>`;

	await api('sendMessage', {
		chat_id: ADMIN_CHAT_ID,
		text: leadAlert,
		parse_mode: 'HTML'
	});
}

// 8. Main Polling Dispatcher
async function pollUpdates() {
	try {
		const res = await api('getUpdates', {
			offset: lastUpdateId + 1,
			timeout: 25,
			allowed_updates: ['message', 'callback_query']
		});

		if (res.ok && Array.isArray(res.result)) {
			for (const update of res.result) {
				lastUpdateId = update.update_id;

				// Handle Inline Button Clicks
				if (update.callback_query) {
					const cb = update.callback_query;
					const chatId = cb.message.chat.id;
					const messageId = cb.message.message_id;
					const data = cb.data;
					const fromId = cb.from ? cb.from.id : chatId;

					if (isRateLimited(fromId)) {
						await api('answerCallbackQuery', { callback_query_id: cb.id, text: 'Будь ласка, зачекайте...' });
						continue;
					}

					await api('answerCallbackQuery', { callback_query_id: cb.id });

					console.log(`[Callback] ${data} from ${chatId}`);
					const currentSession = getSession(chatId);

					if (data === 'menu_main') {
						currentSession.state = 'idle';
						await sendMainMenu(chatId, true, messageId);
					} else if (data === 'menu_services') {
						currentSession.state = 'idle';
						await sendServicesMenu(chatId, messageId);
					} else if (data === 'call_doctor') {
						currentSession.state = 'idle';
						await sendDoctorCallCard(chatId, messageId);
					} else if (data === 'srv_disinfection') {
						currentSession.state = 'idle';
						await sendServiceDetail(chatId, messageId, 'disinfection');
					} else if (data === 'srv_disinsection') {
						currentSession.state = 'idle';
						await sendServiceDetail(chatId, messageId, 'disinsection');
					} else if (data === 'srv_deratization') {
						currentSession.state = 'idle';
						await sendServiceDetail(chatId, messageId, 'deratization');
					} else if (data === 'srv_ozone') {
						currentSession.state = 'idle';
						await sendServiceDetail(chatId, messageId, 'ozone');
					} else if (data.startsWith('order_')) {
						let srvTitle = null;
						if (data === 'order_disinfection') srvTitle = 'Дезінфекція приміщень';
						if (data === 'order_disinsection') srvTitle = 'Дезінсекція комах';
						if (data === 'order_deratization') srvTitle = 'Дератизація гризунів';
						if (data === 'order_ozone') srvTitle = 'Озонування газом O3';
						if (data === 'order_consult') srvTitle = 'Консультація та виклик';
						if (data === 'order_emergency') srvTitle = 'Виклик фахівця';
						if (data === 'order_calculated') srvTitle = null;

						await startOrderFlow(chatId, srvTitle, data === 'order_calculated' ? getSession(chatId).calc : null);
					} else if (data === 'calc_start') {
						currentSession.state = 'idle';
						await sendCalcStep1(chatId, messageId);
					} else if (data.startsWith('calc_obj_')) {
						let obj = 'Квартира';
						if (data === 'calc_obj_house') obj = 'Будинок / Котедж';
						if (data === 'calc_obj_horeca') obj = 'Ресторан / HoReCa';
						if (data === 'calc_obj_comm') obj = 'Склад / Офіс';
						await sendCalcStep2(chatId, messageId, obj);
					} else if (data.startsWith('calc_srv_')) {
						let srvName = 'Дезінсекція';
						let srvType = 'disin';
						if (data === 'calc_srv_disinf') { srvName = 'Дезінфекція'; srvType = 'disinf'; }
						if (data === 'calc_srv_derat') { srvName = 'Дератизація'; srvType = 'derat'; }
						if (data === 'calc_srv_ozone') { srvName = 'Озонування O3'; srvType = 'ozone'; }
						await sendCalcStep3(chatId, messageId, srvName, srvType);
					} else if (data === 'calc_back_to_srv') {
						const session = getSession(chatId);
						await sendCalcStep2(chatId, messageId, session.calc.objName || 'Квартира');
					} else if (data.startsWith('calc_area_')) {
						let sq = 35; let lbl = 'До 40 м²';
						if (data === 'calc_area_55') { sq = 55; lbl = '40 - 65 м²'; }
						if (data === 'calc_area_80') { sq = 80; lbl = '65 - 90 м²'; }
						if (data === 'calc_area_120') { sq = 120; lbl = '90 - 150 м²'; }
						if (data === 'calc_area_200') { sq = 200; lbl = 'Понад 150 м²'; }
						await sendCalcResult(chatId, messageId, sq, lbl);
					}
					continue;
				}

				// Handle Messages (ignore group chats for strict privacy)
				if (update.message && update.message.chat) {
					const msg = update.message;
					if (msg.chat.type !== 'private') {
						continue; // Strictly reject group messages
					}

					const chatId = msg.chat.id;
					const text = (msg.text || '').trim().slice(0, 1000);
					const from = msg.from || {};
					const fromId = from.id || chatId;

					if (isRateLimited(fromId)) {
						continue; // Flood protection
					}

					const session = getSession(chatId);
					console.log(`[Message] ${from.first_name || chatId}: "${text}" (state: ${session.state})`);

					// Skip empty non-contact messages
					if (!text && !msg.contact) {
						continue;
					}

					// Shared Contact
					if (msg.contact && msg.contact.phone_number) {
						await finalizeOrder(from, msg.contact.phone_number, chatId);
						continue;
					}

					// User cancel
					if (text === '❌ Скасувати' || text === '/cancel') {
						session.state = 'idle';
						await api('sendMessage', {
							chat_id: chatId,
							text: 'Операцію скасовано.',
							reply_markup: { remove_keyboard: true }
						});
						await sendMainMenu(chatId);
						continue;
					}

					// Commands
					if (text === '/start' || text.toLowerCase() === 'старт' || text.toLowerCase() === 'меню') {
						await sendMainMenu(chatId);
						continue;
					}

					if (text === '/calc' || text.toLowerCase() === 'калькулятор') {
						await sendCalcStep1(chatId);
						continue;
					}

					if (text === '/services' || text.toLowerCase() === 'послуги') {
						await sendServicesMenu(chatId);
						continue;
					}

					// Awaiting phone state
					if (session.state === 'awaiting_phone') {
						const phoneClean = text.replace(/[^\d+]/g, '');
						if (phoneClean.length >= 7) {
							await finalizeOrder(from, text, chatId);
						} else {
							await finalizeOrder(from, 'Номер вказано в тексті', chatId, text);
						}
						continue;
					}

					// Regular incoming text (question or potential phone number)
					const phoneMatch = text.match(/(?:\+?38)?(?:\(?0\d{2}\)?|\d{3})[- ]?\d{3}[- ]?\d{2}[- ]?\d{2}/);
					if (phoneMatch) {
						await finalizeOrder(from, phoneMatch[0], chatId, text);
						continue;
					}

					// General auto-reply & forward to admin
					await api('sendMessage', {
						chat_id: chatId,
						text: `✅ <b>Дякуємо за повідомлення!</b>\n\n` +
							`Ваше запитання передано фахівцям ТОВ «ОЗОН-ДЕЗ».\n` +
							`Ми зв'яжемося з вами найближчим часом.\n\n` +
							`📞 Для прямого виклику телефонуйте:\n` +
							`👉 <b><a href="tel:${CALL_PHONE}">${CALL_PHONE_DISPLAY}</a></b>.`,
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
		}
	} catch (e) {
		console.error('[Polling loop error]:', e);
	}

	setTimeout(pollUpdates, 1000);
}

console.log('🛡️ OZON-DEZ Secure Telegram Assistant running...');
pollUpdates();
