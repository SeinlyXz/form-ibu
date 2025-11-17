<script lang="ts">
	import BiodataForm from '$lib/components/BiodataForm.svelte';
	import QuizForm from '$lib/components/QuizForm.svelte';
	import ResultDisplay from '$lib/components/ResultDisplay.svelte';
	import { quizQuestions } from '$lib/data/questions';
	import { calculateQuizResult } from '$lib/utils/quizCalculator';
	import type { BiodataForm as BiodataType, QuizAnswer, QuizSubmission } from '$lib/types/quiz';

	type Step = 'biodata' | 'quiz' | 'result';

	let currentStep = $state<Step>('biodata');
	let biodata = $state<BiodataType>({ nama: '', nomorHP: '', universitas: '' });
	let answers = $state<QuizAnswer[]>([]);
	let quizResult = $state<QuizSubmission | null>(null);
	let isSubmitting = $state(false);
	let submitError = $state('');

	async function handleQuizComplete() {
		isSubmitting = true;
		submitError = '';

		try {
			const result = calculateQuizResult(answers);

			const submission: QuizSubmission = {
				biodata,
				answers,
				result,
				submittedAt: new Date().toISOString()
			};

			const response = await fetch('/api/quiz', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(submission)
			});

			if (!response.ok) {
				throw new Error('Failed to submit quiz');
			}

			const data = await response.json();
			quizResult = submission;
			currentStep = 'result';
		} catch (error) {
			console.error('Error submitting quiz:', error);
			submitError = 'Gagal menyimpan hasil kuis. Silakan coba lagi.';
		} finally {
			isSubmitting = false;
		}
	}

	function handleRestart() {
		currentStep = 'biodata';
		biodata = { nama: '', nomorHP: '', universitas: '' };
		answers = [];
		quizResult = null;
		submitError = '';
	}

	function goToQuiz() {
		currentStep = 'quiz';
	}

	function goToBiodata() {
		currentStep = 'biodata';
	}
</script>

<svelte:head>
	<title>Cermin Karsa - Temukan Potensi Wirausahamu</title>
	<meta
		name="description"
		content="Cermin Karsa adalah game interaktif untuk membantu kamu mengenali potensi wirausaha berdasarkan kepribadianmu."
	/>
</svelte:head>

<div class="flex min-h-screen flex-col bg-gray-50">
	<header class="border-b border-gray-200 bg-white">
		<div class="mx-auto max-w-4xl px-4 py-12 text-center">
			<h1 class="mb-2 text-3xl font-semibold text-gray-900 md:text-4xl">🪞 Cermin Karsa</h1>
			<p class="text-base text-gray-600">Temukan potensi wirausahamu</p>
		</div>
	</header>

	<main class="relative flex-1 px-4 py-8">
		<div class="mx-auto max-w-4xl">
			{#if currentStep === 'biodata'}
				<BiodataForm bind:biodata onNext={goToQuiz} />
			{:else if currentStep === 'quiz'}
				<QuizForm
					questions={quizQuestions}
					bind:answers
					onComplete={handleQuizComplete}
					onBack={goToBiodata}
				/>
			{:else if currentStep === 'result' && quizResult}
				<ResultDisplay result={quizResult} onRestart={handleRestart} />
			{/if}
		</div>

		{#if isSubmitting}
			<div
				class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm"
			>
				<div
					class="mb-4 h-12 w-12 animate-spin rounded-full border-3 border-gray-200 border-t-gray-700"
				></div>
				<p class="text-gray-700">Menyimpan hasil kuis...</p>
			</div>
		{/if}

		{#if submitError}
			<div
				class="fixed top-5 left-1/2 z-50 flex max-w-[90%] -translate-x-1/2 items-center gap-4 rounded-lg border border-red-600 bg-white px-8 py-4 text-red-600 shadow-lg"
			>
				<span>{submitError}</span>
				<button
					onclick={() => (submitError = '')}
					class="flex h-8 w-8 items-center justify-center rounded text-2xl text-red-600 transition-colors hover:bg-red-50"
					>×</button
				>
			</div>
		{/if}
	</main>

	<footer class="border-t border-gray-200 bg-white">
		<div class="mx-auto max-w-4xl px-4 py-6 text-center">
			<p class="text-sm text-gray-600">
				© 2025 Cermin Karsa. Game untuk mengenali potensi wirausahamu.
			</p>
		</div>
	</footer>
</div>
