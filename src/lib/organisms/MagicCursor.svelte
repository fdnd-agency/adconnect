<script>
	import { onMount } from "svelte";
	import { gsap } from "gsap";
	import throttle from "just-throttle";

	// Array with all the colors
	const colors = [ "#FFEE87", "#FF6FFF", "#FF4500", "#8A2BE2", "#4B0082", "#1E90FF", "#FFC0CB", "#FFFFFF" ];

	// Variabele that connects to the magic cursor
	let magicCursor;

	// When the component is loaded the magical cursor animation is going to start
	onMount(() => {

		// When the mouse is moving the following function is busy..
		const pointerMove = (e) => {

			// Make the trail of stars and circles
			const amountStar = Math.random() < 0.3; // 30 procent chance on stars
			const cursorTrail = document.createElement("div"); // Create a div for every trail
			cursorTrail.className = amountStar ? "star" : "circle"; 
			
			// Choose random colors for the trail
			const color = colors[Math.floor(Math.random() * colors.length)];
			cursorTrail.style.setProperty("--trail-color", color);

			// Add the trail to the cursor
			magicCursor.appendChild(cursorTrail);

			// Start position of trail
			const startTrail = gsap.quickSetter(cursorTrail, "css");

			startTrail({
				x: e.clientX - 10,
				y: e.clientY - 10,
				rotate: Math.random() * 180,
				scale: 2 + Math.random() * 4,
				opacity: 1
			});

			// Animate the trail to a random position
			gsap.to(cursorTrail, {
				duration: 1.5,
				x: e.clientX + (Math.random() - 0.5) * 400,
				y: e.clientY + (Math.random() - 0.5) * 400,
				scale: 0,
				opacity: 0,
				rotate: Math.random() * 180 + 90,
				ease: "power2.out",
				onComplete: () => cursorTrail.remove() // Remove the animation when not moving with cursor
			});
		};

		// Slow down the animation so it doesn’t run too many times
		const throttledPointerMove = throttle(pointerMove, 20);

		// The mouse is magical when moving :)
		window.addEventListener("pointermove", throttledPointerMove);

		// When the mouse is not moving remove the animation
		return () => window.removeEventListener("pointermove", throttledPointerMove);
	});
</script>

<div id="cursor" bind:this={magicCursor}></div>

<style>
	@media (min-width: 768px) {
		/* Cursor */
		#cursor {
			position: fixed;
			inset: 0;
			pointer-events: none;
			z-index: 999999;
			overflow: hidden;
		}

		/* This is the trail of a circle */
		:global(.circle) {
			position: absolute;
			width: 20px;
			height: 20px;
			border-radius: 50%;
			pointer-events: none;
			mix-blend-mode: lighten;
			will-change: transform, opacity;
			background: radial-gradient(circle, var(--trail-color), transparent 60%);
			filter: drop-shadow(0 0 8px var(--trail-color));
		}

		/* This is the trail of a star */
		:global(.star) {
			position: absolute;
			width: 15px;
			height: 15px;
			pointer-events: none;
			background-color: var(--trail-color);
			clip-path: polygon(50% 0%, 60% 50%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0% 50%, 40% 50%);
			mix-blend-mode: lighten;
			will-change: transform, opacity;
		}

		@media (prefers-reduced-motion: reduce) {
			:global(.circle),
			:global(.star) {
				display: none;
			}
		}

		@media (prefers-color-scheme: dark) {
			:global(.circle),
			:global(.star) {
				background-color: #004cff;
				background: radial-gradient(circle,#00FFFF 0%, #004cff 100%);
			}
		}
	}
</style>
