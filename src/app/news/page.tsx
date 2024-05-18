"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import 'tailwindcss/tailwind.css';
import Navbar from '@/components/Navbar';


interface Article {
  id: number;
  title: string;
  description: string;
}

interface Kanji {
  word: string;
}

const NewsPage: React.FC = () => {
  const [kanjiList, setKanjiList] = useState<Kanji[]>([]);
  const [news, setNews] = useState<{ articles: Article[] }>({ articles: [] });
  const [kanjiLevel, setKanjiLevel] = useState<string>("n5")
  const [wordColor, setWordColor] = useState<string>("black")
  // const router = useRouter();
  // const { data: data, refetch: refetchArticles } = useQuery<any>(GET_ARTICLES, {
  //   errorPolicy: "all",
  //   onCompleted: (res: any) => {
  //     setNews(res.getArticles)    
  //     console.log("here again")
  //   },
  //   onError: (error: any) => {
  //     console.error("GraphQL error:", error);
  //   },
  // });

  // const { data: kanjiData, loading: kanjiLoading, error: kanjiError, refetch: refetchKanji } = useQuery(GET_KANJI, {
  //   variables: { level: kanjiLevel },
  //   onCompleted: (res: any) => {
  //     console.log(JSON.stringify(res))
  //     setKanjiList(res.getKanji.word)    
  //   },
  //   onError: (error: any) => {
  //     console.error("GraphQL error:", error);
  //   },
  // });

  const handleClickLevel = async (level: string, color: string) => {
    setWordColor(color)

    try {
      setKanjiLevel(level)
      // refetchKanji({level})
      // refetchArticles()
      console.log("click click: " + level)
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
     
  }

  const formatArticleDescription = (description: string) => {
    const wordsInDescription = description?.split(/(\p{Script=Hiragana}+|\p{Script=Katakana}+|[一-龯々]+)/u).filter(Boolean); // Split based on Japanese characters
    const formattedDescription: JSX.Element[] = [];

    if(wordsInDescription) {
      wordsInDescription.forEach((word: any, index: number) => {
        // .some() will return a boolean, and compares if the conditions passes the test provided by the function (anonymous arrow function in this case)
        // this loops through the kanjiList array and checks if the kanji matches each word in the description
        if (kanjiList.some((kanji) => kanji === word)) {
          formattedDescription.push(
            <span key={index} className={`text-${wordColor}-500 font-bold`} >
              {word}
            </span>
          );
      } else {
        // if it is false, it adds the text as it was (black text color) in the array
        formattedDescription.push(<React.Fragment key={index}>{word}</React.Fragment>);
      }
    });
  }
    return formattedDescription;
  };


  // useEffect(() => {
    // Check if the user is logged in (you may have your own authentication logic)
  //   const userIsLoggedIn = /* Your authentication logic here */ true;

  //   if (!userIsLoggedIn) {
  //       router.push('/login');
  //   } 
  // }, []);

  return (
    <div className="flex flex-col min-h-screen min-w-screen items-center">
      <Navbar />
      <h1 className="text-6xl mt-32 mb-20 font-bold">毎日ニュース</h1>
      {/* button container */}
      <div className="bg-blue-200 py-5 rounded">
        <button 
          className="bg-blue-400 focus:bg-blue-300 text-xl rounded px-5 py-2 mx-5 hover:scale-110"
          onClick={() => handleClickLevel("n5", "blue")}
          >
          <h4>5 級</h4>
        </button>
        <button 
          className="bg-green-400 focus:bg-green-300 text-xl rounded px-5 py-2 mx-5 hover:scale-110"
          onClick={() => handleClickLevel("n4", "green")}
          >
          <h4>4 級</h4>
        </button>
        <button 
          className="bg-yellow-400 focus:bg-yellow-300 text-xl rounded px-5 py-2 mx-5 hover:scale-110"
          onClick={() => handleClickLevel("n3", "yellow")}
          >
          <h4>3 級</h4>
        </button>
        <button 
          className="bg-orange-400 focus:bg-orange-300 text-xl rounded px-5 py-2 mx-5 hover:scale-110"
          onClick={() => handleClickLevel("n2", "orange")}
          >
          <h4>2 級</h4>
        </button>
        <button 
          className="bg-red-400 focus:bg-red-300  text-xl rounded px-5 py-2 mx-5 hover:scale-110"
          onClick={() => handleClickLevel("n1", "red")}
          >
          <h4>1 級</h4>
        </button>
      </div>
      <div className="my-20 w-3/4 max-w-3xl flex flex-col items-center">
        {/* loop through each top headline title and description to display */}
        {news.articles.map((article, index) => (
          <div key={index} className="my-5 rounded px-16 py-10 bg-slate-200">
            <h4 className="text-xl font-bold">{article.title}</h4>
            {/* function to loop through kanjiList and each word in top headline description */}
            <p className="">{formatArticleDescription(article.description)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;