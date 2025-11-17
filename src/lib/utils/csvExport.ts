import type { QuizSubmission } from '$lib/types/quiz';

export function generateCSV(submissions: QuizSubmission[]): string {
  // CSV Header
  const headers = [
    'No',
    'Nama',
    'Nomor HP',
    'Universitas',
    'Provinsi',
    'Hasil',
    'Jawaban A',
    'Jawaban B',
    'Jawaban C',
    'Jawaban D',
    'Waktu Submit'
  ];

  // CSV Rows
  const rows = submissions.map((submission, index) => {
    const resultLabels = {
      inovator: 'Inovator',
      kreator: 'Kreator',
      pendidik: 'Pendidik',
      pelestari: 'Pelestari'
    };

    return [
      index + 1,
      `"${submission.biodata.nama}"`, // Wrap in quotes to handle commas in names
      submission.biodata.nomorHP,
      `"${submission.biodata.universitas}"`,
      `"${submission.biodata.provinsi || '-'}"`,
      resultLabels[submission.result.type],
      submission.result.counts.a,
      submission.result.counts.b,
      submission.result.counts.c,
      submission.result.counts.d,
      `"${new Date(submission.submittedAt).toLocaleString('id-ID')}"` // Format date
    ];
  });

  // Combine headers and rows
  const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

  return csvContent;
}

export function downloadCSV(csvContent: string, filename: string = 'rekap-kuis-cermin-karsa.csv') {
  // Add BOM for Excel compatibility with UTF-8
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });

  // Create download link
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Clean up
  URL.revokeObjectURL(url);
}

export function exportSubmissionsToCSV(submissions: QuizSubmission[]) {
  const csv = generateCSV(submissions);
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `rekap-kuis-cermin-karsa-${timestamp}.csv`;
  downloadCSV(csv, filename);
}
