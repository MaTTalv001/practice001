import { useEffect, useRef } from "react";
import MatterEngine from "../lib/MatterEngine";

function Sample1() {
  const matterRef = useRef(null);

  useEffect(() => {
    const matterEngine = new MatterEngine();
    matterEngine.setup(".Sample1");
    matterEngine.addGround();
    matterEngine.addFloor(300, 400, 600, 30, Math.PI / 10);
    matterEngine.addFloor(500, 200, 500, 30, -Math.PI / 10);
    matterEngine.setSpawnObject();
    matterEngine.run();
    matterRef.current = matterEngine;
  }, []);

  return (
    <div>
      <p>クリックでボールが出現します。</p>
      <button onClick={() => matterRef.current.clearObject()}>
        ボールクリア
      </button>
      <div
        className="Sample1"
        onClick={(e) => matterRef.current.clickSpawnObject(e)}
      ></div>
    </div>
  );
}

export default Sample1;
