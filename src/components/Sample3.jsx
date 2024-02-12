import { useEffect, useState } from "react";
import Matter, { Body, Constraint, Events } from "matter-js";

function Sample3() {
  const { Engine, Render, Bodies, Runner, Composite } = Matter;
  const [ballComposite, setBallComposite] = useState(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const engine = Engine.create();
    const render = Render.create({
      element: document.body.querySelector(".Sample3"),
      engine: engine,
      options: {
        width: 800,
        height: 600,
        wireframes: false,
      },
    });
    Render.run(render);

    // 回転オブジェクト
    const floor = Bodies.rectangle(500, 200, 300, 30, {
      angle: 0,
    });
    // ボタン
    const button = Bodies.rectangle(500, 570, 200, 50, { isSensor: true, isStatic: true, render: { fillStyle: 'red' } } );
    // 回転軸
    const pivot = Bodies.circle(500, 200, 5, { isStatic: true });
    // 回転制約
    const constraint = Constraint.create({
      bodyA: floor, // 回転させたいオブジェクト
      pointA: { x: 0, y: 0 }, // 回転させたいオブジェクトの中心
      bodyB: pivot, // 回転軸
      pointB: { x: 0, y: 0 }, // 回転軸の中心
    });

    // 地面
    const ground = Bodies.rectangle(400, 585, 800, 30, { isStatic: true });

    // 生成するボール
    const ballComposite = Composite.create();
    setBallComposite(ballComposite);

    // オブジェクト登録
    Composite.add(engine.world, [constraint, floor, ground, ballComposite, button]);

    // 更新前処理をイベントに追加
    Events.on(engine, "beforeUpdate", function (event) {
      Body.setAngularVelocity(floor, 0.05);
    });

    // ボールとボタンの衝突イベント
    Events.on(engine, "collisionStart", function(event) {
      var pairs = event.pairs;
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        if ((pair.bodyA === button && pair.bodyB.label === 'Circle Body') || (pair.bodyB === button && pair.bodyA.label === 'Circle Body')) {
          setCounter(counter => counter + 1);
        }
      }
    });

    // オブジェクト用レンダリング作成
    Runner.run(Runner.create(), engine);
  }, []);

  // クリックでボタン生成
  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const radius = 30;
    const ball = Bodies.circle(x, y, radius, { density: 10 });
    Composite.add(ballComposite, ball);
  };

  // リセットボタンのクリックイベント
  const handleReset = () => {
    setCounter(0);
    Composite.clear(ballComposite, false);
  };

  return (
    <div className="bg-green-300" style={{ width: '100%', margin: "0", display: 'flex', justifyContent: 'center' }}>
      <div>
        <div className="Sample3" onClick={handleClick}>
          <p>クリックでボールが出現します。</p>
        </div>
        <div className="counter text-white" style={{ position: 'absolute', top: '80px', right: '160px', zIndex: 1 }}>
          <p>カウンター: {counter}</p>
        </div>
        <div className="reset-button text-white" style={{ position: 'absolute', top: '80px', left: '160px', zIndex: 1 }} onClick={handleReset}>
          <button>リセット</button>
        </div>
      </div>
    </div>
  );
}

export default Sample3;
