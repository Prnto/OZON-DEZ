<script lang="ts">
	import { onMount } from 'svelte';
	import { themeState } from '../state/theme.svelte';

	interface Props {
		mode?: 'fullpage' | 'inline';
	}

	let { mode = 'fullpage' }: Props = $props();

	let canvas: HTMLCanvasElement;
	let animId: number;

	interface Particle {
		x: number;
		y: number;
		vx: number;
		vy: number;
		size: number;
		colorIndex: number;
		alpha: number;
		shape: 'triangle' | 'circle';
		angle: number;
		spin: number;
	}

	const darkColors = [
		'#8052ff', // Electric Iris
		'#a855f7', // Purple
		'#ffb829', // Saffron Spark
		'#15846e', // Deep Verdant
		'#ffffff', // Star White
		'#c4b5fd', // Light Violet
		'#ffd875'  // Warm Amber
	];

	const lightColors = [
		'#6d3ef7', // Iris Slate
		'#8b5cf6', // Violet
		'#d97706', // Saffron Dark
		'#0d9488', // Teal Dark
		'#3b82f6', // Sapphire
		'#64748b'  // Slate
	];

	onMount(() => {
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let width = 0;
		let height = 0;

		function updateDimensions() {
			if (!canvas) return;
			if (mode === 'fullpage') {
				width = canvas.width = window.innerWidth;
				height = canvas.height = window.innerHeight;
			} else {
				width = canvas.width = canvas.parentElement?.clientWidth || 600;
				height = canvas.height = canvas.parentElement?.clientHeight || 550;
			}
		}

		updateDimensions();

		let mouseX = width / 2;
		let mouseY = height / 2;
		let isMouseOver = false;

		const count = mode === 'fullpage'
			? (width < 768 ? 70 : 130)
			: (width < 768 ? 50 : 90);

		const particles: Particle[] = [];

		for (let i = 0; i < count; i++) {
			particles.push({
				x: Math.random() * width,
				y: Math.random() * height,
				vx: (Math.random() - 0.5) * 0.45,
				vy: (Math.random() - 0.5) * 0.45,
				size: Math.random() < 0.35 ? Math.random() * 3 + 2 : Math.random() * 2 + 1,
				colorIndex: Math.floor(Math.random() * darkColors.length),
				alpha: Math.random() * 0.5 + 0.25,
				shape: Math.random() < 0.6 ? 'triangle' : 'circle',
				angle: Math.random() * Math.PI * 2,
				spin: (Math.random() - 0.5) * 0.02
			});
		}

		function drawTriangle(context: CanvasRenderingContext2D, x: number, y: number, size: number, angle: number) {
			context.save();
			context.translate(x, y);
			context.rotate(angle);
			context.beginPath();
			context.moveTo(0, -size);
			context.lineTo(size * 0.866, size * 0.5);
			context.lineTo(-size * 0.866, size * 0.5);
			context.closePath();
			context.stroke();
			context.restore();
		}

		function render() {
			if (!ctx) return;
			ctx.clearRect(0, 0, width, height);

			const isDark = themeState.current === 'dark';
			const currentPalette = isDark ? darkColors : lightColors;
			const maxDist = width < 768 ? 60 : 85;

			// Connect nearby constellation points with soft lines
			ctx.lineWidth = 0.65;
			for (let i = 0; i < particles.length; i++) {
				for (let j = i + 1; j < particles.length; j++) {
					const dx = particles[i].x - particles[j].x;
					const dy = particles[i].y - particles[j].y;
					const dist = Math.hypot(dx, dy);
					if (dist < maxDist) {
						const lineAlpha = (1 - dist / maxDist) * (isDark ? 0.16 : 0.09);
						ctx.strokeStyle = isDark
							? `rgba(128, 82, 255, ${lineAlpha})`
							: `rgba(109, 62, 247, ${lineAlpha})`;
						ctx.beginPath();
						ctx.moveTo(particles[i].x, particles[i].y);
						ctx.lineTo(particles[j].x, particles[j].y);
						ctx.stroke();
					}
				}
			}

			// Render and animate individual particles
			for (const p of particles) {
				p.x += p.vx;
				p.y += p.vy;
				p.angle += p.spin;

				// Smooth viewport wrapping
				if (p.x < -20) p.x = width + 20;
				if (p.x > width + 20) p.x = -20;
				if (p.y < -20) p.y = height + 20;
				if (p.y > height + 20) p.y = -20;

				// Gentle mouse repulsion
				if (isMouseOver) {
					const mdx = p.x - mouseX;
					const mdy = p.y - mouseY;
					const mdist = Math.hypot(mdx, mdy);
					if (mdist < 140 && mdist > 0) {
						const force = (1 - mdist / 140) * 1.5;
						p.x += (mdx / mdist) * force;
						p.y += (mdy / mdist) * force;
					}
				}

				const color = currentPalette[p.colorIndex % currentPalette.length];
				const alphaMultiplier = isDark ? 1 : 0.65;

				ctx.save();
				ctx.globalAlpha = p.alpha * alphaMultiplier;
				ctx.strokeStyle = color;
				ctx.fillStyle = color;
				ctx.lineWidth = 1.1;

				if (p.shape === 'triangle') {
					drawTriangle(ctx, p.x, p.y, p.size, p.angle);
				} else {
					ctx.beginPath();
					ctx.arc(p.x, p.y, p.size * 0.7, 0, Math.PI * 2);
					ctx.fill();
				}
				ctx.restore();
			}

			animId = requestAnimationFrame(render);
		}

		function handleResize() {
			updateDimensions();
		}

		function handleMouseMove(e: MouseEvent) {
			mouseX = e.clientX;
			mouseY = e.clientY;
			isMouseOver = true;
		}

		function handleMouseLeave() {
			isMouseOver = false;
		}

		window.addEventListener('resize', handleResize);
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseleave', handleMouseLeave);

		render();

		return () => {
			cancelAnimationFrame(animId);
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseleave', handleMouseLeave);
		};
	});
</script>

<div class="constellation-wrapper {mode}" aria-hidden="true">
	<canvas bind:this={canvas} class="constellation-canvas"></canvas>
	<div class="constellation-ambient-glow"></div>
</div>

<style>
	.constellation-wrapper {
		pointer-events: none;
		user-select: none;
	}

	.constellation-wrapper.fullpage {
		position: fixed;
		inset: 0;
		width: 100vw;
		height: 100vh;
		z-index: 0;
		overflow: hidden;
	}

	.constellation-wrapper.inline {
		position: relative;
		width: 100%;
		height: 100%;
		min-height: 420px;
	}

	.constellation-canvas {
		width: 100%;
		height: 100%;
		display: block;
		filter: contrast(1.05);
	}

	.constellation-ambient-glow {
		position: absolute;
		top: 15%;
		right: 10%;
		width: 50vw;
		height: 50vw;
		max-width: 600px;
		max-height: 600px;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(128, 82, 255, 0.08) 0%, rgba(21, 132, 110, 0.04) 50%, transparent 70%);
		pointer-events: none;
		z-index: -1;
		filter: blur(60px);
	}

	:global(html[data-theme="light"]) .constellation-ambient-glow {
		background: radial-gradient(circle, rgba(109, 62, 247, 0.05) 0%, rgba(13, 148, 136, 0.03) 50%, transparent 70%);
	}
</style>
