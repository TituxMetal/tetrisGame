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
    const random = this.pieces[this.pieces.length * Math.random() | 0]

    return this.createPiece(random)
  }
}

export default Piece
