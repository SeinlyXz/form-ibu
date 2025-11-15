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

<div class="rekap-container">
	<div class="rekap-header">
		<h2>Rekapitulasi Data Kuis</h2>
		<button class="btn-download" onclick={onDownloadCSV}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
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

	<div class="stats-grid">
		<div class="stat-card">
			<div class="stat-icon">📊</div>
			<div class="stat-content">
				<p class="stat-label">Total Peserta</p>
				<p class="stat-value">{stats.total}</p>
			</div>
		</div>
		<div class="stat-card">
			<div class="stat-icon">💡</div>
			<div class="stat-content">
				<p class="stat-label">Inovator</p>
				<p class="stat-value">{stats.resultCounts.inovator}</p>
			</div>
		</div>
		<div class="stat-card">
			<div class="stat-icon">🎨</div>
			<div class="stat-content">
				<p class="stat-label">Kreator</p>
				<p class="stat-value">{stats.resultCounts.kreator}</p>
			</div>
		</div>
		<div class="stat-card">
			<div class="stat-icon">📚</div>
			<div class="stat-content">
				<p class="stat-label">Pendidik</p>
				<p class="stat-value">{stats.resultCounts.pendidik}</p>
			</div>
		</div>
		<div class="stat-card">
			<div class="stat-icon">🌿</div>
			<div class="stat-content">
				<p class="stat-label">Pelestari</p>
				<p class="stat-value">{stats.resultCounts.pelestari}</p>
			</div>
		</div>
	</div>

	{#if submissions.length === 0}
		<div class="empty-state">
			<p>Belum ada data kuis yang tersimpan.</p>
		</div>
	{:else}
		<div class="table-container">
			<table class="rekap-table">
				<thead>
					<tr>
						<th>No</th>
						<th>Nama</th>
						<th>Nomor HP</th>
						<th>Hasil</th>
						<th>Jawaban A</th>
						<th>Jawaban B</th>
						<th>Jawaban C</th>
						<th>Jawaban D</th>
						<th>Waktu Submit</th>
					</tr>
				</thead>
				<tbody>
					{#each submissions as submission, index}
						<tr>
							<td>{index + 1}</td>
							<td class="name-cell">{submission.biodata.nama}</td>
							<td>{submission.biodata.nomorHP}</td>
							<td class="result-cell">
								<span class="result-badge result-{submission.result.type}">
									{getResultLabel(submission.result.type)}
								</span>
							</td>
							<td class="count-cell">{submission.result.counts.a}</td>
							<td class="count-cell">{submission.result.counts.b}</td>
							<td class="count-cell">{submission.result.counts.c}</td>
							<td class="count-cell">{submission.result.counts.d}</td>
							<td class="date-cell">{formatDate(submission.submittedAt)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>

<style>
	.rekap-container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 2rem;
	}

	.rekap-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
		flex-wrap: wrap;
		gap: 1rem;
	}

	h2 {
		color: #212529;
		margin: 0;
		font-size: 1.5rem;
		font-weight: 600;
	}

	.btn-download {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.625rem 1.25rem;
		background: #212529;
		color: white;
		border: none;
		border-radius: 6px;
		font-size: 0.9rem;
		font-weight: 500;
		cursor: pointer;
		transition: background 0.2s;
	}

	.btn-download:hover {
		background: #343a40;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 0.75rem;
		margin-bottom: 2rem;
	}

	.stat-card {
		background: white;
		padding: 1.25rem;
		border-radius: 6px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
		border: 1px solid #e9ecef;
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.stat-icon {
		font-size: 1.75rem;
		width: 50px;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #f8f9fa;
		border-radius: 8px;
	}

	.stat-content {
		flex: 1;
	}

	.stat-label {
		margin: 0;
		color: #6c757d;
		font-size: 0.8rem;
		font-weight: 500;
	}

	.stat-value {
		margin: 0.25rem 0 0 0;
		color: #212529;
		font-size: 1.5rem;
		font-weight: 600;
	}

	.empty-state {
		background: white;
		padding: 3rem;
		border-radius: 6px;
		text-align: center;
		color: #6c757d;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
		border: 1px solid #e9ecef;
	}

	.table-container {
		background: white;
		border-radius: 6px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
		border: 1px solid #e9ecef;
		overflow: hidden;
	}

	.rekap-table {
		width: 100%;
		border-collapse: collapse;
	}

	.rekap-table thead {
		background: #f8f9fa;
	}

	.rekap-table th {
		padding: 0.875rem 1rem;
		text-align: left;
		font-weight: 600;
		color: #495057;
		border-bottom: 1px solid #dee2e6;
		white-space: nowrap;
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.3px;
	}

	.rekap-table td {
		padding: 0.875rem 1rem;
		border-bottom: 1px solid #f1f3f5;
		color: #495057;
		font-size: 0.9rem;
	}

	.rekap-table tbody tr:hover {
		background: #f8f9fa;
	}

	.rekap-table tbody tr:last-child td {
		border-bottom: none;
	}

	.name-cell {
		font-weight: 500;
		color: #212529;
	}

	.result-cell {
		text-align: center;
	}

	.result-badge {
		display: inline-block;
		padding: 0.375rem 0.75rem;
		border-radius: 4px;
		font-weight: 500;
		font-size: 0.8rem;
		white-space: nowrap;
	}

	.result-inovator {
		background: #e9ecef;
		color: #495057;
	}

	.result-kreator {
		background: #e9ecef;
		color: #495057;
	}

	.result-pendidik {
		background: #e9ecef;
		color: #495057;
	}

	.result-pelestari {
		background: #e9ecef;
		color: #495057;
	}

	.count-cell {
		text-align: center;
		font-weight: 600;
		color: #212529;
		font-size: 0.9rem;
	}

	.date-cell {
		white-space: nowrap;
		font-size: 0.85rem;
		color: #6c757d;
	}

	@media (max-width: 1200px) {
		.table-container {
			overflow-x: auto;
		}

		.rekap-table {
			min-width: 900px;
		}
	}

	@media (max-width: 768px) {
		.rekap-container {
			padding: 1rem;
		}

		h2 {
			font-size: 1.5rem;
		}

		.stats-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
