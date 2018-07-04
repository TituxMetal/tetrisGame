class Client {
  constructor(connection, id) {
    this.connection = connection
    this.id = id
    this.session = null
    this.state = null
  }

  send(data) {
    const msgData = JSON.stringify(data)
    
    this.connection.send(msgData, (error) => {
      if (error) {
        console.error('Message failed', msgData, error)
      }
    })
  }

  getSession() {
    return this.session
  }

  setSession(session) {
    this.session = session
  }
}

module.exports = Client
