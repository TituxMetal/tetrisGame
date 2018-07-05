import TetrisManager from './modules/TetrisManager'
import ConnectionManager from './modules/ConnectionManager'

const tetrisManager = new TetrisManager(document)
const localTetris = tetrisManager.createPlayer()
const connectionManager = new ConnectionManager(tetrisManager)

localTetris.element.classList.add('local')
localTetris.start()

const host = location.origin.replace(/^http/, 'ws')

connectionManager.connect(host)

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
