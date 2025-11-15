<script lang="ts">
	import type { PageData } from './$types';
	import RekapTable from '$lib/components/RekapTable.svelte';
	import { exportSubmissionsToCSV } from '$lib/utils/csvExport';

	let { data } = $props<{ data: PageData }>();

	function handleDownloadCSV() {
		if (data.submissions.length === 0) {
			alert('Tidak ada data untuk diunduh');
			return;
		}

		exportSubmissionsToCSV(data.submissions);
	}

	function handleRefresh() {
		window.location.reload();
	}
</script>

<svelte:head>
	<title>Rekapitulasi Kuis - Cermin Karsa</title>
</svelte:head>

<div class="rekap-page">
	<header class="page-header">
		<div class="header-content">
			<div>
				<h1>📊 Rekapitulasi Data Kuis</h1>
				<p class="subtitle">Game "Cermin Karsa" - Kenali Potensi Wirausahamu</p>
			</div>
			<div class="header-actions">
				<a href="/" class="btn-back">← Kembali ke Kuis</a>
				<button class="btn-refresh" onclick={handleRefresh}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<polyline points="23 4 23 10 17 10"></polyline>
						<polyline points="1 20 1 14 7 14"></polyline>
						<path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
					</svg>
					Refresh
				</button>
			</div>
		</div>
	</header>

	<main class="page-content">
		{#if data.error}
			<div class="error-message">
				<p>⚠️ {data.error}</p>
			</div>
		{/if}

		<RekapTable submissions={data.submissions} onDownloadCSV={handleDownloadCSV} />
	</main>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family:
			-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
		background: #f8f9fa;
	}

	.rekap-page {
		min-height: 100vh;
	}

	.page-header {
		background: white;
		border-bottom: 1px solid #e9ecef;
		padding: 2rem 1rem;
	}

	.header-content {
		max-width: 1400px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1.5rem;
	}

	h1 {
		margin: 0 0 0.5rem 0;
		font-size: 1.75rem;
		font-weight: 600;
		color: #212529;
	}

	.subtitle {
		margin: 0;
		color: #6c757d;
		font-size: 0.9rem;
	}

	.header-actions {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.btn-back,
	.btn-refresh {
		padding: 0.625rem 1.25rem;
		border: 1px solid #ced4da;
		border-radius: 6px;
		font-size: 0.9rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
		background: white;
		color: #495057;
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}

	.btn-back:hover,
	.btn-refresh:hover {
		background: #f8f9fa;
		border-color: #adb5bd;
	}

	.page-content {
		padding: 2rem 0;
	}

	.error-message {
		max-width: 1400px;
		margin: 0 auto 2rem;
		padding: 1rem 2rem;
		background: #fff3cd;
		border: 1px solid #ffc107;
		border-radius: 6px;
		color: #856404;
		text-align: center;
	}

	.error-message p {
		margin: 0;
		font-weight: 600;
	}

	@media (max-width: 768px) {
		.page-header {
			padding: 1.5rem 1rem;
		}

		h1 {
			font-size: 1.5rem;
		}

		.subtitle {
			font-size: 0.875rem;
		}

		.header-content {
			flex-direction: column;
			align-items: flex-start;
		}

		.header-actions {
			width: 100%;
		}

		.btn-back,
		.btn-refresh {
			flex: 1;
			justify-content: center;
		}
	}
</style>
