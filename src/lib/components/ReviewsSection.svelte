<script lang="ts">
	import { ForkKnife, Bug, Bed, Star, MapPin, Check, FileText } from 'phosphor-svelte';
	import { langState } from '../state/language.svelte';

	const reviewsData = {
		ua: {
			badge: 'Довіра та репутація',
			title: 'Відгуки',
			subtitle: 'Реальні відгуки мешканців та підприємств Чорноморська, Одеси та області про результати санітарної обробки з гарантією за договором.',
			scoreBadge: '4.9 з 5',
			scoreNote: 'середня оцінка на основі 380+ обробок',
			guaranteeTitle: '100% юридична гарантія за договором',
			leaveReviewBtn: 'Замовити обробку з гарантією',
			verifiedBadge: 'Перевірений клієнт',
			items: [
				{
					id: 1,
					category: 'b2c',
					author: 'Олена Ковальчук',
					role: 'Власниця квартири, просп. Миру',
					city: 'м. Чорноморськ',
					service: 'Знищення тарганів холодним туманом',
					text: 'Боролися з тарганами понад півроку побутовими балончиками — нічого не допомагало. Спеціаліст ОЗОН-ДЕЗ приїхав у день дзвінка, провів обробку за 40 хвилин. Комахи зникли повністю на наступний день. Приємно вразило, що немає запаху і безпечно для нашого кота.',
					rating: 5,
					date: 'Серпень 2026',
					icon: 'bug'
				},
				{
					id: 2,
					category: 'b2c',
					author: 'Михайло С.',
					role: 'Мешканець, вул. Данченка',
					city: 'м. Чорноморськ',
					service: 'Знищення постільних клопів з гарантією',
					text: 'Дуже вдячний за конфіденційність та професіоналізм. Спеціаліст приїхав у цивільному одязі, все пояснив, обробив дивани та щілини. Після першого ж сеансу укуси припинилися. Дякую за спокійний сон нашої родини!',
					rating: 5,
					date: 'Травень 2026',
					icon: 'bed'
				},
				{
					id: 3,
					category: 'haccp',
					author: 'Олег Васильович',
					role: 'Керуючий мережі ресторанів «Чорноморська Рів’єра»',
					city: 'м. Чорноморськ',
					service: 'Пест-контроль за нормами HACCP',
					text: 'Працюємо з ТОВ «ОЗОН-ДЕЗ» за річним договором. Планові нічні обробки залу та кухні без їдкого хімічного запаху. Планову перевірку Держпродспоживслужби пройшли з першого разу — всі акти, карти розташування пасток і сертифікати надані в повному обсязі.',
					rating: 5,
					date: 'Вересень 2026',
					icon: 'haccp'
				}
			]
		},
		ru: {
			badge: 'Доверие и репутация',
			title: 'Отзывы',
			subtitle: 'Реальные отзывы жителей и предприятий Черноморска, Одессы и области о результатах санитарной обработки с гарантией по договору.',
			scoreBadge: '4.9 из 5',
			scoreNote: 'средняя оценка на основе 380+ обработок',
			guaranteeTitle: '100% юридическая гарантия по договору',
			leaveReviewBtn: 'Заказать обработку с гарантией',
			verifiedBadge: 'Проверенный клиент',
			items: [
				{
					id: 1,
					category: 'b2c',
					author: 'Елена Ковальчук',
					role: 'Владелица квартиры, просп. Мира',
					city: 'г. Черноморск',
					service: 'Уничтожение тараканов холодным туманом',
					text: 'Боролись с тараканами более полугода бытовыми баллончиками — ничего не помогало. Специалист ОЗОН-ДЕЗ приехал в день звонка, провел обработку за 40 минут. Насекомые исчезли полностью на следующий день. Приятно удивило, что нет запаха и безопасно для кота.',
					rating: 5,
					date: 'Август 2026',
					icon: 'bug'
				},
				{
					id: 2,
					category: 'b2c',
					author: 'Михаил С.',
					role: 'Житель, ул. Данченко',
					city: 'г. Черноморск',
					service: 'Уничтожение постельных клопов с гарантией',
					text: 'Очень благодарен за конфиденциальность и профессионализм. Специалист приехал в гражданской одежде, все объяснил, обработал диваны и плинтуса. После первого же сеанса укусы прекратились. Спасибо за спокойный сон семьи!',
					rating: 5,
					date: 'Май 2026',
					icon: 'bed'
				},
				{
					id: 3,
					category: 'haccp',
					author: 'Олег Васильевич',
					role: 'Управляющий сети ресторанов «Черноморская Ривьера»',
					city: 'г. Черноморск',
					service: 'Пест-контроль по стандартам HACCP',
					text: 'Работаем с ООО «ОЗОН-ДЕЗ» по годовому договору. Плановые ночные обработки зала и кухни без едкого запаха. Плановую проверку Госпродпотребслужбы прошли с первого раза — все акты, карты расстановки ловушек и сертификаты предоставлены в полном объеме.',
					rating: 5,
					date: 'Сентябрь 2026',
					icon: 'haccp'
				}
			]
		},
		en: {
			badge: 'Trust & Reputation',
			title: 'Reviews',
			subtitle: 'Verified client reviews from residents and businesses across Chornomorsk and Odesa region with contractual guarantee.',
			scoreBadge: '4.9 out of 5',
			scoreNote: 'average rating based on 380+ treatments',
			guaranteeTitle: '100% legal contract warranty',
			leaveReviewBtn: 'Order Treatment with Warranty',
			verifiedBadge: 'Verified Client',
			items: [
				{
					id: 1,
					category: 'b2c',
					author: 'Olena Kovalchuk',
					role: 'Apartment Owner, Myru Ave',
					city: 'Chornomorsk',
					service: 'Cockroach Extermination with ULV Cold Fog',
					text: 'We fought cockroaches for six months using retail spray cans — nothing helped. An OZON-DEZ specialist arrived the same day and completed the treatment in 40 minutes. Insects vanished completely next day. Very pleased that there was no smell and it was safe for our cat.',
					rating: 5,
					date: 'August 2026',
					icon: 'bug'
				},
				{
					id: 2,
					category: 'b2c',
					author: 'Mykhailo S.',
					role: 'Resident, Danchenka St',
					city: 'Chornomorsk',
					service: 'Bedbug Elimination with Warranty',
					text: 'Extremely grateful for confidentiality and professionalism. The specialist arrived in casual clothes, explained everything clearly, and treated the rooms. Bites ceased after the very first session. Thank you for our family peace of mind!',
					rating: 5,
					date: 'May 2026',
					icon: 'bed'
				},
				{
					id: 3,
					category: 'haccp',
					author: 'Oleg Vasyliovych',
					role: 'General Manager, "Chornomorska Riviera" Restaurant Chain',
					city: 'Chornomorsk',
					service: 'Pest Control via HACCP Standards',
					text: 'We have cooperated with LLC "OZON-DEZ" under an annual contract. Scheduled nighttime kitchen and hall treatments without pungent chemical smells. Passed state food inspections on the first attempt with all log sheets, trap maps, and certificates provided.',
					rating: 5,
					date: 'September 2026',
					icon: 'haccp'
				}
			]
		}
	};

	let currentData = $derived(reviewsData[langState.current]);
</script>

<section id="reviews" class="section reviews-section">
	<div class="container">
		<div class="section-header">
			<h2 class="section-title">{currentData.title}</h2>
			<p class="section-subtitle">{currentData.subtitle}</p>
		</div>

		<!-- Reviews Grid -->
		<div class="reviews-grid">
			{#each currentData.items as item (item.id)}
				<div class="review-card glass-card">
					<div class="review-card-top">
						<div class="review-author-box">
							<div class="author-avatar">
								{#if item.icon === 'bug'}
									<Bug size={22} weight="duotone" color="var(--color-electric-iris)" />
								{:else if item.icon === 'bed'}
									<Bed size={22} weight="duotone" color="var(--color-electric-iris)" />
								{:else}
									<ForkKnife size={22} weight="duotone" color="var(--color-electric-iris)" />
								{/if}
							</div>
							<div>
								<div class="author-name">{item.author}</div>
								<div class="author-role">{item.role}</div>
								<div class="author-city" style="display: flex; align-items: center; gap: 0.25rem;">
									<MapPin size={12} weight="fill" />
									<span>{item.city}</span>
								</div>
							</div>
						</div>
						<div class="review-rating-badge">
							<span class="stars" style="display: inline-flex; align-items: center; gap: 2px;">
								{#each Array(item.rating) as _}
									<Star size={13} weight="fill" color="var(--color-saffron-spark)" />
								{/each}
							</span>
							<span class="verified-tag" style="display: inline-flex; align-items: center; gap: 0.25rem;">
								<Check size={12} weight="bold" />
								<span>{currentData.verifiedBadge}</span>
							</span>
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
						<span class="review-contract-note" style="display: inline-flex; align-items: center; gap: 0.3rem;">
							<FileText size={13} weight="bold" />
							<span>Офіційний акт виконаних робіт</span>
						</span>
					</div>
				</div>
			{/each}
		</div>

	</div>
</section>

<style>
	.reviews-section {
		position: relative;
		z-index: 1;
		background: transparent;
		border-top: 1px solid var(--border-subtle);
		padding: clamp(3rem, 5vh, 4.5rem) 0;
	}

	.reviews-section :global(.section-header) {
		margin-bottom: 2rem;
	}


	/* Grid */
	.reviews-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.25rem;
		margin-bottom: 0;
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
		padding: 1.4rem 1.3rem;
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		background: var(--color-surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-cards);
		transition: transform var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
	}

	.review-card:hover {
		transform: translateY(-3px);
		border-color: rgba(255, 255, 255, 0.2);
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
		width: 42px;
		height: 42px;
		min-width: 42px;
		border-radius: 50%;
		background: var(--color-surface-hover);
		border: 1px solid var(--color-void-border);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.25rem;
	}

	.author-name {
		font-size: 1rem;
		font-weight: 500;
		color: var(--color-bone-white);
		line-height: 1.25;
	}

	.author-role {
		font-size: 0.78rem;
		color: var(--color-ash-gray);
		font-weight: 300;
		line-height: 1.35;
		margin-top: 0.15rem;
	}

	.author-city {
		font-size: 0.74rem;
		color: var(--color-saffron-spark);
		font-weight: 500;
		margin-top: 0.2rem;
	}

	.review-rating-badge {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.25rem;
	}

	.stars {
		color: var(--color-saffron-spark);
		font-size: 0.95rem;
		letter-spacing: 0.08em;
	}

	.verified-tag {
		font-size: 0.68rem;
		font-weight: 600;
		color: #bfa6ff;
		background: rgba(128, 82, 255, 0.1);
		border: 1px solid var(--color-iris-border);
		padding: 0.15rem 0.5rem;
		border-radius: var(--radius-tags);
		white-space: nowrap;
	}

	.review-service-pill {
		font-size: 0.78rem;
		background: var(--color-surface-hover);
		border: 1px solid var(--color-void-border);
		padding: 0.45rem 0.8rem;
		border-radius: var(--radius-tags);
		color: var(--color-silver-mist);
		line-height: 1.4;
	}

	:global(html[data-theme="light"]) .review-service-pill {
		background: #f1f5f9;
		border-color: rgba(15, 23, 42, 0.08);
		color: #334155;
	}

	:global(html[data-theme="light"]) .review-card {
		background: rgba(255, 255, 255, 0.85);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border-color: rgba(15, 23, 42, 0.08);
		box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.05);
	}

	.review-service-pill span {
		color: var(--color-ash-gray);
	}

	.review-service-pill strong {
		color: var(--color-bone-white);
		font-weight: 400;
	}

	.review-quote {
		font-size: 0.92rem;
		color: var(--color-silver-mist);
		line-height: 1.6;
		font-style: italic;
		font-weight: 300;
		flex: 1;
	}

	.review-card-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 0.85rem;
		border-top: 1px dashed var(--color-void-border);
		font-size: 0.76rem;
		color: var(--color-ash-gray);
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.review-contract-note {
		color: var(--color-saffron-spark);
		font-weight: 500;
	}

</style>
