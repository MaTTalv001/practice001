import Matter from "matter-js";

class MatterEngine {
  DisplayWidth = 800;
  DisplayHeight = 600;
  matter = null;
  engine = null;
  bodies = null;
  runner = null;
  composite = null;
  spawnObject = null;
  constructor() {
    this.matter = Matter;
    this.engine = this.matter.Engine.create();
    this.bodies = this.matter.Bodies;
    this.runner = this.matter.Runner;
    this.composite = this.matter.Composite;
  }

  /**
   * @method セットアップ
   * @param {string} 表示する要素のクラス名
   * @description 表示する要素のクラス名を指定して、表示設定を行う
   */
  setup(elementName) {
    const render = this.matter.Render.create({
      element: document.body.querySelector(elementName),
      engine: this.engine,
      options: {
        width: this.DisplayWidth,
        height: this.DisplayHeight,
        wireframes: false,
      },
    });
    this.matter.Render.run(render);
  }

  /**
   * @method 実行
   * @description 登録したオブジェクトの実行
   */
  run() {
    this.runner.run(this.runner.create(), this.engine);
  }

  /**
   * @method 地面作成
   * @description 静止オブジェクトとして地面作成
   */
  addGround() {
    const ground = this.bodies.rectangle(400, 585, 800, 30, { isStatic: true });
    this.composite.add(this.engine.world, ground);
  }

  /**
   * @method 生成オブジェクトの設定
   * @description 連続的に生成するオブジェクトの設定
   */
  setSpawnObject() {
    this.spawnObject = this.composite.create();
    this.composite.add(this.engine.world, this.spawnObject);
  }

  /**
   * @method オブジェクト生成
   * @param {event} クリックイベント
   * @description クリックした座標にオブジェクト生成
   */
  clickSpawnObject(event, radius = 30, density = 10) {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const ball = this.bodies.circle(x, y, radius, { density: density });
    this.composite.add(this.spawnObject, ball);
  }

  /**
   * @method オブジェクトクリア
   * @description 生成したオブジェクトをクリア
   */
  clearObject() {
    if (this.composite === null || this.spawnObject === null) return;
    this.composite.clear(this.spawnObject, false);
  }

  /**
   * @method 床生成
   * @param {number} x X座標
   * @param {number} y Y座標
   * @param {number} width 幅
   * @param {number} height 高さ
   * @param {number} angle 角度
   * @param {number} density 密度
   * @description 静止している床を生成
   */
  addFloor(x, y, width, height = 30, angle = 0, density = 10) {
    const floor = this.bodies.rectangle(x, y, width, height, {
      angle: angle,
      isStatic: true,
      density: density,
    });
    this.composite.add(this.engine.world, floor);
  }

  /**
   * @method 四角形生成
   * @param {number} x X座標
   * @param {number} y Y座標
   * @param {number} width 幅
   * @param {number} height 高さ
   * @param {number} density 密度
   * @description 静止している四角形を生成
   */
  addSquare(x, y, width = 100, height = 100, density = 10, angle = 0) {
    const square = this.bodies.rectangle(x, y, width, height, {
      angle: angle,
      isStatic: true,
      density: density,
    });
    this.composite.add(this.engine.world, square);
  }
}

export default MatterEngine;
