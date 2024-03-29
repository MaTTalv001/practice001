import Matter from "matter-js";

class CollisionEvents {
  events = Matter.Events;
  engine = null;
  /*
    TODO : 現在１つしか登録できないので、複数登録できるようにする
   */
  collisionStartCallback = null;
  /*
    TODO : ゴールスイッチの押下イベントは1つでいいが、ギミックスイッチの場合は複数登録できたほうがよさげ
   */
  switchCallback = null;
  constructor(engine) {
    this.engine = engine;
  }

  /**
    * @method タッチイベント
    * @param {function} callback 衝突時のコールバック関数
    * @description 衝突時のコールバック関数を登録する
   */
  touchEvents(callback) {
    this.collisionStartCallback = function (event) {
      var pairs = event.pairs;
      for (var i = 0; i < pairs.length; i++) {
        callback(pairs[i].bodyA, pairs[i].bodyB);
      }
    };
    this.events.on(this.engine, 'collisionStart', this.collisionStartCallback);
  }

  /**
    * @method タッチイベント削除
    * @description 登録したタッチイベントを削除する
   */
  removeTouchEvents() {
    if (this.collisionStartCallback) {
      this.events.off(this.engine, 'collisionStart', this.collisionStartCallback);
      this.collisionStartCallback = null;
    }
  }

  /**
    * @method スイッチ押下
    * @description スイッチ押下時にイベント発火
   */
  pushSwitch(callback) {
    this.switchCallback = callback;
    this.touchEvents(this.triggerSwitch);
  }

  /**
    * @method スイッチ押下時の処理
    * @param {object} bodyA 衝突したオブジェクトA
    * @param {object} bodyB 衝突したオブジェクトB
    * @description スイッチ押下時の処理
   */
  triggerSwitch = (bodyA, bodyB) => {
    if (bodyA.label === "switch" && bodyB.label === "ball") {
      // スイッチが衝突したときの処理
      if (this.switchCallback) {
        this.switchCallback();
      }
    }
  }
}

export default CollisionEvents;
