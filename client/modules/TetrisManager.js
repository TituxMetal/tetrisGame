import Tetris from './Tetris'

class TetrisManager {
  constructor(document) {
    this.document = document
    this.instances = new Set
    this.template = document.getElementById('playerTemplate')
  }

  createPlayer() {
    const element = this.document
      .importNode(this.template.content, true)
      .children[0]
    const tetris = new Tetris(element)
    
    this.instances.add(tetris)
    this.document.body.appendChild(tetris.element)

    return tetris
  }

  removePlayer(tetris) {
    this.instances.delete(tetris)
    this.document.body.removeChild(tetris.element)
  }
}

export default TetrisManager
