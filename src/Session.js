class Session {
  constructor(id) {
    this.id = id
    this.clients = new Set
  }

  add(client) {
    if (client.session !== null) {
      throw new Error('Client already in session')
    }

    client.setSession(this)
    this.clients.add(client)

    return client
  }

  countClients() {
    return this.clients.size | 0
  }

  remove(client) {
    if (client.session !== this) {
      throw new Error('Client not in session')
    }

    this.clients.delete(client)
    client.setSession(null)
  }
}

module.exports = Session
