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
						'Anda adalah seorang inovator! Anda memiliki kemampuan luar biasa dalam menemukan solusi baru dan menciptakan ide-ide kreatif untuk memecahkan masalah.',
					icon: '💡',
					color: '#495057'
				};
			case 'kreator':
				return {
					title: 'KREATOR',
					description:
						'Anda adalah seorang kreator! Anda memiliki bakat dalam menciptakan karya yang estetik dan menarik. Desain, seni, dan konten kreatif adalah duniamu.',
					icon: '🎨',
					color: '#495057'
				};
			case 'pendidik':
				return {
					title: 'PENDIDIK',
					description:
						'Anda adalah seorang pendidik! Anda senang berbagi pengetahuan dan membantu orang lain tumbuh. Kemampuanmu dalam mengajar dan menginspirasi adalah kekuatan terbesarmu.',
					icon: '📚',
					color: '#495057'
				};
			case 'pelestari':
				return {
					title: 'PELESTARI',
					description:
						'Anda adalah seorang pelestari! Anda memiliki kepedulian tinggi terhadap budaya dan nilai-nilai lokal. Anda mampu menjaga tradisi sambil tetap relevan di era modern.',
					icon: '🌿',
					color: '#495057'
				};
		}
	});
</script>

<div class="mx-auto max-w-2xl px-4">
	<div class="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm md:p-10">
		<!-- Icon -->
		<div class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
			<span class="text-4xl">{resultInfo.icon}</span>
		</div>

		<!-- Congratulations -->
		<p class="mb-2 text-xs font-semibold tracking-[0.15em] text-gray-500 uppercase">Selamat</p>

		<!-- Title -->
		<h2 class="mb-4 text-2xl font-semibold text-gray-900 md:text-3xl">{resultInfo.title}</h2>

		<!-- Description -->
		<p class="mb-8 text-base leading-relaxed text-gray-600">
			{resultInfo.description}
		</p>

		<!-- Score Breakdown -->
		<div class="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-6 text-left">
			<h3 class="mb-4 text-xs font-semibold tracking-wider text-gray-500 uppercase">
				Rincian Jawaban
			</h3>
			<div class="space-y-2">
				<div
					class="flex items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-3"
				>
					<span class="text-sm text-gray-600">Pilihan A (Inovator)</span>
					<span class="text-lg font-semibold text-gray-900">{result.result.counts.a}</span>
				</div>
				<div
					class="flex items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-3"
				>
					<span class="text-sm text-gray-600">Pilihan B (Kreator)</span>
					<span class="text-lg font-semibold text-gray-900">{result.result.counts.b}</span>
				</div>
				<div
					class="flex items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-3"
				>
					<span class="text-sm text-gray-600">Pilihan C (Pendidik)</span>
					<span class="text-lg font-semibold text-gray-900">{result.result.counts.c}</span>
				</div>
				<div
					class="flex items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-3"
				>
					<span class="text-sm text-gray-600">Pilihan D (Pelestari)</span>
					<span class="text-lg font-semibold text-gray-900">{result.result.counts.d}</span>
				</div>
			</div>
		</div>

		<!-- User Info -->
		<div class="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 text-left">
			<p class="mb-1 text-sm text-gray-600">
				<span class="font-medium">Nama:</span>
				{result.biodata.nama}
			</p>
			<p class="text-sm text-gray-600">
				<span class="font-medium">Nomor HP:</span>
				{result.biodata.nomorHP}
			</p>
		</div>

		<!-- Restart Button -->
		<button
			onclick={onRestart}
			class="w-full rounded-md bg-gray-900 px-4 py-3 font-medium text-white transition-colors hover:bg-gray-800"
		>
			Mulai Kuis Baru
		</button>
	</div>
</div>
