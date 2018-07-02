class ConnectionManager {
  constructor() {
    this.connection = null
  }

  connect(address) {
    this.connection = new WebSocket(address)
    this.connection.addEventListener('open', () => {
      console.log('Connection established')
      this.initSession()
    })

    this.connection.addEventListener('message', event => {
      console.log('Received message', event.data)
      this.receive(event.data)
    })
  }

  initSession() {
    const sessionId = window.location.hash.split('#')[1]

    if (sessionId) {
      return this.send({ type: 'joinSession', id: sessionId })
    }

    this.send({ type: 'initSession' })
  }

  receive(message) {
    const data = JSON.parse(message)
    
    if (data.type === 'sessionInitialized') {
      window.location.hash = data.id
    }
  }

  send(data) {
    const message = JSON.stringify(data)
    console.log(`Sending message ${message}`)

    this.connection.send(message)
  }
}

export default ConnectionManager
