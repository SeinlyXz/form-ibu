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

<div class="mx-auto max-w-3xl">
	<div class="rounded-lg border border-gray-200 bg-white p-8 shadow-sm md:p-10">
		<!-- Progress Bar -->
		<div class="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
			<div
				class="h-full bg-gray-900 transition-all duration-300 ease-out"
				style="width: {progress}%"
			></div>
		</div>

		<!-- Question Header -->
		<div class="mb-8">
			<p class="mb-3 text-xs font-semibold tracking-wider text-gray-500 uppercase">
				Pertanyaan {currentQuestion.no} dari {questions.length}
			</p>
			<h2 class="text-xl leading-relaxed font-medium text-gray-900 md:text-2xl">
				{currentQuestion.pertanyaan}
			</h2>
		</div>

		<!-- Options -->
		<div class="mb-6 space-y-3">
			{#each Object.entries(currentQuestion.pilihan) as [key, value]}
				<button
					onclick={() => selectAnswer(key as 'a' | 'b' | 'c' | 'd')}
					class="flex w-full items-center gap-4 rounded-lg border px-5 py-4 text-left transition-all {getCurrentAnswer() ===
					key
						? 'border-gray-900 bg-gray-900 text-white'
						: 'border-gray-300 bg-white text-gray-900 hover:border-gray-700 hover:bg-gray-50'}"
				>
					<span
						class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold {getCurrentAnswer() ===
						key
							? 'bg-white text-gray-900'
							: 'bg-gray-100 text-gray-600'}"
					>
						{key.toUpperCase()}
					</span>
					<span class="text-[15px] leading-relaxed">{value}</span>
				</button>
			{/each}
		</div>

		<!-- Error Message -->
		{#if error}
			<p class="mb-4 text-center text-sm font-medium text-red-600">{error}</p>
		{/if}

		<!-- Navigation -->
		<div class="flex gap-3">
			<button
				onclick={handlePrevious}
				class="flex-1 rounded-md border border-gray-300 bg-white px-4 py-3 font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50"
			>
				{currentQuestionIndex === 0 ? 'Kembali ke Biodata' : 'Sebelumnya'}
			</button>
			<button
				onclick={handleNext}
				class="flex-1 rounded-md bg-gray-900 px-4 py-3 font-medium text-white transition-colors hover:bg-gray-800"
			>
				{isLastQuestion ? 'Selesai' : 'Selanjutnya'}
			</button>
		</div>
	</div>
</div>
