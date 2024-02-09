import { Body, Events, Mouse, MouseConstraint } from "matter-js";

class MouseEvents {
  mouse = null;
  render = null;
  mouseConstraint = null;
  stiffness = 0.2;

  /**
   * @method コンストラクタ
   * @param {object} canvas Render.canvas
   * @param {object} engine Matter.Engine
   * @description 初期化
   */
  constructor(canvas, engine) {
    this.mouse = Mouse.create(canvas);
    this.mouseConstraint = MouseConstraint.create(engine, {
      mouse: this.mouse,
      constraint: {
        stiffness: this.stiffness,
        render: {
          visible: false,
        },
      },
    });
  }

  /**
   * @method クリックしたオブジェクト取得
   */
  getClickObject() {
    Events.on(this.mouseConstraint, "mousedown", (e) => {
      return e.source.body;
    });
  }

  /**
   * @method クリックアップしたオブジェクト取得
   */
  getClickUpObject() {
    Events.on(this.mouseConstraint, "mouseup", (e) => {
      return e.source.body;
    });
  }

  /**
   * @method ドラッグ中のオブジェクト取得
   */
  getDragObject() {
    Events.on(this.mouseConstraint, "mousemove", (e) => {
      return e.source.body;
    });
  }

  /**
   * @method ドラッグ終了したオブジェクト取得
   */
  getEndDragObject() {
    Events.on(this.mouseConstraint, "enddrag", (e) => {
      return e.body;
    });
  }

  /**
   * @method クリックした座標取得
   */
  getClickPosition() {
    Events.on(this.mouseConstraint, "mousedown", (e) => {
      return e.mouse.position;
    });
  }

  /**
   * @method ドラッグ中の座標取得
   */
  getDragPosition() {
    Events.on(this.mouseConstraint, "mousemove", (e) => {
      return e.mouse.position;
    });
  }

  /**
   * @method ドラッグ終了した座標取得
   */
  getDtagEndPosition() {
    Events.on(this.mouseConstraint, "enddrag", (e) => {
      return e.mouse.position;
    });
  }

  /**
   * @method クリックアップした座標取得
   */
  getClickUpPosition() {
    Events.on(this.mouseConstraint, "mouseup", (e) => {
      return e.mouse.position;
    });
  }

  /**
   * @method 選択オブジェクトセットアップ
   * @param {object} selectObjRef 選択したオブジェクトを格納するRef
   */
  setupSelectObject(selectObjRef) {
    this.selectObject(selectObjRef);
    this.dragObject(selectObjRef);
    //this.endDragObject(selectObjRef);
  }

  /**
   * @method オブジェクト選択
   * @param {object} selectObjRef 選択したオブジェクトを格納するRef
   */
  selectObject(selectObjRef) {
    Events.on(this.mouseConstraint, "mousedown", (event) => {
      if (this.isUserObject(event.source.body)) {
        selectObjRef.current = event.source.body;
      } else {
        selectObjRef.current = null;
      }
    });
  }

  /**
   * @method オブジェクトドラッグ
   * @param {object} selectObjRef 選択したオブジェクトを格納するRef
   */
  dragObject(selectObjRef) {
    Events.on(this.mouseConstraint, "mousemove", (event) => {
      if (this.isUserObject(event.source.body)) {
        Body.setPosition(selectObjRef.current, this.mouse.position);
      }
    });
  }

  /**
   * @method オブジェクトドラッグ終了
   */
  endDragObject(selectObjRef) {
    Events.on(this.mouseConstraint, "enddrag", (event) => {
      // TODO : 今のところ処理がないので何かあれば追加
    });
  }


  isUserObject(body) {
    return body && body.label === "user";
  }
}

export default MouseEvents;
