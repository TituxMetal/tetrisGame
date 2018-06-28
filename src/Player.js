class Player {

  constructor(tetris) {
    this.dropCounter = 0
    this.dropInterval = 900
    this.position = { x: 0, y: 0 }
    this.matrix = null
    this.arena = tetris.arena
    this.score = 0
  }

  drop() {
    this.position.y++
    this.dropCounter = 0

    if (this.arena.collide(this)) {
      this.position.y--
    }
  }

  move(direction) {
    this.position.x += direction

    if (this.arena.collide(this)) {
      this.position.x -= direction
    }
  }

  update(deltaTime) {
    this.dropCounter += deltaTime

    if (this.dropCounter > this.dropInterval) {
      this.drop()
    }
  }
}

export default Player
