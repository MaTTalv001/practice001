import { useEffect, useState } from "react";
import Matter, { Body, Constraint, Events } from "matter-js";

function Sample3() {
  const { Engine, Render, Bodies, Runner, Composite } = Matter;
  const [ballComposite, setBallComposite] = useState(null);

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
    const floor1 = Bodies.rectangle(500, 200, 300, 30, {
      angle: 0,
    });
    const pivot = Bodies.circle(500, 200, 5, { isStatic: true });
    const constraint = Constraint.create({
      bodyA: floor1,
      pointA: { x: 0, y: 0 },
      bodyB: pivot,
      pointB: { x: 0, y: 0 },
    });

    const ground = Bodies.rectangle(400, 585, 800, 30, { isStatic: true });

    Composite.add(engine.world, [constraint, floor1, ground]);

    const ballComposite = Composite.create();
    setBallComposite(ballComposite);
    Composite.add(engine.world, ballComposite);

    Events.on(engine, "beforeUpdate", function (event) {
      Body.setAngularVelocity(floor1, 0.05);
    });

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
    <div className="Sample3" onClick={handleClick}>
      <p>クリックでボールが出現します。</p>
    </div>
  );
}

export default Sample3;
