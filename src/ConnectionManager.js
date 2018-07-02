const Session = require('./Session')
const Client = require('./Client')

class ConnectionManager {
  constructor() {
    this.sessions = new Map
  }

  /*
    Generate a random ID
  */
  createId(length = 6) {
    const chars = 'abcdefghjkmnopqrstwxyz0123456789'
    let id = ''

    while (length--) {
      id += chars[Math.random() * chars.length | 0]
    }

    return id
  }

  /*
    Create a new Client with the given id or with a generated id
  */
  createClient(connection, id = this.createId()) {
    return new Client(connection, id)
  }

  /*
    Create a new Session with the given id or with a generated id
    Add the newly created Session to the list of sessions
  */
  createSession(id = this.createId()) {
    if (this.sessions.has(id)) {
      throw new Error(`Session ${id} already exists`)
    }
    
    const session = new Session(id)

    this.sessions.set(session.id, session)

    return session
  }

  /*
    Remove the given client from his session
    If no more client is session remove it
  */
  disconnect(client) {
    const session = client.getSession()
    
    session.remove(client)

    if (session.clients.size === 0) {
      this.sessions.delete(session.id)
    }
  }

  /*
    Create a new Session, add the Client to the Session, send a message to the client with the session ID
  */
  initSession(client) {
    const session = this.createSession()

    session.add(client)
    client.send({ type: 'sessionInitialized', id: session.id })
  }

  /*
    Check if the Client already has a session throw an error
    If the given id is present in the sessions list then add the Client to Session
    Add the Client in clients
  */
  joinSession(client, id) {
    if (client.getSession() !== null) {
      throw new Error('Client already in session')
    }

    const session = this.sessions.get(id) || this.createSession(id)
    
    session.add(client)
  }
}

module.exports = ConnectionManager
