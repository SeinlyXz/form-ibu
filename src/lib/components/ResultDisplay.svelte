<script lang="ts">
	import type { QuizSubmission } from '$lib/types/quiz';

	interface Props {
		result: QuizSubmission;
		onRestart: () => void;
	}

	let { result, onRestart }: Props = $props();

	const resultInfo = $derived.by(() => {
		switch (result.result.type) {
			case 'inovator':
				return {
					title: 'INOVATOR',
					description:
						'Kamu adalah seorang inovator! Kamu memiliki kemampuan luar biasa dalam menemukan solusi baru dan menciptakan ide-ide kreatif untuk memecahkan masalah.',
					icon: '💡',
					color: '#495057'
				};
			case 'kreator':
				return {
					title: 'KREATOR',
					description:
						'Kamu adalah seorang kreator! Kamu memiliki bakat dalam menciptakan karya yang estetik dan menarik. Desain, seni, dan konten kreatif adalah duniamu.',
					icon: '🎨',
					color: '#495057'
				};
			case 'pendidik':
				return {
					title: 'PENDIDIK',
					description:
						'Kamu adalah seorang pendidik! Kamu senang berbagi pengetahuan dan membantu orang lain tumbuh. Kemampuanmu dalam mengajar dan menginspirasi adalah kekuatan terbesarmu.',
					icon: '📚',
					color: '#495057'
				};
			case 'pelestari':
				return {
					title: 'PELESTARI',
					description:
						'Kamu adalah seorang pelestari! Kamu memiliki kepedulian tinggi terhadap budaya dan nilai-nilai lokal. Kamu mampu menjaga tradisi sambil tetap relevan di era modern.',
					icon: '🌿',
					color: '#495057'
				};
		}
	});
</script>

<div class="result-display">
	<div class="result-card">
		<div class="result-icon">{resultInfo.icon}</div>
		<h2>{resultInfo.title}</h2>
		<p class="result-description">{resultInfo.description}</p>

		<div class="score-breakdown">
			<h3>Rincian Jawaban</h3>
			<div class="scores">
				<div class="score-item">
					<span class="score-label">Pilihan A (Inovator)</span>
					<span class="score-value">{result.result.counts.a}</span>
				</div>
				<div class="score-item">
					<span class="score-label">Pilihan B (Kreator)</span>
					<span class="score-value">{result.result.counts.b}</span>
				</div>
				<div class="score-item">
					<span class="score-label">Pilihan C (Pendidik)</span>
					<span class="score-value">{result.result.counts.c}</span>
				</div>
				<div class="score-item">
					<span class="score-label">Pilihan D (Pelestari)</span>
					<span class="score-value">{result.result.counts.d}</span>
				</div>
			</div>
		</div>

		<div class="user-info">
			<p><strong>Nama:</strong> {result.biodata.nama}</p>
			<p><strong>Nomor HP:</strong> {result.biodata.nomorHP}</p>
		</div>

		<button class="btn-restart" onclick={onRestart}>Mulai Kuis Baru</button>
	</div>
</div>

<style>
	.result-display {
		max-width: 600px;
		margin: 0 auto;
		padding: 2rem;
	}

	.result-card {
		background: white;
		border-radius: 8px;
		padding: 2.5rem 2rem;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
		border: 1px solid #e9ecef;
		text-align: center;
	}

	.result-icon {
		width: 80px;
		height: 80px;
		margin: 0 auto 1.5rem;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2.5rem;
		color: white;
		background: #f8f9fa;
	}

	h2 {
		font-size: 1.75rem;
		margin-bottom: 1rem;
		font-weight: 600;
		color: #212529;
	}

	.result-description {
		font-size: 1rem;
		line-height: 1.6;
		color: #6c757d;
		margin-bottom: 2rem;
	}

	.score-breakdown {
		background: #f8f9fa;
		border-radius: 6px;
		padding: 1.5rem;
		margin-bottom: 1.5rem;
		text-align: left;
		border: 1px solid #e9ecef;
	}

	.score-breakdown h3 {
		font-size: 0.9rem;
		margin-bottom: 1rem;
		color: #495057;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.scores {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.score-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem;
		background: white;
		border-radius: 4px;
		border: 1px solid #e9ecef;
	}

	.score-label {
		color: #495057;
		font-size: 0.9rem;
	}

	.score-value {
		font-weight: 600;
		color: #212529;
		font-size: 1.125rem;
	}

	.user-info {
		background: #f8f9fa;
		border-radius: 6px;
		padding: 1rem;
		margin-bottom: 1.5rem;
		text-align: left;
		border: 1px solid #e9ecef;
	}

	.user-info p {
		margin: 0.5rem 0;
		color: #495057;
		font-size: 0.9rem;
	}

	.btn-restart {
		width: 100%;
		padding: 0.875rem;
		background: #212529;
		color: white;
		border: none;
		border-radius: 6px;
		font-size: 0.95rem;
		font-weight: 500;
		cursor: pointer;
		transition: background 0.2s;
	}

	.btn-restart:hover {
		background: #343a40;
	}
</style>
