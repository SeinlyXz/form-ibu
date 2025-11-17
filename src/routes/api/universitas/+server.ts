import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
  const keyword = url.searchParams.get('keyword') || '';
  const halaman = parseInt(url.searchParams.get('halaman') || '1');
  const perHalaman = parseInt(url.searchParams.get('perHalaman') || '10');

  if (!keyword || keyword.length < 2) {
    return json({
      data: {
        semuaPerguruanTinggi: {
          data: [],
          pagination: {
            total: 0,
            halaman: 1,
            perHalaman: 10,
            totalHalaman: 0
          }
        }
      }
    });
  }

  try {
    const query = `
			{
				semuaPerguruanTinggi(keyword: "${keyword}", halaman: ${halaman}, perHalaman: ${perHalaman}) {
					data {
						nama
						provinsi
					}
					pagination {
						total
						halaman
						perHalaman
						totalHalaman
					}
				}
			}
		`;

    const response = await fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    });

    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.statusText}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    return json(result);
  } catch (error) {
    console.error('Error fetching universitas:', error);
    return json(
      {
        error: 'Gagal mengambil data universitas',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
};
