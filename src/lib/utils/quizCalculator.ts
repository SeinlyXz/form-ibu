import type { QuizAnswer } from '$lib/types/quiz';

export function calculateQuizResult(answers: QuizAnswer[]) {
  const counts = {
    a: 0,
    b: 0,
    c: 0,
    d: 0
  };

  answers.forEach((answer) => {
    counts[answer.answer]++;
  });

  // Determine the result type based on highest count
  let maxCount = 0;
  let resultType: 'inovator' | 'kreator' | 'pendidik' | 'pelestari' = 'inovator';

  if (counts.a > maxCount) {
    maxCount = counts.a;
    resultType = 'inovator';
  }
  if (counts.b > maxCount) {
    maxCount = counts.b;
    resultType = 'kreator';
  }
  if (counts.c > maxCount) {
    maxCount = counts.c;
    resultType = 'pendidik';
  }
  if (counts.d > maxCount) {
    maxCount = counts.d;
    resultType = 'pelestari';
  }

  return {
    type: resultType,
    counts
  };
}
