import { useEffect, useState } from "react";
import MatterEngine from "../lib/MatterEngine";
import { Circle, getStageObject, getObject } from "../lib/Bodies";

function Sample1() {
  const [matter, setMatter] = useState(null);
  const [spawnBall, setSpawnBall] = useState(null);
  const [stageData, setStageData] = useState(null);
  const [switchObj, setSwitchObj] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // ステージデータの読み込み
    const getStageData = async () => {
      const url = process.env.REACT_APP_SERVER_URL;
      await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setStageData(data);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    getStageData();

    const matterEngine = new MatterEngine();
    setMatter(matterEngine);

    // 生成ボールの登録
    const ball = new Circle(matterEngine.getMatter(), 0, 0, "default", 20, {}, true);
    setSpawnBall(ball);
    matterEngine.registerObject(ball.getObject());
  }, []);

  useEffect(() => {
    if (matter) {
      matter.setup(".Sample1");
      matter.run();
      if (stageData) {
        const stageObject = getStageObject(matter.getMatter(), stageData.Stage);
        const switchButton = getObject(matter.getMatter(), stageData.Switch, "Switch");
        matter.registerObject([switchButton, ...stageObject]);
      }

      setLoading(false);
    }
  }, [stageData, matter]);

  // クリックでボール生成
  const handleSpawnBall = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const radius = 25;
    const option = {
      render: {
        fillStyle: "yellow"
      }
    }
    spawnBall.objectSpawn(x, y, radius, option);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{stageData && stageData.name}</h2>
      <button onClick={() => spawnBall.objectClear()}>ボールクリア</button>
      <div className="Sample1" onClick={(e) => handleSpawnBall(e)}></div>
    </div>
  );
}

export default Sample1;
