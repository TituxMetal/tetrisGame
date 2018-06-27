class Player {
  
  constructor() {
    this.dropCounter = 0
    this.dropInterval = 900
    this.position = { x: 0, y: 0 }
    this.matrix = null
    this.score = 0
  }

  drop() {
    this.position.y++
    this.dropCounter = 0
  }

  move(direction) {
    this.position.x += direction
  }

  update(deltaTime) {
    this.dropCounter += deltaTime
    
    if (this.dropCounter > this.dropInterval) {
      this.drop()
    }
  }
}

export default Player
