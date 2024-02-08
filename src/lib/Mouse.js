import Matter, { Events } from "matter-js";

class MouseConstraintManager {
  Mouse = null;
  Render = null;
  MouseConstraint = null;
  Stiffness = 0.2;
  constructor() {
    this.Mouse = Matter.Mouse;
    this.MouseConstraint = Matter.MouseConstraint;
  }

  create(canvas, engine) {
    const mouse = this.Mouse.create(canvas);
    const mouseConstraint = this.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: this.Stiffness,
        render: {
          visible: false,
        },
      },
    });
    return mouseConstraint;
  }

  /**
   * @method クリックしたオブジェクト取得
   */
  getClickObject() {
    Events.on(this.MouseConstraint, "mousedown", (e) => {
      return e.source.body;
    });
  }

  /**
   * @method クリックアップしたオブジェクト取得
   */
  getClickUpObject() {
    Events.on(this.MouseConstraint, "mouseup", (e) => {
      return e.source.body;
    });
  }

  /**
   * @method ドラッグ中のオブジェクト取得
   */
  getDragObject() {
    Events.on(this.MouseConstraint, "mousemove", (e) => {
      return e.source.body;
    });
  }

  /**
   * @method ドラッグ終了したオブジェクト取得
   */
  getEndDragObject() {
    Events.on(this.MouseConstraint, "enddrag", (e) => {
      return e.body;
    });
  }
}

export default MouseConstraintManager;
