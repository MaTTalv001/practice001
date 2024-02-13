import Header from './Header'; // 既存のヘッダーコンポーネントを再利用
import React, { useState } from 'react';
import DefaultStages from './DefaultStages';
import UserCreates from './UserCreates';


const StageSelectPage = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <>
      <div className=" w-screen h-screen relative font-[DotGothic16]">
        <Header />
        <div class="container m-5 mx-auto pb-10 ">
          <div class="bg-white">
            <nav class="flex flex-col sm:flex-row max-w-screen-lg mx-auto">
              <button onClick={() => setActiveTab('tab1')} class="mr-1 bg-green-400 text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none text-blue-500  font-medium">
                Default
              </button>
              <button onClick={() => setActiveTab('tab2')} class="mr-1 bg-pink-100 text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none">
                UserCreate
              </button>
              <button class="mr-1 bg-purple-200 text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none">
                YourStage
              </button>
            </nav>
          </div>
          <div className="text-center ">
            {activeTab === 'tab1' && <DefaultStages />}
            {activeTab === 'tab2' && <UserCreates />}
          </div>
        </div>
      </div>
    </>
  );
};

export default StageSelectPage;