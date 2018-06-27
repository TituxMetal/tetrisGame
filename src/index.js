import Player from './Player'

const canvas = document.getElementById('tetris')
const context = canvas.getContext('2d')

context.scale(20, 20)

const player = new Player

const matrix = [
  [0, 0, 0],
  [1, 1, 1],
  [0, 1, 0]
]

player.matrix = matrix

const draw = () => {
  context.fillStyle = '#444'
  context.fillRect(0, 0, canvas.width, canvas.height)

  drawMatrix(player.matrix, player.position)
}

const drawMatrix = (matrix, offset) => {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = 'violet'
        context.fillRect(x + offset.x, y + offset.y, 1, 1)
      }
    })
  })
}

document.addEventListener('keydown', event => {
  switch (event.keyCode) {
    case (39):
      player.move(+1)
      draw()
      break
    case (37):
      player.move(-1)
      draw()
      break
    case (40):
      player.drop()
      draw()
      break
  }
})

draw()
