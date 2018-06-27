class Player {
  
  constructor() {
    this.position = { x: 0, y: 0 }
    this.matrix = null
    this.score = 0
  }

  drop() {
    this.position.y++
  }

  move(direction) {
    this.position.x += direction
  }
}

export default Player
