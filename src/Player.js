class Player {
  constructor(tetris) {
    this.arena = tetris.arena
    this.dropCounter = 0
    this.dropInterval = 900
    this.position = { x: 0, y: 0 }
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
