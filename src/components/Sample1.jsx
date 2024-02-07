import { useEffect, useState } from "react";
import Matter from "matter-js";

function Sample1() {
  const { Engine, Render, Bodies, Runner, Composite } = Matter;
  const [ballComposite, setBallComposite] = useState(null);

  useEffect(() => {
    const engine = Engine.create();
    const render = Render.create({
      element: document.body.querySelector(".Sample1"),
      engine: engine,
      options: {
        width: 800,
        height: 600,
        wireframes: false,
      },
    });

    // 静止オブジェクト
    const floor1 = Bodies.rectangle(300, 400, 600, 30, {
      angle: Math.PI / 10,
      isStatic: true,
    });
    const floor2 = Bodies.rectangle(500, 200, 500, 30, {
      angle: -Math.PI / 10,
      isStatic: true,
    });
    const ground = Bodies.rectangle(400, 585, 800, 30, { isStatic: true });

    Composite.add(engine.world, [floor1, floor2, ground]);

    const ballComposite = Composite.create();
    setBallComposite(ballComposite);
    Composite.add(engine.world, ballComposite);

    Render.run(render);
    var runner = Runner.create();

    Runner.run(runner, engine);
  }, []);

  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const radius = 30;
    const ball = Bodies.circle(x, y, radius, { density: 10 });
    Composite.add(ballComposite, ball);
  };

  return (
    <div className="Sample1" onClick={handleClick}>
      <p>クリックでボールが出現します。</p>
    </div>
  );
}

export default Sample1;
