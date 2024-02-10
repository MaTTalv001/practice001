import React from 'react';
import Header from './Header'; // ヘッダコンポーネントをインポート
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from "react-router-dom";
import { RoutePath } from "../common/Route";
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
  const navigate = useNavigate();

  const goToSample3 = () => {
    navigate('/sample3');
  };
  

  return (
    <div style={{
      width: '100vw', height: '100vh', backgroundColor: "#58DC04", position: 'relative'  // 位置を相対的に設定
    }}>
      <Header />
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 'calc(100% - 40px)' // フッターの高さを引く
      }}>
        <div style={{
          paddingTop: '20px', paddingBottom: '20px', paddingLeft: '60px', paddingRight: '60px', borderRadius: '20px', border: '5px solid black', textAlign: 'center',
          fontFamily: '"DotGothic16", sans-serif',
          textShadow: `
          -1px -1px 0 #000,
          1px -1px 0 #000,
          -1px  1px 0 #000,
          1px  1px 0 #000`
        }}>
          
      <h1 style={{ fontSize: '4rem', margin: '0', color: "#F2F705" }}>Pythagora</h1>
      <h1 style={{ fontSize: '4rem', margin: '0', color: "#F2F705" }}>maker</h1>
      </div>
        <Link
          to={RoutePath.sample3.path}
          style={{
          display: 'inline-block', // リンクをインラインブロック要素として扱う
          marginTop: '0.2rem',
          fontSize: '40px',
          padding: '20px 40px',
          borderRadius: '10px',
          cursor: 'pointer',
          fontFamily: '"DotGothic16", sans-serif',
          fontWeight: 'bold',
          background: 'transparent',
          border: 'none',
          textDecoration: 'none', // リンクの下線を消す
            color: 'inherit' // リンクの色をテキストの色と同じにする
          }}
        >
          Game Start
        </Link>
      <p style={{
          position: 'absolute', // 絶対位置
          right: '10px', // 右から10pxの位置
          bottom: '10px', // 下から10pxの位置
          fontSize: '1rem', // フォントサイズを小さく
          color: 'black',
          margin: '0' // マージンをリセット
        }}>
      ※本ゲームはPC専用となっております。
      </p>
      </div>
    </div>
  );
};

export default HomePage;