class ConnectionManager {
  constructor(tetrisManager) {
    this.connection = null
    this.localTetris = [...tetrisManager.instances][0]
    this.tetrisManager = tetrisManager
    this.peers = new Map
  }

  connect(address) {
    this.connection = new WebSocket(address)
    this.connection.addEventListener('open', () => {
      console.log('Connection established')
      this.initSession()
      this.watchEvents()
    })

    this.connection.addEventListener('message', event => {
      this.receive(event.data)
    })
  }

  initSession() {
    const sessionId = window.location.hash.split('#')[1]
    const state = this.localTetris.serialize()

    if (sessionId) {
      return this.send({ type: 'joinSession', id: sessionId, state })
    }

    this.send({ type: 'initSession', state })
  }

  receive(message) {
    const data = JSON.parse(message)
    
    if (data.type === 'sessionInitialized') {
      window.location.hash = data.id
    }

    if (data.type === 'sessionBroadcast') {
      this.updateManager(data.peers)
    }

    if (data.type === 'stateUpdate') {
      this.updatePeer(data.clientId, data.fragment, data.state)
    }
  }

  send(data) {
    const message = JSON.stringify(data)

    this.connection.send(message)
  }

  updateManager(peers) {
    const me = peers.you
    const clients = peers.clients.filter(client => me !== client.id)

    clients.forEach(client => {
      if (!this.peers.has(client.id)) {
        const tetris = this.tetrisManager.createPlayer()
        tetris.unserialize(client.state)
        this.peers.set(client.id, tetris)
      }
    });

    [...this.peers.entries()].forEach(([id, tetris]) => {
      if (!clients.some(client => client.id === id)) {
        this.tetrisManager.removePlayer(tetris)
        this.peers.delete(id)
      }
    })
  }

  updatePeer(id, fragment, [prop, value]) {
    if (!this.peers.has(id)) {
      console.error('Client does not exist', id)
      return
    }

    const tetris = this.peers.get(id)
    tetris[fragment][prop] = value

    if (prop === 'score') {
      return tetris.updateScore(value)
    }

    tetris.draw()
  }

  watchEvents() {
    const local = this.localTetris
    const player = local.player;
    
    ['position', 'matrix', 'score'].forEach(key => {
      player.events.listen(key, value => {
        this.send({
          type: 'stateUpdate',
          fragment: 'player',
          state: [key, value]
        })
      })
    })

    const arena = local.arena;

    ['matrix'].forEach(key => {
      arena.events.listen(key, value => {
        this.send({
          type: 'stateUpdate',
          fragment: 'arena',
          state: [key, value]
        })
      })
    })
  }
}

export default ConnectionManager
