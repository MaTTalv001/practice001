const ColorSetting = {
  Static: "gray",
  Switch: "red",
  Move: "yellow",
  UserStatic: "blue", // TODO : これは仮
  UserMove: "green" // TODO : これは仮
}

/* matter.jsの色周りの設定（抜粋）
render = {
  塗りつぶし
  初期値：動かないとなし、動くとランダム
  fillStyle: string,

  枠線の太さ
  初期値：0
  lineWidth: number,

  透過度
  初期値：1
  opacity: number,

  枠線の色
  初期値：動かないと白系、動くと塗りつぶしと同じ色
  strokeStyle: string,

  可視
  初期値：true
  visible: boolean,
}
*/

// TODO : もっときれいにかければいいな
const getColor = (type, isStatic) => {
  let colorSet = {};
  switch (type) {
    case "default":
      if (isStatic) colorSet = { fillStyle: ColorSetting.Static };
      else colorSet = { fillStyle: ColorSetting.Move };
      break;
    case "Switch":
      colorSet = { fillStyle: ColorSetting.Switch };
      break;
    case "User":
      if (isStatic) colorSet = { fillStyle: ColorSetting.UserStatic };
      else colorSet = { fillStyle: ColorSetting.UserMove };
      break;
  }

  return colorSet;
}

export default getColor;