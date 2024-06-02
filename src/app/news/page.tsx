"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchNewsArticles } from '@/api/newsArticles';
import KanjiInfo from '@/components/KanjiInfo';


const News: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const storageKey = 'newsArticles';

  useEffect(() => {
    const fetchData = async () => {
      const storedData = localStorage.getItem(storageKey);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const now = new Date();

        if (new Date(parsedData.timestamp) > now) {
          setArticles(parsedData.articles);
          return;
        } else {
          localStorage.removeItem(storageKey);
        }
      }

      try {
        const articlesData = await fetchNewsArticles();
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 1);

        const dataToStore = {
          articles: articlesData,
          timestamp: expirationDate,
        };

        localStorage.setItem(storageKey, JSON.stringify(dataToStore));
        setArticles(articlesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const highlightKanji = (text: string, kanji: any) => {
    if (!text || !kanji || kanji.length === 0) {
      return text; // Return the original text if there are no articles or kanji data
    }
  
    const parts = text.split(new RegExp(`(${kanji.map((item: any) => item.word).join('|')})`, 'g'));
    // Rest of your function logic

    return parts.map((part: any, index: number) => {
      const kanjiItem = kanji.find((item: any) => item.word === part);
      return kanjiItem ? (
        <span key={index} className={`underline ${getColorByLevel(kanjiItem.level)}`}>{part}</span>
      ) : (
        part
      );
    });
  };

  const getColorByLevel = (level: any) => {
    switch(level) {
      case 1: return 'text-red-500';
      case 2: return 'text-orange-500';
      case 3: return 'text-yellow-500';
      case 4: return 'text-green-500';
      case 5: return 'text-blue-500';
      default: return 'text-black';
    }
  };

  return (
    <div className="flex flex-col items-center min-w-screen p-4">
          <KanjiInfo />

      {articles.map((article, index) => (
        <div key={index} className="my-8 w-[600px]">
          <h2 className="text-xl font-bold">
            {highlightKanji(article.title, article.matchedKanji)}
          </h2>
          <p className="text-base my-4">
            {highlightKanji(article.description, article.matchedKanji)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default News