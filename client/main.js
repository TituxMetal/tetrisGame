import TetrisManager from './modules/TetrisManager'
import ConnectionManager from './modules/ConnectionManager'

const tetrisManager = new TetrisManager(document)
const localTetris = tetrisManager.createPlayer()
const connectionManager = new ConnectionManager(tetrisManager)
connectionManager.connect('ws://titux.local:9000')

document.addEventListener('keydown', event => {
  switch (event.keyCode) {
    case (39):
      localTetris.player.move(+1)
      break
    case (37):
      localTetris.player.move(-1)
      break
    case (40):
      localTetris.player.drop()
      break
    case (80):
      localTetris.pause()
      break
    case (87):
      localTetris.player.rotate(1)
      break
    case (88):
      localTetris.player.rotate(-1)
      break
  }
})
