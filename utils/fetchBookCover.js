import axios from 'axios';

async function fetchBookCover(title) {
  try {
    const searchResponse = await axios.get(`https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`);
    const searchResults = searchResponse.data.docs;

    if (searchResults.length > 0) {
      const coverId = searchResults[0].cover_i;
      return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
    } else {
      return 'https://covers.openlibrary.org/b/id/8225261-L.jpg';
    }
  } catch (error) {
    console.error('Error fetching book cover:', error);
    return 'https://covers.openlibrary.org/b/id/8225261-L.jpg';
  }
}

export default fetchBookCover;
