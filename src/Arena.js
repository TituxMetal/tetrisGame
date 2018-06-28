class Arena {
  constructor(width, height) {
    const matrix = []

    while (height--) {
      matrix.push(new Array(width).fill(0))
    }

    this.matrix = matrix
  }
}

export default Arena
