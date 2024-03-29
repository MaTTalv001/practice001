import React from 'react';
import Header from './Header'; // ヘッダコンポーネントをインポート
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from "react-router-dom";
import { RoutePath } from "../common/Route";
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-green-400 w-screen h-screen relative">
        <Header />
        <div className="font-[DotGothic16] flex flex-col items-center justify-center h-[calc(100%-40px)]">
          <div className="pt-5 pb-5 pl-15 pr-15 rounded-3xl border-4 border-black text-center font-dotgothic16 text-shadow-black ">
            <h1 className="text-8xl my-3 mx-10 text-yellow-300">Pythagora</h1>
            <h1 className="text-8xl my-3 mx-10 text-yellow-300">maker</h1>
          </div>
          <Link
            to={RoutePath.stageselect.path}
            className="inline-block mt-0.5 text-5xl py-5 px-10 rounded-xl cursor-pointer font-dotgothic16 font-bold bg-transparent border-none no-underline text-inherit"
          >
            Game Start
          </Link>
          <footer className="flex justify-between items-center p-2.5 absolute bottom-2 right-0 left-0">
            <div className="flex ml-10">
              <div>COPY RIGHT</div>
              <div>プラバシーポリシー</div>
              <div>利用規約</div>
            </div>
            <p className="text-base text-black m-0">
              ※本ゲームはPC専用となっております。
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
export default HomePage;