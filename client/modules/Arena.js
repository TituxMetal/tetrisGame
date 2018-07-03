import Events from './Events'

class Arena {
  constructor(width, height) {
    const matrix = []

    while (height--) {
      matrix.push(new Array(width).fill(0))
    }

    this.events = new Events
    this.matrix = matrix
  }

  clear() {
    this.matrix.forEach(row => row.fill(0))
    this.events.emit('matrix', this.matrix)
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

  merge(player) {
    player.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          this.matrix[y + player.position.y][x + player.position.x] = value
        }
      })
    })

    this.events.emit('matrix', this.matrix)
  }
  
  sweep() {
    let rowCount = 1
    let score = 0

    outer: for (let y = this.matrix.length - 1; y > 0; --y) {
      for (let x = 0; x < this.matrix[y].length; ++x) {
        if (this.matrix[y][x] === 0) {
          continue outer
        }
      }

      const row = this.matrix.splice(y, 1)[0].fill(0)
      score += rowCount * 10

      this.matrix.unshift(row)
      ++y
    }

    this.events.emit('matrix', this.matrix)

    return score
  }
}

export default Arena
