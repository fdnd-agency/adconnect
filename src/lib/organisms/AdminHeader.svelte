<script>
	import dots from '$lib/assets/dots.svg'
	const { title, directusBase, contentType, breadcrumb, addHref } = $props()
</script>

<section class="page-header">
	<img
		src={dots}
		alt=""
		class="header-dots"
		width="80"
		height="60"
	/>

	<div class="title-row">
		<h1>{title}</h1>
		<a
			href={addHref ?? `${directusBase}/${contentType}/+`}
			target={addHref ? undefined : '_blank'}
			class="add-btn"
			aria-label="{title} toevoegen">+</a
		>
	</div>

	<nav
		class="breadcrumb"
		aria-label="Breadcrumb"
	>
		<span>Dashboard</span>
		<span class="separator">›</span>
		<span>{breadcrumb}</span>
	</nav>
</section>

<style>
	.page-header {
		margin-bottom: 1.5em;
	}

	.header-dots {
		margin-bottom: 0.5em;
	}

	.title-row {
		display: flex;
		align-items: center;
		gap: 0.75em;
	}

	.title-row h1 {
		margin: 0;
	}

	.add-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background-color: var(--primary-blue);
		color: var(--text-white);
		font-size: 1.4rem;
		font-weight: 600;
		line-height: 1;
		text-decoration: none;
		border: none;
	}

	.breadcrumb {
		font-family: var(--font-body);
		font-size: 0.9rem;
		color: var(--neutral-600);
		margin-top: 0.25em;
	}

	.separator {
		margin: 0 0.3em;
	}
</style>
