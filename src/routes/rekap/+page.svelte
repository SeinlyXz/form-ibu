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

<div class="min-h-screen bg-gray-50">
	<header class="border-b border-gray-200 bg-white">
		<div class="mx-auto max-w-7xl px-4 py-8">
			<div class="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
				<div>
					<h1 class="mb-1 text-2xl font-semibold text-gray-900 md:text-3xl">
						📊 Rekapitulasi Data Kuis
					</h1>
					<p class="text-sm text-gray-600">Game "Cermin Karsa" - Kenali Potensi Wirausahamu</p>
				</div>
				<div class="flex gap-3">
					<a
						href="/"
						class="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50"
					>
						← Kembali ke Kuis
					</a>
					<button
						onclick={handleRefresh}
						class="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
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
		</div>
	</header>

	<main class="py-8">
		{#if data.error}
			<div class="mx-auto mb-6 max-w-7xl px-4">
				<div class="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-center">
					<p class="text-sm font-medium text-yellow-800">⚠️ {data.error}</p>
				</div>
			</div>
		{/if}

		<RekapTable submissions={data.submissions} onDownloadCSV={handleDownloadCSV} />
	</main>
</div>
