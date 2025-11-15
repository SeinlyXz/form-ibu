<script lang="ts">
	import BiodataForm from '$lib/components/BiodataForm.svelte';
	import QuizForm from '$lib/components/QuizForm.svelte';
	import ResultDisplay from '$lib/components/ResultDisplay.svelte';
	import { quizQuestions } from '$lib/data/questions';
	import { calculateQuizResult } from '$lib/utils/quizCalculator';
	import type { BiodataForm as BiodataType, QuizAnswer, QuizSubmission } from '$lib/types/quiz';

	type Step = 'biodata' | 'quiz' | 'result';

	let currentStep = $state<Step>('biodata');
	let biodata = $state<BiodataType>({ nama: '', nomorHP: '' });
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
		biodata = { nama: '', nomorHP: '' };
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

<div class="app-container">
	<header class="app-header">
		<h1 class="app-title">🪞 Cermin Karsa</h1>
		<p class="app-subtitle">Temukan potensi wirausahamu</p>
	</header>

	<main class="app-main">
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

		{#if isSubmitting}
			<div class="loading-overlay">
				<div class="loading-spinner"></div>
				<p>Menyimpan hasil kuis...</p>
			</div>
		{/if}

		{#if submitError}
			<div class="error-banner">
				{submitError}
				<button onclick={() => (submitError = '')}>×</button>
			</div>
		{/if}
	</main>

	<footer class="app-footer">
		<p>© 2025 Cermin Karsa. Game untuk mengenali potensi wirausahamu.</p>
	</footer>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family:
			-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
		background: #f8f9fa;
		min-height: 100vh;
	}

	.app-container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.app-header {
		text-align: center;
		padding: 3rem 1rem 2rem;
		background: white;
		border-bottom: 1px solid #e9ecef;
	}

	.app-title {
		font-size: 2rem;
		margin: 0 0 0.5rem 0;
		font-weight: 600;
		color: #212529;
	}

	.app-subtitle {
		font-size: 1rem;
		margin: 0;
		color: #6c757d;
		font-weight: 400;
	}

	.app-main {
		flex: 1;
		padding: 2rem 1rem;
		position: relative;
	}

	.app-footer {
		text-align: center;
		padding: 1.5rem;
		color: #6c757d;
		font-size: 0.875rem;
		background: white;
		border-top: 1px solid #e9ecef;
	}

	.loading-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(255, 255, 255, 0.95);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #495057;
		z-index: 1000;
		backdrop-filter: blur(4px);
	}

	.loading-spinner {
		width: 50px;
		height: 50px;
		border: 3px solid #e9ecef;
		border-top-color: #495057;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin-bottom: 1rem;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.error-banner {
		position: fixed;
		top: 20px;
		left: 50%;
		transform: translateX(-50%);
		background: white;
		color: #dc3545;
		padding: 1rem 2rem;
		border-radius: 8px;
		border: 1px solid #dc3545;
		box-shadow: 0 2px 12px rgba(220, 53, 69, 0.15);
		display: flex;
		align-items: center;
		gap: 1rem;
		z-index: 1001;
		max-width: 90%;
	}

	.error-banner button {
		background: none;
		border: none;
		color: #dc3545;
		font-size: 1.5rem;
		cursor: pointer;
		padding: 0;
		width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
		transition: background 0.3s;
	}

	.error-banner button:hover {
		background: #f8d7da;
	}

	@media (max-width: 768px) {
		.app-title {
			font-size: 2rem;
		}

		.app-subtitle {
			font-size: 1rem;
		}
	}
</style>
