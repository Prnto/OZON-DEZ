<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let animId: number;

	interface Particle {
		x: number;
		y: number;
		originX: number;
		originY: number;
		vx: number;
		vy: number;
		size: number;
		color: string;
		alpha: number;
		shape: 'triangle' | 'circle';
		angle: number;
		spin: number;
		orbitRadius: number;
		orbitSpeed: number;
		orbitAngle: number;
	}

	const colors = [
		'#8052ff', // Electric Iris
		'#8052ff',
		'#ffb829', // Saffron Spark
		'#15846e', // Deep Verdant
		'#ffffff', // Bone White
		'#bfa6ff', // Light Violet
		'#ffd875'  // Warm Amber
	];

	onMount(() => {
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
		let height = (canvas.height = canvas.parentElement?.clientHeight || 550);

		let mouseX = width / 2;
		let mouseY = height / 2;
		let isMouseOver = false;

		const particleCount = width < 768 ? 90 : 180;
		const particles: Particle[] = [];

		const centerX = width * 0.5;
		const centerY = height * 0.5;

		for (let i = 0; i < particleCount; i++) {
			// Cluster particles in an organic oval / ozone cloud shape
			const theta = Math.random() * Math.PI * 2;
			const radiusFactor = Math.pow(Math.random(), 0.65);
			const maxRadiusX = width * 0.38;
			const maxRadiusY = height * 0.36;

			const px = centerX + Math.cos(theta) * maxRadiusX * radiusFactor;
			const py = centerY + Math.sin(theta) * maxRadiusY * radiusFactor;

			particles.push({
				x: px,
				y: py,
				originX: px,
				originY: py,
				vx: (Math.random() - 0.5) * 0.4,
				vy: (Math.random() - 0.5) * 0.4,
				size: Math.random() < 0.4 ? Math.random() * 3.5 + 2 : Math.random() * 2 + 1,
				color: colors[Math.floor(Math.random() * colors.length)],
				alpha: Math.random() * 0.7 + 0.3,
				shape: Math.random() < 0.65 ? 'triangle' : 'circle',
				angle: Math.random() * Math.PI * 2,
				spin: (Math.random() - 0.5) * 0.02,
				orbitRadius: Math.random() * 25 + 5,
				orbitSpeed: (Math.random() - 0.5) * 0.015,
				orbitAngle: Math.random() * Math.PI * 2
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

			// Connect nearby constellation points with ultra-subtle lines
			const maxDist = width < 768 ? 48 : 65;
			ctx.lineWidth = 0.6;
			for (let i = 0; i < particles.length; i++) {
				for (let j = i + 1; j < particles.length; j++) {
					const dx = particles[i].x - particles[j].x;
					const dy = particles[i].y - particles[j].y;
					const dist = Math.hypot(dx, dy);
					if (dist < maxDist) {
						const lineAlpha = (1 - dist / maxDist) * 0.15;
						ctx.strokeStyle = `rgba(128, 82, 255, ${lineAlpha})`;
						ctx.beginPath();
						ctx.moveTo(particles[i].x, particles[i].y);
						ctx.lineTo(particles[j].x, particles[j].y);
						ctx.stroke();
					}
				}
			}

			// Render individual particles
			for (const p of particles) {
				p.orbitAngle += p.orbitSpeed;
				p.angle += p.spin;

				// Smooth gentle floating around origin
				const targetX = p.originX + Math.cos(p.orbitAngle) * p.orbitRadius;
				const targetY = p.originY + Math.sin(p.orbitAngle) * p.orbitRadius;

				p.x += (targetX - p.x) * 0.05;
				p.y += (targetY - p.y) * 0.05;

				// Gentle mouse repulsion
				if (isMouseOver) {
					const mdx = p.x - mouseX;
					const mdy = p.y - mouseY;
					const mdist = Math.hypot(mdx, mdy);
					if (mdist < 120) {
						const force = (1 - mdist / 120) * 8;
						p.x += (mdx / mdist) * force;
						p.y += (mdy / mdist) * force;
					}
				}

				ctx.save();
				ctx.globalAlpha = p.alpha;
				ctx.strokeStyle = p.color;
				ctx.fillStyle = p.color;
				ctx.lineWidth = 1.2;

				if (p.shape === 'triangle') {
					drawTriangle(ctx, p.x, p.y, p.size, p.angle);
				} else {
					ctx.beginPath();
					ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
					ctx.fill();
				}
				ctx.restore();
			}

			animId = requestAnimationFrame(render);
		}

		function handleResize() {
			if (!canvas || !canvas.parentElement) return;
			width = canvas.width = canvas.parentElement.clientWidth;
			height = canvas.height = canvas.parentElement.clientHeight;
		}

		function handleMouseMove(e: MouseEvent) {
			const rect = canvas.getBoundingClientRect();
			mouseX = e.clientX - rect.left;
			mouseY = e.clientY - rect.top;
			isMouseOver = true;
		}

		function handleMouseLeave() {
			isMouseOver = false;
		}

		window.addEventListener('resize', handleResize);
		canvas.addEventListener('mousemove', handleMouseMove);
		canvas.addEventListener('mouseleave', handleMouseLeave);

		render();

		return () => {
			cancelAnimationFrame(animId);
			window.removeEventListener('resize', handleResize);
			if (canvas) {
				canvas.removeEventListener('mousemove', handleMouseMove);
				canvas.removeEventListener('mouseleave', handleMouseLeave);
			}
		};
	});
</script>

<div class="constellation-wrapper" aria-hidden="true">
	<canvas bind:this={canvas} class="constellation-canvas"></canvas>
	<div class="constellation-glow"></div>
</div>

<style>
	.constellation-wrapper {
		position: relative;
		width: 100%;
		height: 100%;
		min-height: 420px;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: auto;
	}

	.constellation-canvas {
		width: 100%;
		height: 100%;
		display: block;
		filter: contrast(1.1);
	}

	.constellation-glow {
		position: absolute;
		width: 320px;
		height: 320px;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(128, 82, 255, 0.12) 0%, rgba(21, 132, 110, 0.06) 50%, transparent 70%);
		pointer-events: none;
		z-index: -1;
		filter: blur(40px);
	}
</style>
