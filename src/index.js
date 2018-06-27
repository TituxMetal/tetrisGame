import Player from './Player'

const canvas = document.getElementById('tetris')
const context = canvas.getContext('2d')

context.scale(20, 20)

let requestAnimationID
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

let lastTime = 0

const update = (time = 0) => {
  const deltaTime = time - lastTime
  lastTime = time
  player.update(deltaTime)

  draw()
  requestAnimationID = requestAnimationFrame(update)
}

const start = () => {
  if (!requestAnimationID) {
    requestAnimationID = requestAnimationFrame(update)
  }
}

const pause = () => {
  if (requestAnimationID) {
    cancelAnimationFrame(requestAnimationID)
    requestAnimationID = undefined
    return
  }

  start()
}

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
      pause()
      break
  }
})

start()
