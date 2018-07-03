import Events from './Events'

class Player {
  constructor(tetris) {
    this.arena = tetris.arena
    this.defaultInterval = 1000
    this.dropCounter = 0
    this.dropInterval = this.defaultInterval
    this.events = new Events
    this.piece = tetris.piece
    this.matrix = this.piece.getRandomPiece()
    this.position = { x: 0, y: 0 }
    this.score = 0
    this.tetris = tetris
  }

  drop() {
    this.position.y++
    
    this.dropCounter = 0
    
    if (this.arena.collide(this)) {
      this.position.y--
      this.arena.merge(this)
      this.reset()

      const newScore = this.arena.sweep()
      this.score += newScore
      this.dropInterval -= newScore

      this.events.emit('score', this.score)
      return
    }

    this.events.emit('position', this.position)
  }

  move(direction) {
    this.position.x += direction

    if (this.arena.collide(this)) {
      this.position.x -= direction
      return
    }

    this.events.emit('position', this.position)
  }

  reset() {
    const newPiece = this.piece.getRandomPiece()
    this.matrix = newPiece
    const arenaMiddle = this.arena.matrix[0].length / 2 | 0
    const pieceMiddle = this.matrix[0].length / 2 | 0
    this.position.y = 0
    this.position.x = arenaMiddle - pieceMiddle

    if (this.arena.collide(this)) {
      this.arena.clear()

      this.score = 0
      this.dropInterval = this.defaultInterval

      this.events.emit('score', this.score)
    }

    this.events.emit('position', this.position)
    this.events.emit('matrix', this.matrix)
  }

  rotate(dir) {
    const pos = this.position.x
    let offset = 1

    this.rotateMatrix(dir)

    while (this.arena.collide(this)) {
      this.position.x += offset
      offset = -(offset + (offset > 0 ? 1 : -1))

      if (offset > this.matrix[0].length) {
        this.rotateMatrix(-dir)
        this.position.x = pos
        return
      }
    }

    this.events.emit('matrix', this.matrix)
  }

  rotateMatrix(dir) {
    for (let y = 0; y < this.matrix.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [
          this.matrix[x][y],
          this.matrix[y][x]
        ] = [
          this.matrix[y][x],
          this.matrix[x][y]
        ]
      }
    }

    if (dir > 0) {
      return this.matrix.forEach(row => row.reverse())
    }

    return this.matrix.reverse()
  }

  update(deltaTime) {
    this.dropCounter += deltaTime

    if (this.dropCounter > this.dropInterval) {
      this.drop()
    }
  }
}

export default Player
