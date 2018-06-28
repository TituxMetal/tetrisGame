class Arena {
  constructor(width, height) {
    const matrix = []

    while (height--) {
      matrix.push(new Array(width).fill(0))
    }

    this.matrix = matrix
  }

  collide(player) {
    const [matrix, offset] = [player.matrix, player.position]

    for (let y = 0; y < matrix.length; ++y) {
      for (let x = 0; x < matrix[y].length; ++x) {
        if (matrix[y][x] !== 0 &&
          (this.matrix[y + offset.y] &&
            this.matrix[y + offset.y][x + offset.x]) !== 0) {
          return true
        }
      }
    }

    return false
  }
}

export default Arena
