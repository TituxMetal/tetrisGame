class Piece {
  constructor() {
    this.colors = [
      null,
      '#FF0D72', 
      '#0DC2FF',
      '#0DFF72',
      '#F538FF',
      '#FF8E0D',
      '#FFE138',
      '#3877FF'
    ]
    this.pieces = 'IJLOSTZ'
    this.random = []
  }

  createPiece(type) {
    switch (type) {
      case ('I'):
        return [
          [0, 6, 0, 0],
          [0, 6, 0, 0],
          [0, 6, 0, 0],
          [0, 6, 0, 0]
        ]
      case ('J'):
        return [
          [0, 2, 0],
          [0, 2, 0],
          [2, 2, 0]
        ]
      case ('L'):
        return [
          [0, 3, 0],
          [0, 3, 0],
          [0, 3, 3]
        ]
      case ('O'):
        return [
          [7, 7],
          [7, 7]
        ]
      case ('S'):
        return [
          [0, 5, 5],
          [5, 5, 0],
          [0, 0, 0]
        ]
      case ('T'):
        return [
          [1, 1, 1],
          [0, 1, 0],
          [0, 0, 0]
        ]
      case ('Z'):
        return [
          [4, 4, 0],
          [0, 4, 4],
          [0, 0, 0]
        ]
    }
  }

  getRandomPiece() {
    if (this.random.length < 1) {
      while (this.random.length < this.pieces.length - 1) {
        this.random.push(this.pieces[this.pieces.length * Math.random() | 0])
        this.random = this.random.filter((v, i, a) => a.indexOf(v) === i)
      }
    }

    const rdm = this.random[this.random.length * Math.random() | 0]

    this.random.splice(this.random.indexOf(rdm), 1)

    return this.createPiece(rdm)
  }
}

export default Piece
