<script lang="ts">
	import { langState } from '../state/language.svelte';
	import { orderModal } from '../state/modal.svelte';

	let activeFilter = $state('all');

	const reviewsData = {
		ua: {
			badge: 'Довіра та репутація',
			title: 'Реальні відгуки та виконані санітарні кейси',
			subtitle: 'Понад 380 успішно знезаражених об’єктів у Чорноморську, Одесі та області: від затишних квартир до великих елеваторів і ресторанів.',
			scoreBadge: '4.9 з 5',
			scoreNote: 'середня оцінка на основі 380+ обробок',
			guaranteeTitle: '100% юридична гарантія за договором',
			filterAll: 'Всі об’єкти',
			filterB2C: 'Квартири та будинки',
			filterHaccp: 'HoReCa & Бізнес',
			filterAgro: 'Агросектор & Вода',
			leaveReviewBtn: 'Замовити обробку з гарантією',
			verifiedBadge: 'Перевірений клієнт',
			items: [
				{
					id: 1,
					category: 'haccp',
					author: 'Олег Васильович',
					role: 'Керуючий мережі ресторанів «Чорноморська Рів’єра»',
					city: 'м. Чорноморськ',
					service: 'Пест-контроль за нормами HACCP (КВЕД 81.29)',
					text: 'Працюємо з ТОВ «ОЗОН-ДЕЗ» за річним договором. Планові нічні обробки залу та кухні без їдкого хімічного запаху. Планову перевірку Держпродспоживслужби пройшли з першого разу — всі акти, карти розташування пасток і сертифікати надані в повному обсязі.',
					rating: 5,
					date: 'Вересень 2026',
					icon: '🍽️'
				},
				{
					id: 2,
					category: 'b2c',
					author: 'Олена Ковальчук',
					role: 'Власниця квартири, просп. Миру',
					city: 'м. Чорноморськ',
					service: 'Знищення тарганів холодним туманом',
					text: 'Боролися з тарганами понад півроку побутовими балончиками — нічого не допомагало. Майстер ОЗОН-ДЕЗ приїхав у день дзвінка, провів обробку за 40 хвилин. Комахи зникли повністю на наступний день. Приємно вразило, що немає запаху і безпечно для нашого кота.',
					rating: 5,
					date: 'Серпень 2026',
					icon: '🏢'
				},
				{
					id: 3,
					category: 'agro',
					author: 'Сергій Миколайович',
					role: 'Головний технолог елеватора',
					city: 'Одеська область',
					service: 'Фумігація силосів та зерна пшениці (КВЕД 01.61)',
					text: 'Необхідно було терміново провести газацію 8 500 тонн продовольчого зерна перед завантаженням на судно в порту. Бригада ОЗОН-ДЕЗ спрацювала бездоганно: герметизація, введення фосфіду алюмінію, експозиція та дегазація. Фітосанітарний сертифікат отримано без затримок.',
					rating: 5,
					date: 'Липень 2026',
					icon: '🌾'
				},
				{
					id: 4,
					category: 'b2c',
					author: 'Андрій Пономаренко',
					role: 'Власник котеджу',
					city: 'с. Молодіжне, Одеська обл.',
					service: 'Озонування приміщення після пожежі в гаражі',
					text: 'Запах гару та чаду в’ївся в меблі та стіни всього першого поверху. Озонування промисловим апаратом ОЗОН-ДЕЗ за 5 годин повністю розщепило кіптяву на молекулярному рівні. Запаху диму немає взагалі, повітря свіже та чисте.',
					rating: 5,
					date: 'Серпень 2026',
					icon: '💨'
				},
				{
					id: 5,
					category: 'agro',
					author: 'Ірина Данилівна',
					role: 'Адміністратор готельного комплексу',
					city: 'смт Затока / Грибівка',
					service: 'Санація та дезінфекція резервуарів води (КВЕД 36.00)',
					text: 'Перед відкриттям сезону замовили промивку накопичувальних резервуарів питної води на 15 м³. Видалили весь наліт та мул, провели антимікробну обробку. Лабораторний аналіз води після обробки показав абсолютну безпеку.',
					rating: 5,
					date: 'Червень 2026',
					icon: '💧'
				},
				{
					id: 6,
					category: 'b2c',
					author: 'Михайло С.',
					role: 'Мешканець, вул. Данченка',
					city: 'м. Чорноморськ',
					service: 'Знищення постільних клопів з гарантією',
					text: 'Дуже вдячний за конфіденційність та професіоналізм. Майстер приїхав у цивільному одязі, все пояснив, обробив дивани та щілини. Після першого ж сеансу укуси припинилися. Дякую за спокійний сон нашої родини!',
					rating: 5,
					date: 'Травень 2026',
					icon: '🛏️'
				}
			]
		},
		ru: {
			badge: 'Доверие и репутация',
			title: 'Реальные отзывы и выполненные санитарные кейсы',
			subtitle: 'Более 380 успешно обеззараженных объектов в Черноморске, Одессе и области: от квартир до крупных зерновых терминалов и ресторанов.',
			scoreBadge: '4.9 из 5',
			scoreNote: 'средняя оценка на основе 380+ обработок',
			guaranteeTitle: '100% юридическая гарантия по договору',
			filterAll: 'Все объекты',
			filterB2C: 'Квартиры и дома',
			filterHaccp: 'HoReCa & Бизнес',
			filterAgro: 'Агросектор & Вода',
			leaveReviewBtn: 'Заказать обработку с гарантией',
			verifiedBadge: 'Проверенный клиент',
			items: [
				{
					id: 1,
					category: 'haccp',
					author: 'Олег Васильевич',
					role: 'Управляющий сети ресторанов «Черноморская Ривьера»',
					city: 'г. Черноморск',
					service: 'Пест-контроль по стандартам HACCP (КВЭД 81.29)',
					text: 'Работаем с ООО «ОЗОН-ДЕЗ» по годовому договору. Плановые ночные обработки зала и кухни без едкого запаха. Плановую проверку Госпродпотребслужбы прошли с первого раза — все акты, карты расстановки ловушек и сертификаты предоставлены в полном объеме.',
					rating: 5,
					date: 'Сентябрь 2026',
					icon: '🍽️'
				},
				{
					id: 2,
					category: 'b2c',
					author: 'Елена Ковальчук',
					role: 'Владелица квартиры, просп. Мира',
					city: 'г. Черноморск',
					service: 'Уничтожение тараканов холодным туманом',
					text: 'Боролись с тараканами более полугода бытовыми баллончиками — ничего не помогало. Мастер ОЗОН-ДЕЗ приехал в день звонка, провел обработку за 40 минут. Насекомые исчезли полностью на следующий день. Приятно удивило, что нет запаха и безопасно для кота.',
					rating: 5,
					date: 'Август 2026',
					icon: '🏢'
				},
				{
					id: 3,
					category: 'agro',
					author: 'Сергей Николаевич',
					role: 'Главный технолог элеватора',
					city: 'Одесская область',
					service: 'Фумигация силосов и зерна пшеницы (КВЭД 01.61)',
					text: 'Необходимо было срочно провести газацию 8 500 тонн продовольственного зерна перед погрузкой на судно в порту. Бригада ОЗОН-ДЕЗ сработала безупречно: герметизация, введение фосфида алюминия, дегазация. Фитосанитарный сертификат получен без задержек.',
					rating: 5,
					date: 'Июль 2026',
					icon: '🌾'
				},
				{
					id: 4,
					category: 'b2c',
					author: 'Андрей Пономаренко',
					role: 'Владелец коттеджа',
					city: 'с. Молодежное, Одесская обл.',
					service: 'Озонирование помещения после пожара в гараже',
					text: 'Запах гари въелся в мебель и стены всего первого этажа. Озонирование промышленным аппаратом ОЗОН-ДЕЗ за 5 часов полностью расщепило копоть на молекулярном уровне. Запаха дыма нет вообще, воздух чистый и свежий.',
					rating: 5,
					date: 'Август 2026',
					icon: '💨'
				},
				{
					id: 5,
					category: 'agro',
					author: 'Ирина Даниловна',
					role: 'Администратор отельного комплекса',
					city: 'пгт Затока / Грибовка',
					service: 'Санация и дезинфекция резервуаров воды (КВЭД 36.00)',
					text: 'Перед открытием сезона заказали промывку накопительных резервуаров питьевой воды на 15 м³. Удалили налет и ил, провели антимикробную обработку. Лабораторный анализ воды после обработки показал абсолютную безопасность.',
					rating: 5,
					date: 'Июнь 2026',
					icon: '💧'
				},
				{
					id: 6,
					category: 'b2c',
					author: 'Михаил С.',
					role: 'Житель, ул. Данченко',
					city: 'г. Черноморск',
					service: 'Уничтожение постельных клопов с гарантией',
					text: 'Очень благодарен за конфиденциальность и профессионализм. Мастер приехал в гражданской одежде, все объяснил, обработал диваны и плинтуса. После первого же сеанса укусы прекратились. Спасибо за спокойный сон семьи!',
					rating: 5,
					date: 'Май 2026',
					icon: '🛏️'
				}
			]
		}
	};

	let currentData = $derived(reviewsData[langState.current]);

	let filteredItems = $derived.by(() => {
		if (activeFilter === 'all') return currentData.items;
		return currentData.items.filter((item) => item.category === activeFilter);
	});
</script>

<section id="reviews" class="section reviews-section">
	<div class="container">
		<div class="section-header">
			<div class="section-badge">{currentData.badge}</div>
			<h2 class="section-title">{currentData.title}</h2>
			<p class="section-subtitle">{currentData.subtitle}</p>
		</div>

		<!-- Trust Metrics Banner -->
		<div class="trust-metrics-strip glass-card-dark">
			<div class="metric-block">
				<div class="stars-row">★★★★★</div>
				<div class="metric-val">{currentData.scoreBadge}</div>
				<div class="metric-desc">{currentData.scoreNote}</div>
			</div>
			<div class="metric-divider"></div>
			<div class="metric-block">
				<div class="metric-icon">🛡️</div>
				<div class="metric-val">100%</div>
				<div class="metric-desc">{currentData.guaranteeTitle}</div>
			</div>
			<div class="metric-divider"></div>
			<div class="metric-block">
				<div class="metric-icon">🏢</div>
				<div class="metric-val">14+ років</div>
				<div class="metric-desc">Офіційний досвід із 2011 року</div>
			</div>
		</div>

		<!-- Filter Tabs -->
		<div class="filter-tabs-row">
			<button
				type="button"
				class="filter-tab-btn"
				class:active={activeFilter === 'all'}
				onclick={() => (activeFilter = 'all')}
			>
				{currentData.filterAll}
			</button>
			<button
				type="button"
				class="filter-tab-btn"
				class:active={activeFilter === 'b2c'}
				onclick={() => (activeFilter = 'b2c')}
			>
				🏠 {currentData.filterB2C}
			</button>
			<button
				type="button"
				class="filter-tab-btn"
				class:active={activeFilter === 'haccp'}
				onclick={() => (activeFilter = 'haccp')}
			>
				🍽️ {currentData.filterHaccp}
			</button>
			<button
				type="button"
				class="filter-tab-btn"
				class:active={activeFilter === 'agro'}
				onclick={() => (activeFilter = 'agro')}
			>
				🌾 {currentData.filterAgro}
			</button>
		</div>

		<!-- Reviews Grid -->
		<div class="reviews-grid">
			{#each filteredItems as item (item.id)}
				<div class="review-card glass-card">
					<div class="review-card-top">
						<div class="review-author-box">
							<div class="author-avatar">{item.icon}</div>
							<div>
								<div class="author-name">{item.author}</div>
								<div class="author-role">{item.role}</div>
								<div class="author-city">📍 {item.city}</div>
							</div>
						</div>
						<div class="review-rating-badge">
							<span class="stars">{'★'.repeat(item.rating)}</span>
							<span class="verified-tag">✓ {currentData.verifiedBadge}</span>
						</div>
					</div>

					<div class="review-service-pill">
						<span>Послуга:</span> <strong>{item.service}</strong>
					</div>

					<p class="review-quote">
						«{item.text}»
					</p>

					<div class="review-card-footer">
						<span class="review-date">{item.date}</span>
						<span class="review-contract-note">📄 Офіційний акт виконаних робіт</span>
					</div>
				</div>
			{/each}
		</div>

		<!-- Bottom Action -->
		<div class="reviews-action-center">
			<button
				type="button"
				class="btn btn-primary btn-lg"
				onclick={() => orderModal.open({ serviceTitle: 'Санітарна обробка з гарантією' })}
			>
				<span>🛡️ {currentData.leaveReviewBtn}</span>
			</button>
		</div>
	</div>
</section>

<style>
	.reviews-section {
		background: #ffffff;
		border-top: 1px solid var(--border-light);
		border-bottom: 1px solid var(--border-light);
	}

	.trust-metrics-strip {
		display: grid;
		grid-template-columns: 1fr auto 1fr auto 1fr;
		align-items: center;
		padding: 1.8rem 2.5rem;
		border-radius: var(--radius-xl);
		margin-bottom: 2.5rem;
	}

	@media (max-width: 768px) {
		.trust-metrics-strip {
			grid-template-columns: 1fr;
			gap: 1.2rem;
			padding: 1.4rem 1.2rem;
			text-align: center;
		}

		.metric-divider {
			display: none;
		}
	}

	.metric-block {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 0.3rem;
	}

	.stars-row {
		color: #f59e0b;
		font-size: 1.3rem;
		letter-spacing: 0.1em;
	}

	.metric-icon {
		font-size: 1.5rem;
	}

	.metric-val {
		font-size: 1.6rem;
		font-weight: 800;
		color: #ffffff;
		font-family: var(--font-heading);
	}

	.metric-desc {
		font-size: 0.85rem;
		color: #94a3b8;
		max-width: 260px;
	}

	.metric-divider {
		width: 1px;
		height: 50px;
		background: rgba(255, 255, 255, 0.15);
	}

	/* Tabs */
	.filter-tabs-row {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.6rem;
		flex-wrap: wrap;
		margin-bottom: 2.5rem;
	}

	.filter-tab-btn {
		padding: 0.6rem 1.2rem;
		min-height: 44px;
		border-radius: var(--radius-full);
		border: 1.5px solid var(--border-light);
		background: #ffffff;
		color: var(--text-body);
		font-size: 0.9rem;
		font-weight: 600;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.filter-tab-btn:hover {
		border-color: var(--primary-700);
		color: var(--primary-900);
	}

	.filter-tab-btn.active {
		background: var(--primary-900);
		border-color: var(--primary-900);
		color: #ffffff;
		box-shadow: 0 4px 12px rgba(8, 26, 54, 0.2);
	}

	/* Grid */
	.reviews-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.8rem;
		margin-bottom: 2.5rem;
	}

	@media (max-width: 1100px) {
		.reviews-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 680px) {
		.reviews-grid {
			grid-template-columns: 1fr;
		}
	}

	.review-card {
		padding: 1.8rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		border: 1px solid var(--border-light);
		transition: transform var(--transition-fast), box-shadow var(--transition-fast);
	}

	.review-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-lg);
	}

	.review-card-top {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
	}

	.review-author-box {
		display: flex;
		gap: 0.8rem;
		align-items: flex-start;
	}

	.author-avatar {
		width: 44px;
		height: 44px;
		min-width: 44px;
		border-radius: 50%;
		background: #e0ecfd;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.3rem;
	}

	.author-name {
		font-size: 1rem;
		font-weight: 800;
		color: var(--primary-950);
		line-height: 1.25;
	}

	.author-role {
		font-size: 0.78rem;
		color: var(--text-muted);
		line-height: 1.35;
		margin-top: 0.15rem;
	}

	.author-city {
		font-size: 0.74rem;
		color: #00876c;
		font-weight: 700;
		margin-top: 0.2rem;
	}

	.review-rating-badge {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.2rem;
	}

	.stars {
		color: #f59e0b;
		font-size: 0.95rem;
		letter-spacing: 0.08em;
	}

	.verified-tag {
		font-size: 0.68rem;
		font-weight: 700;
		color: #059669;
		background: rgba(16, 185, 129, 0.12);
		padding: 0.15rem 0.5rem;
		border-radius: var(--radius-full);
		white-space: nowrap;
	}

	.review-service-pill {
		font-size: 0.8rem;
		background: #f1f5f9;
		padding: 0.4rem 0.75rem;
		border-radius: var(--radius-sm);
		color: var(--text-body);
		line-height: 1.4;
	}

	.review-service-pill span {
		color: var(--text-muted);
	}

	.review-quote {
		font-size: 0.92rem;
		color: var(--text-body);
		line-height: 1.6;
		font-style: italic;
		flex: 1;
	}

	.review-card-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 0.8rem;
		border-top: 1px dashed var(--border-light);
		font-size: 0.76rem;
		color: var(--text-muted);
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.review-contract-note {
		color: #00876c;
		font-weight: 600;
	}

	.reviews-action-center {
		text-align: center;
		margin-top: 1rem;
	}
</style>
