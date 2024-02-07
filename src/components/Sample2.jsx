import { useEffect, useRef } from "react";
import Matter from "matter-js";

function Sample2() {
  const {
    Engine,
    Render,
    Bodies,
    Runner,
    Composite,
    Mouse,
    MouseConstraint,
    Events,
    Body,
  } = Matter;
  const selectObjRef = useRef(null);

  useEffect(() => {
    const engine = Engine.create();
    const render = Render.create({
      element: document.body.querySelector(".Sample2"),
      engine: engine,
      options: {
        width: 800,
        height: 600,
        wireframes: false,
      },
    });
    Render.run(render);

    // 静止オブジェクト（空中の床と地面）
    const floor = Bodies.rectangle(400, 200, 500, 30, { isStatic: true });
    const ground = Bodies.rectangle(400, 585, 800, 30, { isStatic: true });

    // 可動オブジェクト（正方形、円、三角形）
    const square = Bodies.rectangle(
      floor.bounds.min.x + 50,
      floor.bounds.max.y - 50,
      50,
      50
    );
    const circle = Bodies.circle(floor.position.x, floor.bounds.max.y - 50, 50);
    const triangle = Bodies.polygon(
      floor.bounds.max.x - 50,
      floor.bounds.max.y - 50,
      3,
      50
    );

    // マウス制約の追加
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2, // ドラッグ時の弾性
        render: {
          visible: false, // マウス制約の表示非表示
        },
      },
    });

    // マウスクリックのイベント
    Events.on(mouseConstraint, "mousedown", (event) => {
      // クリックしたオブジェクトを選択、但し床は除外
      if (event.source.body && event.source.body !== ground) {
        selectObjRef.current = event.source.body;
        Body.setStatic(event.source.body, false);
      } else {
        // 床やなにもないところをクリックしたら選択解除
        selectObjRef.current = null;
      }
    });

    // ドラッグ終了時に静止オブジェクトを再度静止にする
    Events.on(mouseConstraint, "enddrag", (event) => {
      if (event.body === floor) {
        Body.setStatic(event.body, true);
      }
    });

    // オブジェクト登録
    Composite.add(engine.world, [
      floor,
      ground,
      square,
      circle,
      triangle,
      mouseConstraint,
    ]);
    Runner.run(Runner.create(), engine);
  }, []);

  const handleWheel = (e) => {
    // 選択中のオブジェクトがあるなら選択オブジェクトを回転
    if (selectObjRef.current) {
      const delta = e.deltaY; // マウスホイールの回転量
      const angle = delta * 0.001; // 回転量が 100 or -100だったので調整する
      Body.rotate(selectObjRef.current, angle);
    }
  };

  return (
    <div className="Sample2" onWheel={handleWheel}>
      <p>
        地面以外のオブジェクトはドラッグで移動可能です。
        <br />
        また、選択したあとにマウスホイールで回転ができます。
        <br />
        地面あるいはなにもない空間をクリックすると、選択が解除されます。
      </p>
    </div>
  );
}

export default Sample2;
