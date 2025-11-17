<script lang="ts">
	import type { QuizSubmission } from '$lib/types/quiz';

	interface Props {
		submissions: QuizSubmission[];
		onDownloadCSV: () => void;
	}

	let { submissions, onDownloadCSV }: Props = $props();

	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat('id-ID', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		}).format(date);
	}

	function getResultLabel(type: string) {
		switch (type) {
			case 'inovator':
				return '💡 Inovator';
			case 'kreator':
				return '🎨 Kreator';
			case 'pendidik':
				return '📚 Pendidik';
			case 'pelestari':
				return '🌿 Pelestari';
			default:
				return type;
		}
	}

	const stats = $derived.by(() => {
		const total = submissions.length;
		const resultCounts = {
			inovator: 0,
			kreator: 0,
			pendidik: 0,
			pelestari: 0
		};

		submissions.forEach((sub) => {
			resultCounts[sub.result.type]++;
		});

		return {
			total,
			resultCounts
		};
	});
</script>

<div class="mx-auto max-w-7xl px-4">
	<!-- Header -->
	<div class="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
		<h2 class="text-2xl font-semibold text-gray-900">Rekapitulasi Data Kuis</h2>
		<button
			onclick={onDownloadCSV}
			class="flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
		>
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
				<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
				<polyline points="7 10 12 15 17 10"></polyline>
				<line x1="12" y1="15" x2="12" y2="3"></line>
			</svg>
			Download CSV
		</button>
	</div>

	<!-- Stats Grid -->
	<div class="mb-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
		<div class="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4">
			<div
				class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-2xl"
			>
				📊
			</div>
			<div class="min-w-0">
				<p class="text-xs font-medium tracking-wide text-gray-500 uppercase">Total Peserta</p>
				<p class="mt-0.5 text-2xl font-semibold text-gray-900">{stats.total}</p>
			</div>
		</div>
		<div class="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4">
			<div
				class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-2xl"
			>
				💡
			</div>
			<div class="min-w-0">
				<p class="text-xs font-medium tracking-wide text-gray-500 uppercase">Inovator</p>
				<p class="mt-0.5 text-2xl font-semibold text-gray-900">{stats.resultCounts.inovator}</p>
			</div>
		</div>
		<div class="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4">
			<div
				class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-2xl"
			>
				🎨
			</div>
			<div class="min-w-0">
				<p class="text-xs font-medium tracking-wide text-gray-500 uppercase">Kreator</p>
				<p class="mt-0.5 text-2xl font-semibold text-gray-900">{stats.resultCounts.kreator}</p>
			</div>
		</div>
		<div class="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4">
			<div
				class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-2xl"
			>
				📚
			</div>
			<div class="min-w-0">
				<p class="text-xs font-medium tracking-wide text-gray-500 uppercase">Pendidik</p>
				<p class="mt-0.5 text-2xl font-semibold text-gray-900">{stats.resultCounts.pendidik}</p>
			</div>
		</div>
		<div class="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4">
			<div
				class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-2xl"
			>
				🌿
			</div>
			<div class="min-w-0">
				<p class="text-xs font-medium tracking-wide text-gray-500 uppercase">Pelestari</p>
				<p class="mt-0.5 text-2xl font-semibold text-gray-900">{stats.resultCounts.pelestari}</p>
			</div>
		</div>
	</div>

	<!-- Table -->
	{#if submissions.length === 0}
		<div class="rounded-lg border border-gray-200 bg-white p-12 text-center">
			<p class="text-gray-500">Belum ada data kuis yang tersimpan.</p>
		</div>
	{:else}
		<div class="overflow-hidden rounded-lg border border-gray-200 bg-white">
			<div class="overflow-x-auto">
				<table class="w-full">
					<thead class="border-b border-gray-200 bg-gray-50">
						<tr>
							<th
								class="px-4 py-3.5 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase"
								>No</th
							>
							<th
								class="px-4 py-3.5 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase"
								>Nama</th
							>
							<th
								class="px-4 py-3.5 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase"
								>Nomor HP</th
							>
							<th
								class="px-4 py-3.5 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase"
								>Universitas</th
							>
							<th
								class="px-4 py-3.5 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase"
								>Hasil</th
							>
							<th
								class="px-4 py-3.5 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase"
								>Jawaban A</th
							>
							<th
								class="px-4 py-3.5 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase"
								>Jawaban B</th
							>
							<th
								class="px-4 py-3.5 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase"
								>Jawaban C</th
							>
							<th
								class="px-4 py-3.5 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase"
								>Jawaban D</th
							>
							<th
								class="px-4 py-3.5 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase"
								>Waktu Submit</th
							>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-200">
						{#each submissions as submission, index}
							<tr class="transition-colors hover:bg-gray-50">
								<td class="px-4 py-3.5 text-sm text-gray-600">{index + 1}</td>
								<td class="px-4 py-3.5 text-sm font-medium text-gray-900">
									{submission.biodata.nama}
								</td>
								<td class="px-4 py-3.5 text-sm text-gray-600">{submission.biodata.nomorHP}</td>
								<td class="px-4 py-3.5 text-sm text-gray-600">
									<div class="max-w-xs">
										<div class="font-medium text-gray-900">{submission.biodata.universitas}</div>
										{#if submission.biodata.provinsi}
											<div class="mt-0.5 text-xs text-gray-500">{submission.biodata.provinsi}</div>
										{/if}
									</div>
								</td>
								<td class="px-4 py-3.5 text-center">
									<span
										class="inline-block rounded bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
									>
										{getResultLabel(submission.result.type)}
									</span>
								</td>
								<td class="px-4 py-3.5 text-center text-sm font-semibold text-gray-900">
									{submission.result.counts.a}
								</td>
								<td class="px-4 py-3.5 text-center text-sm font-semibold text-gray-900">
									{submission.result.counts.b}
								</td>
								<td class="px-4 py-3.5 text-center text-sm font-semibold text-gray-900">
									{submission.result.counts.c}
								</td>
								<td class="px-4 py-3.5 text-center text-sm font-semibold text-gray-900">
									{submission.result.counts.d}
								</td>
								<td class="px-4 py-3.5 text-sm whitespace-nowrap text-gray-500">
									{formatDate(submission.submittedAt)}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{/if}
</div>
