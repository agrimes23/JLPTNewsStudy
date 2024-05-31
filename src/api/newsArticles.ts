import axios from 'axios';

export const fetchNewsArticles = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/news');
    console.log("aticles: " + JSON.stringify(response.data))
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news articles:', error);
    throw error;
  }
};