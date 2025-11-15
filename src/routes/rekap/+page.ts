import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  try {
    const response = await fetch('/api/quiz');

    if (!response.ok) {
      throw new Error('Failed to fetch submissions');
    }

    const data = await response.json();

    return {
      submissions: data.submissions || [],
      total: data.total || 0
    };
  } catch (error) {
    console.error('Error loading submissions:', error);
    return {
      submissions: [],
      total: 0,
      error: 'Gagal memuat data'
    };
  }
};
