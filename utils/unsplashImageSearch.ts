// utils/imageSearch.ts

/**
 * Searches for images using the Unsplash API.
 * @param query The search term for the images.
 * @param limit The maximum number of images to return.
 * @returns A promise that resolves to an array of image URLs.
 */
export async function searchImages(query: string, limit: number = 1): Promise<string[]> {
  // Ambil Access Key dari environment variable untuk keamanan
  const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

  if (!accessKey) {
    console.error("Unsplash Access Key is missing. Please set it in your environment variables.");
    // Kembalikan placeholder jika key tidak ada
    return Array(limit).fill(`https://via.placeholder.com/400x300?text=API+Key+Missing`);
  }

  const apiUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
    query
  )}&per_page=${limit}&client_id=${accessKey}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
        // Tangani jika response dari API tidak sukses (misal: error 4xx atau 5xx)
        console.error(`Unsplash API error: ${response.status} ${response.statusText}`);
        const errorData = await response.json();
        console.error('Error details:', errorData);
        return Array(limit).fill(`https://via.placeholder.com/400x300?text=Error+Fetching+Image`);
    }
    
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      // Ubah hasil array dari API menjadi array yang berisi URL gambar saja
      return data.results.map((image: any) => image.urls.regular);
    }
    
    // Jika tidak ada hasil yang ditemukan
    return [`https://via.placeholder.com/400x300?text=No+Image+Found+For+${encodeURIComponent(query)}`];

  } catch (error) {
    console.error('Unsplash search failed:', error);
    // Jika terjadi error pada proses fetch (misal: masalah jaringan)
    return [`https://via.placeholder.com/400x300?text=Search+Failed`];
  }
}