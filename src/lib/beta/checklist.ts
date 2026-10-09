import hidden from '../i18n/hidden-routes.json';
import type { BetaTab } from './types';

/** Service URL path from hidden-routes config (§ 4.1) */
export const BETA_ROUTE: string = hidden.betaChecklist;

export const BETA_TABS: BetaTab[] = [
	{
		id: 'common',
		title: { uk: 'Спільне', en: 'Common' },
		routes: ['/'],
		checks: [
			{
				id: 'common_1',
				category: { uk: 'Шапка & Меню', en: 'Header & Navigation' },
				text: {
					uk: 'Перевірте навігаційне меню у шапці. Всі посилання мають плавно перемикати сторінки без ривків',
					en: 'Check the header navigation menu. All links must smoothly transition between pages without jarring cuts'
				},
				coverage: 'manual'
			},
			{
				id: 'common_2',
				category: { uk: 'Тема сайту', en: 'Website Theme' },
				text: {
					uk: 'Перемкніть тему (темна/світла). Кольори фону, тексту та карток мають коректно адаптуватися',
					en: 'Toggle site theme (dark/light). Colors of background, text, and cards must adapt correctly'
				},
				coverage: 'manual'
			},
			{
				id: 'common_3',
				category: { uk: 'Мова', en: 'Language' },
				text: {
					uk: 'Перемкніть мову на UA, RU, EN. Тексти мають оновлюватися миттєво без перезавантаження сторінки',
					en: 'Switch language to UA, RU, EN. Texts must update immediately without full page reloading'
				},
				coverage: 'manual'
			},
			{
				id: 'common_4',
				category: { uk: 'Фон сузір’їв', en: 'Constellation Canvas' },
				text: {
					uk: 'Рухайте курсор над сторінкою. Лінії сузір’їв на фоні мають слідувати за курсором і залишатися плавними',
					en: 'Move cursor across the page. Constellation lines in background must follow cursor smoothly'
				},
				coverage: 'manual'
			},
			{
				id: 'common_5',
				category: { uk: 'Плаваючий віджет', en: 'Floating Contact Widget' },
				text: {
					uk: 'Натисніть плаваючу круглу кнопку зв’язку праворуч внизу. Меню швидкого дзвінка, Telegram та Viber має відкритися',
					en: 'Click floating contact button bottom right. Quick call, Telegram, and Viber menu must open'
				},
				coverage: 'manual'
			},
			{
				id: 'common_6',
				category: { uk: 'Форма замовлення', en: 'Order Modal Validation' },
				text: {
					uk: 'Спробуйте надіслати порожню форму заявки в модальному вікні. Вона не мусить відправлятися без номера телефону',
					en: 'Try submitting an empty order modal form. It must not submit without a phone number entered'
				},
				negative: true,
				coverage: 'manual'
			}
		]
	},
	{
		id: 'home',
		title: { uk: 'Головна', en: 'Home Page' },
		routes: ['/'],
		checks: [
			{
				id: 'home_1',
				category: { uk: 'Перший екран', en: 'Hero Section' },
				text: {
					uk: 'Перевірте головний заголовок та бейдж гарантії 100%. Всі шрифти мають бути чіткими та контрастними',
					en: 'Inspect hero heading and 100% guarantee badge. All typography must be crisp and high-contrast'
				},
				coverage: 'manual'
			},
			{
				id: 'home_2',
				category: { uk: 'Калькулятор на головній', en: 'Quick Estimator' },
				text: {
					uk: 'Змініть тип об’єкта або площу в міні-калькуляторі на головній. Попередня вартість має перераховуватися',
					en: 'Change object type or area in the quick estimator. Estimated cost must dynamically update'
				},
				coverage: 'manual'
			},
			{
				id: 'home_3',
				category: { uk: 'Секція відгуків', en: 'Reviews Section' },
				text: {
					uk: 'Перемикайте фільтри відгуків (Всі об’єкти, Квартири, HoReCa). Список має фільтруватися без збоїв',
					en: 'Toggle review filters (All, Apartments, HoReCa). List must filter accordingly without glitches'
				},
				coverage: 'manual'
			},
			{
				id: 'home_4',
				category: { uk: 'Перевірка межі', en: 'Boundary Check' },
				text: {
					uk: 'Перевірте секцію відгуків. Там не мусить бути зайвих видалених кнопок або дублюючих плашок метрик',
					en: 'Check reviews section. There must not be redundant deleted buttons or duplicate metric strips'
				},
				negative: true,
				coverage: 'manual'
			}
		]
	},
	{
		id: 'services',
		title: { uk: 'Послуги', en: 'Services' },
		routes: ['/services'],
		checks: [
			{
				id: 'services_1',
				category: { uk: 'Картки послуг', en: 'Service Cards' },
				text: {
					uk: 'Перевірте 5 карток: Дезінсекція, Дератизація, Дезінфекція, Озонування, Пест-контроль. Картинки WebP мають завантажуватися чітко',
					en: 'Verify 5 cards: Disinsection, Deratization, Disinfection, Ozonation, Pest Control. WebP images must load crisply'
				},
				coverage: 'manual'
			},
			{
				id: 'services_2',
				category: { uk: 'Кнопки виклику', en: 'Call Specialist Buttons' },
				text: {
					uk: 'Натисніть "Викликати спеціаліста" на будь-якій послузі. Модальне вікно має відкритися з обраною послугою в заголовку',
					en: 'Click "Call a specialist" on any service. Modal must open with selected service prepopulated'
				},
				coverage: 'manual'
			},
			{
				id: 'services_3',
				category: { uk: 'Якірна навігація', en: 'Anchor Navigation' },
				text: {
					uk: 'Перейдіть за посиланням з головної картки послуги. Сторінка має автоматично прокрутитися до відповідної картки',
					en: 'Click on a teaser service card link from home page. It must smoothly scroll to the exact service anchor'
				},
				coverage: 'manual'
			},
			{
				id: 'services_4',
				category: { uk: 'Перевірка межі', en: 'Boundary Check' },
				text: {
					uk: 'Закрийте модальне вікно клавішею Escape або кліком по затемненому фону. Форма не мусить відправляти запит',
					en: 'Close modal with Escape or clicking backdrop. It must not trigger accidental submission'
				},
				negative: true,
				coverage: 'manual'
			}
		]
	},
	{
		id: 'b2b',
		title: { uk: 'B2B & HACCP', en: 'B2B & HACCP' },
		routes: ['/b2b'],
		checks: [
			{
				id: 'b2b_1',
				category: { uk: 'HACCP стандарти', en: 'HACCP Compliance' },
				text: {
					uk: 'Перевірте блок санітарної документації для бізнесу: журнали обліку, акти виконаних робіт, сертифікати препаратів',
					en: 'Inspect business sanitary documentation section: logbooks, completion acts, and chemical certificates'
				},
				coverage: 'manual'
			},
			{
				id: 'b2b_2',
				category: { uk: 'Комерційна пропозиція', en: 'Commercial Quote' },
				text: {
					uk: 'Натисніть кнопку отримання комерційної пропозиції. Має відкритися форма для юридичних осіб',
					en: 'Click button to request commercial quote. Order modal for enterprise clients must open'
				},
				coverage: 'manual'
			},
			{
				id: 'b2b_3',
				category: { uk: 'Перевірка межі', en: 'Boundary Check' },
				text: {
					uk: 'Перевірте реквізити та досвід компанії. На сторінці не мусить бути застарілих даних чи відсутніх ліцензійних пунктів',
					en: 'Verify legal details and experience. The page must not contain obsolete data or missing regulatory items'
				},
				negative: true,
				coverage: 'manual'
			}
		]
	},
	{
		id: 'calculator',
		title: { uk: 'Калькулятор', en: 'Calculator' },
		routes: ['/calculator'],
		checks: [
			{
				id: 'calculator_1',
				category: { uk: 'Вибір об’єкта', en: 'Facility Type' },
				text: {
					uk: 'Оберіть тип приміщення (квартира, приватний будинок, кафе, склад). Коефіцієнт складності має змінюватися',
					en: 'Select facility type (apartment, house, cafe, warehouse). Multiplier rate must update'
				},
				coverage: 'manual'
			},
			{
				id: 'calculator_2',
				category: { uk: 'Послуга та площа', en: 'Service & Area' },
				text: {
					uk: 'Введіть площу обробки в м² та оберіть вид послуги. Підсумкова орієнтовна сума має розраховуватися миттєво',
					en: 'Enter area in m² and select service type. Total estimated price must recalculate instantaneously'
				},
				coverage: 'manual'
			},
			{
				id: 'calculator_3',
				category: { uk: 'Граничні значення', en: 'Extreme Area Boundary' },
				text: {
					uk: 'Введіть значення площі 50000 м² або спеціальні символи. Калькулятор не мусить видавати NaN чи ламати верстку',
					en: 'Enter 50000 m² or special characters. Calculator must not produce NaN or break component layout'
				},
				negative: true,
				coverage: 'manual'
			}
		]
	},
	{
		id: 'water',
		title: { uk: 'Вода & Резервуари', en: 'Water & Tanks' },
		routes: ['/water'],
		checks: [
			{
				id: 'water_1',
				category: { uk: 'Санація ємностей', en: 'Water Tank Sanitization' },
				text: {
					uk: 'Перевірте опис дезінфекції накопичувальних ємностей питної води, колодязів та систем водопостачання',
					en: 'Check description of drinking water storage tank, well, and pipeline disinfection'
				},
				coverage: 'manual'
			},
			{
				id: 'water_2',
				category: { uk: 'Бейджі безпеки', en: 'Safety Badges' },
				text: {
					uk: 'Перевірте наявність бейджів ДСанПіН та 100% захисту від біоплівок і бактерій',
					en: 'Verify presence of sanitary standards badges and 100% biofilm protection guarantees'
				},
				coverage: 'manual'
			},
			{
				id: 'water_3',
				category: { uk: 'Перевірка межі', en: 'Boundary Check' },
				text: {
					uk: 'Перевірте фонове зображення розділу. Воно не мусить викликати горизонтального скролу або зміщення контенту на мобільному',
					en: 'Verify section background image. It must not cause horizontal scroll or layout shift on mobile screens'
				},
				negative: true,
				coverage: 'manual'
			}
		]
	},
	{
		id: 'ozone',
		title: { uk: 'Озонування', en: 'Ozonation' },
		routes: ['/ozone'],
		checks: [
			{
				id: 'ozone_1',
				category: { uk: 'Технологія O3', en: 'O3 Technology' },
				text: {
					uk: 'Перевірте блок пояснення технології озонування: дезодорація, знищення спор грибка, вірусів та тютюнового диму',
					en: 'Check ozonation explanation section: deodorization, eradication of fungal spores, viruses, and smoke'
				},
				coverage: 'manual'
			},
			{
				id: 'ozone_2',
				category: { uk: 'Екологічність', en: 'Eco-Friendly Advantage' },
				text: {
					uk: 'Перевірте опис відсутності токсичного хімічного осаду після обробки активним озоном',
					en: 'Inspect description confirming zero toxic chemical residue remaining after active ozone sanitation'
				},
				coverage: 'manual'
			},
			{
				id: 'ozone_3',
				category: { uk: 'Перевірка межі', en: 'Boundary Check' },
				text: {
					uk: 'Перевірте застереження регламенту безпеки. Не мусить бути дозволу на перебування людей чи тварин під час озонування',
					en: 'Check safety warnings. It must not permit people or pets to remain inside during active ozonation'
				},
				negative: true,
				coverage: 'manual'
			}
		]
	},
	{
		id: 'howWeWork',
		title: { uk: 'Як ми працюємо', en: 'How We Work' },
		routes: ['/how-we-work'],
		checks: [
			{
				id: 'howWeWork_1',
				category: { uk: '5 кроків регламенту', en: '5 Process Steps' },
				text: {
					uk: 'Перевірте покроковий регламент: Аудит об’єкта → Підбір препаратів → Обробка ULV/озоном → Контроль якості → Офіційний акт',
					en: 'Verify the 5 steps: Facility Audit → Formula Selection → ULV/Ozone Sanitation → Quality Inspection → Formal Act'
				},
				coverage: 'manual'
			},
			{
				id: 'howWeWork_2',
				category: { uk: 'Гарантійні зобов’язання', en: 'Warranty Terms' },
				text: {
					uk: 'Перевірте опис юридичної гарантії за договором та умов безкоштовного контрольного виїзду',
					en: 'Inspect description of legal contractual warranty and conditions for complimentary follow-up visits'
				},
				coverage: 'manual'
			},
			{
				id: 'howWeWork_3',
				category: { uk: 'Перевірка межі', en: 'Boundary Check' },
				text: {
					uk: 'Перевірте нумерацію кроків на вузьких екранах смартфона. Номери кроків 01-05 не мусять налізати на тексти',
					en: 'Check step numbering on narrow phone screens. Numbers 01-05 must not overlap or truncate titles'
				},
				negative: true,
				coverage: 'manual'
			}
		]
	},
	{
		id: 'contacts',
		title: { uk: 'Контакти', en: 'Contacts' },
		routes: ['/contacts'],
		checks: [
			{
				id: 'contacts_1',
				category: { uk: 'Заголовок сторінки', en: 'Page Title' },
				text: {
					uk: 'Перевірте головний заголовок сторінки контактів. Він має бути лаконічним: «Контакти» (без «розташування офісу»)',
					en: 'Inspect main contacts title. It must be concise: "Contacts" (without obsolete office location phrases)'
				},
				coverage: 'manual'
			},
			{
				id: 'contacts_2',
				category: { uk: 'Телефони та виклик', en: 'Phone Numbers & Call' },
				text: {
					uk: 'Натисніть на номер телефону +38 (063) 667-26-53. Має ініціюватися стандартний виклик у застосунку телефону',
					en: 'Tap on phone number +38 (063) 667-26-53. It must initiate a tel: link in dialer application'
				},
				coverage: 'manual'
			},
			{
				id: 'contacts_3',
				category: { uk: 'Географія виїздів', en: 'Service Geography' },
				text: {
					uk: 'Перевірте картки міст (Чорноморськ, Одеса, Овідіополь, Южне, Білгород-Дністровський) з гербами WebP',
					en: 'Check city cards (Chornomorsk, Odesa, Ovidiopol, Yuzhne, Bilhorod-Dnistrovskyi) with WebP crests'
				},
				coverage: 'manual'
			},
			{
				id: 'contacts_4',
				category: { uk: 'Перевірка межі', en: 'Boundary Check' },
				text: {
					uk: 'Перевірте форму зворотного зв’язку на сторінці контактів. Форма не мусить відправлятися без валідного телефону',
					en: 'Test contact form on the contacts page. It must not submit without a valid phone number'
				},
				negative: true,
				coverage: 'manual'
			}
		]
	}
];
