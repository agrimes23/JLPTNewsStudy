import React, { useEffect, useState } from 'react'
import { useFlashcardDeck } from '@/context/FlashcardContext'

const KanjiLevelBar = (deckId: any) => {
    const { getDeck } = useFlashcardDeck();
    const [jlptCounts, setJlptCounts] = useState<{ [key: string]: number }>({
        N5: 0,
        N4: 0,
        N3: 0,
        N2: 0,
        N1: 0,
      });
  
      useEffect(() => {
        const fetchJLPTLevels = async () => {
          try {
            // Check if deckId is valid
            if (typeof deckId.deckId !== 'string' || deckId.deckId.length !== 24) {
              console.error('Invalid deckId:', deckId.deckId);
              return;
            }
    
            const deck = await getDeck(deckId.deckId);
            if (deck && deck.flashcards) {
              const counts = { N5: 0, N4: 0, N3: 0, N2: 0, N1: 0 };
              deck.flashcards.forEach((flashcard) => {
                const level = flashcard.jlptLevel;
                if (level.includes('5')) counts.N5++;
                else if (level.includes('4')) counts.N4++;
                else if (level.includes('3')) counts.N3++;
                else if (level.includes('2')) counts.N2++;
                else if (level.includes('1')) counts.N1++;
              });
              setJlptCounts(counts);
            } else {
              console.error('No flashcards found for deckId:', deckId.deckId);
            }
          } catch (error) {
            console.error('Error fetching JLPT levels:', error);
          }
        };
    
        fetchJLPTLevels();
      }, [deckId.deckId, getDeck]);
    
      // Calculate the total number of flashcards
      const totalFlashcards = Object.values(jlptCounts).reduce((sum, count) => sum + count, 0);
    
      const getColorForLevel = (level: string) => {
        switch (level) {
          case 'N5':
            return '#4299e1'; // Blue
          case 'N4':
            return '#48bb78'; // Green
          case 'N3':
            return '#ecc94b'; // Yellow
          case 'N2':
            return '#ed8936'; // Orange
          case 'N1':
            return '#f56565'; // Red
          default:
            return '#e2e8f0'; // Gray for unknown levels
        }
      };


      return (
        <div className="w-full h-2 flex rounded-lg overflow-hidden border border-gray-300">
          {Object.entries(jlptCounts).map(([level, count]) => {
            const percentage = totalFlashcards > 0 ? (count / totalFlashcards) * 100 : 0;
    
            return (
              <div
                key={level}
                style={{
                  width: `${percentage}%`,
                  backgroundColor: getColorForLevel(level),
                }}
                title={`${level}: ${count} (${percentage.toFixed(1)}%)`}
              />
            );
          })}
        </div>
      );
    };

export default KanjiLevelBar