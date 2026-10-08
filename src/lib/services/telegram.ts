import { TELEGRAM_CONFIG } from '../config/telegram';

export interface LeadData {
	source: string;
	name?: string;
	phone: string;
	serviceTitle?: string;
	serviceCategory?: string;
	objectType?: string;
	area?: string;
	price?: string;
	extras?: string;
	address?: string;
	comment?: string;
	lang?: 'ua' | 'ru';
}

function escapeHtml(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
}

export async function sendTelegramLead(lead: LeadData): Promise<{ success: boolean; error?: string }> {
	const token =
		(typeof window !== 'undefined' && localStorage.getItem('ozon_tg_token')) ||
		TELEGRAM_CONFIG.botToken;
	const chatId =
		(typeof window !== 'undefined' && localStorage.getItem('ozon_tg_chat_id')) ||
		TELEGRAM_CONFIG.chatId;

	const isEnabled = (TELEGRAM_CONFIG.enabled || Boolean(token && chatId)) && Boolean(token && chatId);

	// If bot is not configured yet, log politely and simulate success to keep visitor UX seamless
	if (!isEnabled || !token || !chatId) {
		console.info(
			'[OZON-DEZ] Заявка зафіксована (Telegram не налаштовано).',
			'\nДані заявки:', lead,
			'\nЩоб отримувати заявки в Telegram, вкажіть botToken та chatId у файлі src/lib/config/telegram.ts'
		);
		return { success: true };
	}

	const now = new Date();
	const formattedDate = now.toLocaleString('uk-UA', {
		timeZone: 'Europe/Kyiv',
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});

	let message = `🚨 <b>НОВА ЗАЯВКА — ТОВ «ОЗОН-ДЕЗ»</b> 🚨\n`;
	message += `━━━━━━━━━━━━━━━━━━━━━\n`;
	message += `📞 <b>Телефон:</b> <code>${escapeHtml(lead.phone)}</code>\n`;
	if (lead.name?.trim()) {
		message += `👤 <b>Ім'я:</b> ${escapeHtml(lead.name.trim())}\n`;
	}
	message += `🏷 <b>Джерело:</b> ${escapeHtml(lead.source)}\n`;

	if (lead.serviceTitle) {
		message += `🧪 <b>Послуга:</b> ${escapeHtml(lead.serviceTitle)}\n`;
	}
	if (lead.serviceCategory) {
		message += `📁 <b>Категорія:</b> ${escapeHtml(lead.serviceCategory)}\n`;
	}
	if (lead.objectType) {
		message += `🏢 <b>Об'єкт:</b> ${escapeHtml(lead.objectType)}\n`;
	}
	if (lead.area) {
		message += `📐 <b>Площа:</b> ${escapeHtml(lead.area)}\n`;
	}
	if (lead.price) {
		message += `💰 <b>Орієнтовна ціна:</b> <b>${escapeHtml(lead.price)}</b>\n`;
	}
	if (lead.extras) {
		message += `➕ <b>Додатково:</b> ${escapeHtml(lead.extras)}\n`;
	}
	if (lead.address?.trim()) {
		message += `📍 <b>Адреса:</b> ${escapeHtml(lead.address.trim())}\n`;
	}
	if (lead.comment?.trim()) {
		message += `💬 <b>Коментар:</b> <i>${escapeHtml(lead.comment.trim())}</i>\n`;
	}

	message += `━━━━━━━━━━━━━━━━━━━━━\n`;
	message += `🕒 <b>Час:</b> ${formattedDate}\n`;
	message += `🌐 <b>Мова сайту:</b> ${(lead.lang || 'ua').toUpperCase()}`;

	try {
		const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				chat_id: chatId,
				text: message,
				parse_mode: 'HTML',
				disable_web_page_preview: true
			})
		});

		const result = await response.json();
		if (!result.ok) {
			console.warn('[OZON-DEZ Telegram API error]:', result.description);
			return { success: false, error: result.description };
		}
		return { success: true };
	} catch (err) {
		console.error('[OZON-DEZ Telegram Network error]:', err);
		return { success: false, error: String(err) };
	}
}
