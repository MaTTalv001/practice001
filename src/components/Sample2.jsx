import { useEffect, useRef, useState } from "react";
import MatterEngine from "../lib/MatterEngine";
import { createObjects, createObject } from "../lib/Bodies";
import CollisionEvents from "../lib/CollisionEvents";
import { useNavigate } from "react-router-dom";
import MouseEvents from "../lib/Mouse";

function Sample2() {
  const matterRef = useRef(null);
  const switchObjRef = useRef(null);
  const stageDataRef = useRef(null);
  const placementDataRef = useRef(null);
  const selectObjRef = useRef(null);
  const [gameClear, setGameClear] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigator = useNavigate();

  useEffect(() => {
    setLoading(true);
    // ステージデータの読み込み
    const getStageData = async () => {
      // TODO : ここで何かしらの方法でステージ名前を取得する
      const query = "Sample2";
      const url = `${process.env.REACT_APP_SERVER_URL}?stage=${query}`;
      await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
        .then((res) => res.json())
        .then((data) => {
          stageDataRef.current = data;
          matterInitialize();
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    getStageData();
  }, []);

  useEffect(() => {
    if (gameClear) {
      const timeoutId = setTimeout(() => {
        alert("ゲームクリア");
        clearTimeout(timeoutId);
      }, 1000);
    }
  }, [gameClear]);

  const matterInitialize = () => {
    // セットアップ
    matterRef.current = new MatterEngine();
    matterRef.current.setup(".Game");
    matterRef.current.run();

    // イベント設定
    const colEvents = new CollisionEvents(matterRef.current.getEngine());
    colEvents.pushSwitch(handleSwitch);

    // オブジェクト登録
    // スイッチ
    const switchButton = createObject(matterRef.current.getMatter(), stageDataRef.current.Switch, "Switch");
    switchObjRef.current = switchButton;
    // ステージオブジェクト
    const stageObject = createObjects(matterRef.current.getMatter(), stageDataRef.current.Stage);
    // ユーザーが移動できるオブジェクト
    const userObject = createObjects(matterRef.current.getMatter(), stageDataRef.current.UserPlacement, "User");
    placementDataRef.current = userObject;
    matterRef.current.registerObject([switchButton, ...stageObject, ...userObject]);

    // マウスイベント作成
    const mouseEvent = new MouseEvents(matterRef.current.getRender().canvas, matterRef.current.getEngine());
    mouseEvent.setupSelectObject(selectObjRef);
  }

  // スイッチ押下時のイベント
  const handleSwitch = () => {
    // スイッチ押下アニメーション
    const intervalId = setInterval(() => {
      const results = switchObjRef.current.setPositionAnimate(600, 580);
      setGameClear(results);
      if (results) {
        clearInterval(intervalId);
      }
    }, 1000 / 30); // 30FPS
  };

  const handleReset = () => {
    // TODO : ページリロードをしているので工夫が必要
    navigator(0);
  };

  // TODO : 回転をステージ作成のみなのか配置も回転できるようにするのかの確認
  const handleWheel = (e) => {
    // 選択中のオブジェクトがあるなら選択オブジェクトを回転
    if (selectObjRef.current) {
      const delta = e.deltaY; // マウスホイールの回転量
      const angle = delta * 0.001; // 回転量が 100 or -100だったので調整する
      Body.rotate(selectObjRef.current, angle);
    }
  };

  return (
    <div>
      {loading ? <div>loading...</div> :
        <>
          <h2>{stageDataRef.current && stageDataRef.current.name}</h2>
          <p>青色・緑色のオブジェクトは移動できます</p>
          <button onClick={() => handleReset()}>リセット</button>
        </>}
      <div className="Game"></div>
    </div>
  );
}

export default Sample2;
