"use client"
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { fetchNewsArticles } from '@/api/newsArticles';
import KanjiInfo from '@/components/KanjiInfo';


const News: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(5);
  const [selectedKanji, setSelectedKanji] = useState<any | null>(null);
  const [modalPosition, setModalPosition] = useState<{ top: number, left: number } | null>(null);
  const storageKey = 'newsArticles';
  const modalRef = useRef<HTMLDivElement>(null);


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

  const handleScroll = () => {
    if (selectedKanji && modalPosition && modalRef.current) {
      const rect = modalRef.current.getBoundingClientRect();
      const kanjiRect = document.getElementById(selectedKanji.word)?.getBoundingClientRect();
      if (kanjiRect) {
        setModalPosition({ top: kanjiRect.bottom + window.pageYOffset, left: kanjiRect.left });
      }
    }
  };

  const handleKanjiClick = (kanjiItem: any, event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    console.log("kanji item: " + JSON.stringify(kanjiItem))
    setSelectedKanji(kanjiItem);
    const rect = event.currentTarget.getBoundingClientRect();
    const scrollOffset = window.scrollY;
  
    // Calculate the position of the modal relative to the viewport
    const newPosition = { top: rect.bottom + scrollOffset, left: rect.left };
  
    // Adjust modal position to ensure it's not covering the clicked word
    const modalHeight = 200; // Adjust this value as needed
    const spaceAboveKanji = rect.top - scrollOffset;
    const spaceBelowKanji = window.innerHeight - spaceAboveKanji - rect.height;
    let newModalPosition = newPosition;
    if (spaceBelowKanji < modalHeight) {
      newModalPosition = { top: rect.top - modalHeight, left: rect.left };
    }
  
    setModalPosition(newModalPosition);
  };

  const highlightKanji = (text: string, kanji: any) => {
    if (!text || !kanji || kanji.length === 0 || selectedLevel === null) {
      return text;
    }
  
    const parts = text.split(new RegExp(`(${kanji.map((item: any) => item.word).join('|')})`, 'g'));
    
    return parts.map((part: string, index: number) => {
      const kanjiItem = kanji.find((item: any) => item.word === part && item.level === selectedLevel);
      return kanjiItem ? (
        <span
      key={index}
      id={kanjiItem.word} // Add id attribute to the span
      className={`underline ${getColorByLevel(kanjiItem.level)}`}
      onClick={(e) => handleKanjiClick(kanjiItem, e)}
    >
      {part}
    </span>
  ) : (
    part
      );
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    console.log("hello")
    return () => window.removeEventListener('scroll', handleScroll);

  }, [selectedKanji, modalPosition]);

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

  const handleLevelClick = (level: number) => {
    setSelectedLevel(level);
  };

  const handleCloseModal = () => {
    setSelectedKanji(null);
    setModalPosition(null);
  };

  return (
    <div className="flex flex-col items-center min-w-screen p-4">
      <div className="flex justify-between bg-[#EAD7BB] rounded px-12 py-8 my-8">
        <button className={`bg-blue-300 rounded py-2 px-8  mx-3 ${selectedLevel === 5 ? "bg-blue-500 text-white " : "border-0"}`} style={selectedLevel === 5 ? { outline: '2px solid rgba(0, 0, 0, 0.75)' } : {}} onClick={() => handleLevelClick(5)}>5級</button>

        <button className={`py-2 px-8 rounded mx-3 ${selectedLevel === 4 ? "bg-green-600 text-white " : "bg-green-400 border-0"}`} style={selectedLevel === 4 ? { outline: '2px solid rgba(0, 0, 0, 0.75)' } : {}} onClick={() => handleLevelClick(4)}>4級</button>

        <button className={`py-2 px-8 rounded mx-3 ${selectedLevel === 3 ? "bg-yellow-400 text-black " : "bg-yellow-300 border-0"}`} style={selectedLevel === 3 ? { outline: '2px solid rgba(0, 0, 0, 0.75)' } : {}} onClick={() => handleLevelClick(3)}>3級</button>

        <button className={`py-2 px-8 rounded mx-3 ${selectedLevel === 2 ? "bg-orange-500 text-black " : "bg-orange-400 border-0"}`} style={selectedLevel === 2 ? { outline: '2px solid rgba(0, 0, 0, 0.75)' } : {}} onClick={() => handleLevelClick(2)}>2級</button>

        <button className={`py-2 px-8 rounded mx-3 ${selectedLevel === 1 ? "bg-red-500 text-black " : "bg-red-400 border-0"}`} style={selectedLevel === 1 ? { outline: '2px solid rgba(0, 0, 0, 0.75)' } : {}} onClick={() => handleLevelClick(1)}>1級</button>
      </div>
      {articles.map((article, index) => (
        <div key={index} className="my-8 w-[600px]">
          <h2 className="text-xl font-bold">
            {highlightKanji(article.title, article.matchedKanji)}
          </h2>
          <p className="text-base my-4">
            {highlightKanji(article.description, article.matchedKanji)}
          </p>
          {selectedKanji && modalPosition && (
            <div ref={modalRef} style={{ position: 'absolute', top: modalPosition.top, left: modalPosition.left }}>
              <KanjiInfo kanji={selectedKanji.word} level={selectedKanji.level} furigana={selectedKanji.furigana} meaning={selectedKanji.meaning} jlptLevel={selectedKanji.level} onClose={handleCloseModal}/>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default News