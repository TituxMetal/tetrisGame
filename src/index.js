import Tetris from './Tetris'

const matrix = [
  [0, 0, 0],
  [1, 1, 1],
  [0, 1, 0]
]

const tetris = new Tetris(document.getElementById('tetris'), matrix)

document.addEventListener('keydown', event => {
  switch (event.keyCode) {
    case (39):
      tetris.player.move(+1)
      break
    case (37):
      tetris.player.move(-1)
      break
    case (40):
      tetris.player.drop()
      break
    case (80):
      tetris.pause()
      break
    case (87):
      tetris.player.rotate(1)
      break
    case (88):
      tetris.player.rotate(-1)
      break
  }
})
