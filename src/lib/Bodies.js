import "matter-js";
import getColor from "../common/ColorSetting";

class Bodies {
  Composite = null;
  CompositeCreate = null;
  Bodies = null;
  Object = null;
  PosX = 0;
  PosY = 0;
  Type = "default";

  /**
   * @method コンストラクタ
   * @param {Matter} Matter
   * @param {number} x X座標
   * @param {number} y Y座標
   * @description 初期化
   */
  constructor(matter, x, y, type) {
    this.Bodies = matter.Bodies;
    this.Composite = matter.Composite;
    this.CompositeCreate = matter.Composite.create();
    this.PosX = x;
    this.PosY = y;
    this.Type = type;
  }

  /**
   * @method オブジェクトの静止状態設定
   * @param {bool} bool 静止しているか否か
   */
  setStatic(bool) {
    this.Bodies.setStatic(this.Object, bool);
  }

  /**
   * @method スポーンオブジェクト生成
   * @param {number} x X座標
   * @param {number} y Y座標
   * @param {object} option オプション
   * @description オブジェクトを指定位置にスポーン
   */
  objectSpawn(x, y, option) { }

  /**
   * @method オブジェクトクリア
   * @description 生成したオブジェクトを全削除
   */
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

  getColorSetting(option) {
    let isStatic = option && option.isStatic !== undefined;
    return getColor(this.Type, isStatic)
  }

  getOption(option) {
    let optionAddColor;
    if (option) {
      optionAddColor = { ...option, render: this.getColorSetting(option) };
    } else {
      optionAddColor = { render: this.getColorSetting(option) };
    }
    return optionAddColor;
  }
}

class Rectangle extends Bodies {
  DefaultWidth = 100;
  DefaultHeight = 100;

  /**
   * @method 初期化
   * @param {number} x X座標
   * @param {number} y Y座標
   * @param {number} width 幅
   * @param {number} heigth 高さ
   * @param {object} option オプション
   * @param {bool} isSpawn スポーンオブジェクトか否か
   */
  constructor(
    matter,
    x = this.PosX,
    y = this.PosY,
    type = "default",
    width = this.DefaultWidth,
    height = this.DefaultHeight,
    option = {},
    isSpawn = false,
  ) {
    super(matter, x, y, type);
    if (!isSpawn) {
      this.Object = this.Bodies.rectangle(x, y, width, height, this.getOption(option, type));
      this.Composite.add(this.CompositeCreate, this.Object);
    } else {
      this.Object = null;
    }
  }

  /**
   * @method スポーンオブジェクト生成
   * @param {number} x X座標
   * @param {number} y Y座標
   * @param {number} width 幅
   * @param {number} height 高さ
   * @param {object} option オプション
   */
  objectSpawn(x, y, width = this.DefaultWidth, height = this.DefaultHeight, option = {}) {
    const rectangle = this.Bodies.rectangle(x, y, width, height, option)
    this.Composite.add(this.CompositeCreate, rectangle);
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
    type = "default",
    radius = this.DefaultRadius,
    option = {},
    isSpawn = false,
  ) {
    super(matter, x, y, type);
    if (!isSpawn) {
      this.Object = this.Bodies.circle(x, y, radius, this.getOption(option));
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
  objectSpawn(x, y, radius = this.DefaultRadius, option = {}) {
    const circle = this.Bodies.circle(x, y, radius, option);
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
    type = "default",
    height = this.DefaultHeight,
    option = {},
    isSpawn = false,
  ) {
    super(matter, x, y, type);
    if (!isSpawn) {
      this.Object = this.Bodies.polygon(x, y, 3, height, this.getOption(option, type));
      this.Composite.add(this.CompositeCreate, this.Object);
    } else {
      this.Object = null;
    }
  }

  objectSpawn(x, y, height, option) {
    const triangle = this.Bodies.polygon(x, y, 3, height, option);
    this.Composite.add(this.CompositeCreate, triangle);
  }
}

class Polygon extends Bodies {
  DefaultSides = 5;
  DefaultRadius = 50;
  constructor(
    matter,
    x,
    y,
    type = "default",
    sides = this.DefaultSides,
    radius = this.DefaultRadius,
    option = {},
    isSpawn = false,
  ) {
    super(matter, x, y, type);
    if (!isSpawn) {
      this.Object = this.Bodies.polygon(x, y, sides, radius, this.getOption(option, type));
      this.Composite.add(this.CompositeCreate, this.Object);
    } else {
      this.Object = null;
    }
  }

  objectSpawn(x, y, sides, height, option) {
    const triangle = this.Bodies.polygon(x, y, sides, height, option);
    this.Composite.add(this.CompositeCreate, triangle);
  }
}

// 引数作成のマッパー
const mapper = {
  Rectangle: (stage, type) => {
    return [stage.x, stage.y, type, stage.width, stage.height, stage.option, false];
  },

  Circle: (stage, type) => {
    return [stage.x, stage.y, type, stage.radius, stage.option, false];
  },

  Triangle: (stage, type) => {
    return [stage.x, stage.y, type, stage.height, stage.option, false];
  },

  Polygon: (stage, type) => {
    return [stage.x, stage.y, type, stage.sides, stage.radius, stage.option, false];
  },
};

// ステージデータ取得
const getStageObject = (matter, stageData) => {
  const stageObjects = [];

  // ステージタイプからインスタンスするクラスを取得
  for (let stage of stageData) {
    const object = getObject(matter, stage);
    stageObjects.push(object);
  }
  return stageObjects;
};

const getObject = (matter, data, type = "default") => {
  const Class = {
    Rectangle,
    Circle,
    Triangle,
    Polygon,
  }[data.bodiesType];
  const args = mapper[data.bodiesType](data, type);
  return new Class(matter, ...args).getObject();
}

export { Bodies, Rectangle, Circle, Triangle, Polygon, getStageObject, getObject };
