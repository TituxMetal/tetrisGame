import Arena from './Arena'
import Player from './Player';
import Piece from './Piece';

class Tetris {
  constructor(element) {
    this.arena = new Arena(12, 20)
    this.canvas = element.querySelector('canvas')
    this.context = this.canvas.getContext('2d')
    this.element = element
    this.lastTime = 0
    this.piece = new Piece
    this.player = new Player(this)
    this.requestAnimationID = undefined
    this.scale = 20
    this.scoreElement = element.querySelector('.score')

    this.context.scale(this.scale, this.scale)
    this.player.reset()

    this.player.events.listen('score', score => this.updateScore(score))

    this.updateScore(this.score)
  }

  draw() {
    this.context.fillStyle = '#444'

    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.drawMatrix(this.arena.matrix, { x: 0, y: 0 })
    this.drawMatrix(this.player.matrix, this.player.position)
  }

  drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          this.context.fillStyle = this.piece.colors[value]
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

  serialize() {
    return {
      arena: {
        matrix: this.arena.matrix
      },
      player: {
        matrix: this.player.matrix,
        position: this.player.position,
        score: this.player.score
      }
    }
  }

  start() {
    if (this.requestAnimationID === undefined) {
      this.requestAnimationID = requestAnimationFrame(this.update.bind(this))
    }
  }

  unserialize(state) {
    this.arena = Object.assign(state.arena)
    this.player = Object.assign(state.player)
    this.updateScore(this.player.score)
    this.draw()
  }

  update(time = 0) {
    const deltaTime = time - this.lastTime
    this.lastTime = time

    this.player.update(deltaTime)
    this.draw()

    this.requestAnimationID = requestAnimationFrame(this.update.bind(this))
  }

  updateScore() {
    this.scoreElement.innerText = this.player.score
  }
}

export default Tetris
