<script lang="ts">
	import type { QuizQuestion, QuizAnswer } from '$lib/types/quiz';

	interface Props {
		questions: QuizQuestion[];
		answers: QuizAnswer[];
		onComplete: () => void;
		onBack: () => void;
	}

	let { questions, answers = $bindable(), onComplete, onBack }: Props = $props();

	let currentQuestionIndex = $state(0);
	let error = $state('');

	const currentQuestion = $derived(questions[currentQuestionIndex]);
	const isLastQuestion = $derived(currentQuestionIndex === questions.length - 1);
	const progress = $derived(((currentQuestionIndex + 1) / questions.length) * 100);

	function selectAnswer(answer: 'a' | 'b' | 'c' | 'd') {
		const existingAnswerIndex = answers.findIndex((a) => a.questionNo === currentQuestion.no);

		if (existingAnswerIndex !== -1) {
			answers[existingAnswerIndex] = {
				questionNo: currentQuestion.no,
				answer
			};
		} else {
			answers.push({
				questionNo: currentQuestion.no,
				answer
			});
		}

		error = '';
	}

	function getCurrentAnswer() {
		return answers.find((a) => a.questionNo === currentQuestion.no)?.answer;
	}

	function handleNext() {
		if (!getCurrentAnswer()) {
			error = 'Silakan pilih salah satu jawaban';
			return;
		}

		if (isLastQuestion) {
			onComplete();
		} else {
			currentQuestionIndex++;
			error = '';
		}
	}

	function handlePrevious() {
		if (currentQuestionIndex > 0) {
			currentQuestionIndex--;
			error = '';
		} else {
			onBack();
		}
	}
</script>

<div class="quiz-form">
	<div class="progress-bar">
		<div class="progress-fill" style="width: {progress}%"></div>
	</div>

	<div class="quiz-header">
		<h2>Pertanyaan {currentQuestion.no} dari {questions.length}</h2>
		<p class="question-text">{currentQuestion.pertanyaan}</p>
	</div>

	<div class="options">
		{#each Object.entries(currentQuestion.pilihan) as [key, value]}
			<button
				class="option-btn"
				class:selected={getCurrentAnswer() === key}
				onclick={() => selectAnswer(key as 'a' | 'b' | 'c' | 'd')}
			>
				<span class="option-label">{key.toUpperCase()}</span>
				<span class="option-text">{value}</span>
			</button>
		{/each}
	</div>

	{#if error}
		<p class="error-message">{error}</p>
	{/if}

	<div class="navigation">
		<button class="btn-secondary" onclick={handlePrevious}>
			{currentQuestionIndex === 0 ? 'Kembali ke Biodata' : 'Sebelumnya'}
		</button>
		<button class="btn-primary" onclick={handleNext}>
			{isLastQuestion ? 'Selesai' : 'Selanjutnya'}
		</button>
	</div>
</div>

<style>
	.quiz-form {
		max-width: 700px;
		margin: 0 auto;
		padding: 2.5rem;
		background: white;
		border-radius: 8px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
		border: 1px solid #e9ecef;
	}

	.progress-bar {
		width: 100%;
		height: 6px;
		background: #e9ecef;
		border-radius: 3px;
		margin-bottom: 2rem;
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background: #212529;
		transition: width 0.3s ease;
	}

	.quiz-header {
		margin-bottom: 2rem;
	}

	h2 {
		color: #6c757d;
		margin-bottom: 1rem;
		font-size: 0.9rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.question-text {
		font-size: 1.25rem;
		color: #212529;
		font-weight: 500;
		line-height: 1.6;
	}

	.options {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-bottom: 1.5rem;
	}

	.option-btn {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem 1.25rem;
		background: #fff;
		border: 1px solid #dee2e6;
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.2s;
		text-align: left;
	}

	.option-btn:hover {
		border-color: #495057;
		background: #f8f9fa;
	}

	.option-btn.selected {
		background: #212529;
		border-color: #212529;
		color: white;
	}

	.option-label {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		background: #f8f9fa;
		border-radius: 50%;
		font-weight: 600;
		color: #495057;
		flex-shrink: 0;
		font-size: 0.875rem;
	}

	.option-btn.selected .option-label {
		background: white;
		color: #212529;
	}

	.option-text {
		flex: 1;
		font-size: 0.95rem;
		line-height: 1.5;
		color: inherit;
	}

	.error-message {
		color: #dc3545;
		text-align: center;
		margin-bottom: 1rem;
		font-weight: 500;
		font-size: 0.9rem;
	}

	.navigation {
		display: flex;
		gap: 0.75rem;
		justify-content: space-between;
	}

	.btn-primary,
	.btn-secondary {
		flex: 1;
		padding: 0.875rem;
		border: none;
		border-radius: 6px;
		font-size: 0.95rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
	}

	.btn-primary {
		background: #212529;
		color: white;
	}

	.btn-primary:hover {
		background: #343a40;
	}

	.btn-secondary {
		background: #fff;
		color: #495057;
		border: 1px solid #ced4da;
	}

	.btn-secondary:hover {
		background: #f8f9fa;
		border-color: #adb5bd;
	}
</style>
