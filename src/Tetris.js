import Arena from './Arena'
import Player from './Player';

class Tetris {
  constructor(canvas, matrix) {
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.scale = 20
    this.lastTime = 0
    this.requestAnimationID = undefined
    this.arena = new Arena(12, 20)
    this.player = new Player(this)
    this.player.matrix = matrix

    this.context.scale(this.scale, this.scale)
    this.start()
  }

  draw() {
    this.context.fillStyle = '#444'
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.drawMatrix(this.player.matrix, this.player.position)
  }

  drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          this.context.fillStyle = 'violet'
          this.context.fillRect(x + offset.x, y + offset.y, 1, 1)
        }
      })
    })
  }

  pause() {
    if (this.requestAnimationID) {
      cancelAnimationFrame(this.requestAnimationID)
      this.requestAnimationID = undefined
      return
    }

    this.start()
  }

  start() {
    if (this.requestAnimationID === undefined) {
      this.requestAnimationID = requestAnimationFrame(this.update.bind(this))
    }
  }

  update(time = 0) {
    const deltaTime = time - this.lastTime
    this.lastTime = time

    this.player.update(deltaTime)
    this.draw()

    this.requestAnimationID = requestAnimationFrame(this.update.bind(this))
  }
}

export default Tetris
