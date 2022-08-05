import "../styles/css_grid/simple-grid.scss"
import "../styles/style.scss"

import PlayAudio from "./modules/playAudio"
import UserActivity from "./modules/userActivity"
import AppPopUp from "./modules/appPopup"

import GameConfig from "./GameConfig"

var gameConfig = new GameConfig()
var userActivity = new UserActivity()
// var audio = new PlayAudio()
// console.log(userActivity)
new AppPopUp()
if (module.hot) {
  module.hot.accept()
}
