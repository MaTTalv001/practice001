import "matter-js";

class Bodies {
  Composite = null;
  CompositeCreate = null;
  Bodies = null;
  Object = null;
  PosX = 0;
  PosY = 0;
  /**
   * @method コンストラクタ
   * @param {Matter} Matter
   * @param {number} x X座標
   * @param {number} y Y座標
   * @description matterオブジェクトを受け取る
   */
  constructor(matter, x, y, options = {}, isSpawn = false) {
    this.Bodies = matter.Bodies;
    this.Composite = matter.Composite;
    this.CompositeCreate = matter.Composite.create();
    this.PosX = x;
    this.PosY = y;
  }

  /**
   * @method オブジェクトの静止状態設定
   */
  setStatic(bool) {
    this.Bodies.setStatic(this.Object, bool);
  }

  /**
   * @method スポーンオブジェクト生成
   * @param {number} x X座標
   * @param {number} y Y座標
   * @param {object} option オプション
   */
  objectSpawn(x, y, option) {}

  objectClear() {
    this.Composite.clear(this.CompositeCreate, false);
  }

  /**
   * @method オブジェクト取得
   * @description 生成したオブジェクトを取得
   */
  getObject() {
    return this.Object || this.CompositeCreate;
  }
}

class Rectangle extends Bodies {
  DefaultWidth = 100;
  DefaultHeight = 100;
  constructor(
    matter,
    x = this.PosX,
    y = this.PosY,
    width = this.DefaultWidth,
    height = this.DefaultHeight,
    option = {},
    isSpawn = false
  ) {
    super(matter, x, y);
    if (!isSpawn) {
      this.Object = this.Bodies.rectangle(x, y, width, height, option);
    } else {
      this.Object = null;
    }
  }
}

class Circle extends Bodies {
  DefaultRadius = 25;
  /**
   * @method 円生成
   * @param {number} x X座標
   * @param {number} y Y座標
   * @param {number} radius 半径
   * @param {object} option オプション
   * @description 円を生成
   */
  constructor(
    matter,
    x,
    y,
    radius = this.DefaultRadius,
    option = {},
    isSpawn = false
  ) {
    super(matter, x, y, option, isSpawn);
    if (!isSpawn) {
      this.Object = this.Bodies.circle(x, y, radius, option);
      this.Composite.add(this.CompositeCreate, this.Object);
    } else {
      this.Object = null;
    }
  }

  /**
   * @method スポーンオブジェクト生成
   * @param {number} x X座標
   * @param {number} y Y座標
   * @param {object} option オプション
   */
  objectSpawn(x, y, width = this.DefaultRadius, option = {}) {
    const circle = this.Bodies.circle(x, y, width, option);
    this.Composite.add(this.CompositeCreate, circle);
  }
}

class Triangle extends Bodies {
  DefaultHeight = 100;
  /**
   * @method 三角形生成
   * @param {number} x X座標
   * @param {number} y Y座標
   * @param {number} height 高さ
   * @param {object} option オプション
   * @description 三角形を生成
   */
  constructor(
    matter,
    x,
    y,
    height = this.DefaultHeight,
    option = {},
    isSpawn = false
  ) {
    super(matter, x, y, option);
    this.Object = this.Bodies.polygon(x, y, 3, height, option);
  }
}

class Polygon extends Bodies {
  DefaultSides = 5;
  DefaultRadius = 50;
  constructor(
    matter,
    x,
    y,
    sides = this.DefaultSides,
    radius = this.DefaultRadius,
    option = {},
    isSpawn = false
  ) {
    super(matter, x, y, option);
    this.Object = this.Bodies.polygon(x, y, sides, radius, option);
  }
}

// 引数作成のマッパー
const mapper = {
  Rectangle: (stage) => {
    return [stage.x, stage.y, stage.width, stage.height, stage.option];
  },

  Circle: (stage) => {
    return [stage.x, stage.y, stage.radius, stage.option];
  },

  Triangle: (stage) => {
    return [stage.x, stage.y, stage.height, stage.option];
  },

  Polygon: (stage) => {
    return [stage.x, stage.y, stage.sides, stage.radius, stage.option];
  },
};

// ステージデータ取得
const getStageObject = (matter, stageData) => {
  const stageObjects = [];

  // ステージタイプからインスタンスするクラスを取得
  for (let stage of stageData) {
    const Class = {
      Rectangle,
      Circle,
      Triangle,
      Polygon,
    }[stage.type];

    // 引数取得
    const args = mapper[stage.type](stage);

    const object = new Class(matter, ...args);
    stageObjects.push(object.getObject());
  }
  return stageObjects;
};

export { Bodies, Rectangle, Circle, Triangle, Polygon, getStageObject };
