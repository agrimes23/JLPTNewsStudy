import React from 'react'

// 

const ExplainNewsStudy = () => {
  return (
    <div className="flex justify-center items-center h-[900px]">
        <div>
            <img className="w-[600px] mr-20 rounded-xl" src="https://images.pexels.com/photos/20705274/pexels-photo-20705274/free-photo-of-hand-holding-newspapers-in-darkness.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
        </div>
        <div className="flex flex-col bg-[#DCDCD0] ml-20 w-[500px] h-[300px] rounded-lg p-10 text-[20px] items-center shadow-xl gap-6 justify-center">
            <h3>Study the top headlines in Japan to prepare for the JLPT (Japanese Language Proficiency Test)</h3>
            <h3>日本語能力試験 (JLPT) を準備のために日本のトップニュースを勉強する</h3>
        </div>
    </div>
  )
}

export default ExplainNewsStudy