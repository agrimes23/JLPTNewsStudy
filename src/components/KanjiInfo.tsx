import React, { useState } from 'react'
import NewDeck from './NewDeck';
import { useAuth } from '@/context/AuthContext';
// import { useFlashcardDeck } from '@/context/FlashcardContext';
import { useRouter } from 'next/navigation'
import { useNavigation } from '@/context/NavigationContext';

interface KanjiInfoProps {
  kanji: string;
  level: number;
  furigana?: string;
  meaning: string;
  onClose: any;
}

const KanjiInfo: React.FC<KanjiInfoProps> = ({ kanji, level, furigana, meaning, onClose }) => {
  const [openDeckOptions, setOpenDeckOptions] = useState<any>()
  const { accessToken } = useAuth()
  const router: any = useRouter()
  const { setPreviousLocation } = useNavigation();
 
  
  const handleLogin = () => {
    setPreviousLocation("/news");
    router.push('/login');
  };

  const handleSignup = () => {
    setPreviousLocation("/news");
    router.push('/signup');
  };


  return (
    <div>
    <div className="border-2 px-4 py-3 rounded-lg absolute bg-white shadow-sm shadow-gray-300 w-[200px]">
       <button className="absolute top-0 right-0 px-2 py-1 text-2xl text-gray-600" onClick={onClose}>✖</button>
      <div>
        
          <h2 className='text-base font-semibold'>{kanji}</h2>

        <div>
          {furigana && <h3 className="italic text-sm">{furigana}</h3>}
        </div>
        <div className="flex flex-row justify-between ">
          <h3 className="text-sm w-11/12">{meaning}</h3>
          <h4 className='text-sm '>(N{level})</h4>
        </div>
      </div>
      <div>
        <h4 className="text-base text-center mt-4">To add this kanji to a deck:</h4>
        { accessToken ? 
          <button className="w-full bg-[#113946] text-white rounded py-2 mt-10" onClick={() => setOpenDeckOptions(true)}>Add to a deck</button>
          :
          <div className="flex w-full gap-4 justify-center mt-5">
            <button onClick={handleLogin} className="border-2 border-[#1f657c] hover:bg-[#2bb6e4] hover:bg-opacity-20 rounded px-2 py-1">Login</button>
            
            <button onClick={handleSignup} className="border-2 border-[#e4c124] hover:bg-[#e4c124] hover:bg-opacity-20 rounded px-2 py-1">Sign Up</button>
          </div>
        }
      </div>
    </div>
    {openDeckOptions ? <NewDeck kanji={kanji} furigana={furigana} meaning={meaning} setOpenDeckOptions={setOpenDeckOptions} onClose={onClose} /> : <></>}
    </div>
  );
};

export default KanjiInfo;