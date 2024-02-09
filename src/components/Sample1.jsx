import { useEffect, useRef, useState } from "react";
import MatterEngine from "../lib/MatterEngine";
import { Circle, createStageObject, createObject } from "../lib/Bodies";
import CollisionEvents from "../lib/CollisionEvents";

function Sample1() {
  const matterRef = useRef(null);
  const spawnBallRef = useRef(null);
  const switchObjRef = useRef(null);
  const stageDataRef = useRef(null);
  const [gameClear, setGameClear] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // ステージデータの読み込み
    const getStageData = async () => {
      // TODO : ここで何かしらの方法でステージ名前を取得する
      const query = "Sample1";
      //const query = "Sample2"; // こちらのコメントアウトを外すと別のステージデータを取得できる
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
          // スポーンボールの登録
          const ball = new Circle(matterRef.current.getMatter(), 0, 0, "default", 20, {}, true);
          spawnBallRef.current = ball;
          matterRef.current.registerObject(ball);
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
    matterRef.current.setup(".Sample1");
    matterRef.current.run();

    // イベント設定
    const colEvents = new CollisionEvents(matterRef.current.getEngine());
    colEvents.pushSwitch(handleSwitch);

    // オブジェクト登録
    const switchButton = createObject(matterRef.current.getMatter(), stageDataRef.current.Switch, "Switch");
    switchObjRef.current = switchButton;
    const stageObject = createStageObject(matterRef.current.getMatter(), stageDataRef.current.Stage);
    matterRef.current.registerObject([switchButton, ...stageObject]);
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

  // クリックでボール生成
  const handleSpawnBall = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const radius = 25;
    const option = {
      label: "ball",
      density: 10,
      render: {
        fillStyle: "yellow"
      }
    }
    spawnBallRef.current.objectSpawn(x, y, radius, option);
  };

  return (
    <div>
      {loading ? <div>loading...</div> :
        <>
          <h2>{stageDataRef.current && stageDataRef.current.name}</h2>
          <button onClick={() => spawnBallRef.current.objectClear()}>ボールクリア</button>
        </>}
      <div className="Sample1" onClick={(e) => handleSpawnBall(e)}></div>
    </div>
  );
}

export default Sample1;
