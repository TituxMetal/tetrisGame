const canvas = document.getElementById('tetris')
const context = canvas.getContext('2d')

context.scale(20, 20)

const matrix = [
  [0, 0, 0],
  [1, 1, 1],
  [0, 1, 0]
]

const player = {
  position: { x: 0, y: 0 },
  matrix,
  score: 0
}

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

draw()
