import Player from './Player'
import Tetris from './Tetris'

const player = new Player

const matrix = [
  [0, 0, 0],
  [1, 1, 1],
  [0, 1, 0]
]

player.matrix = matrix

const tetris = new Tetris(document.getElementById('tetris'), player)

document.addEventListener('keydown', event => {
  switch (event.keyCode) {
    case (39):
      player.move(+1)
      break
    case (37):
      player.move(-1)
      break
    case (40):
      player.drop()
      break
    case (80):
      tetris.pause()
      break
  }
})
