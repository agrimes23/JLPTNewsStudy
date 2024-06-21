import axios from 'axios';

export const fetchNewsArticles = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/news`);
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news articles:', error);
    throw error;
  }
};