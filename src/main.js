const WebSocketServer = require('ws').Server

const ConnectionManager = require('./ConnectionManager')

const server = new WebSocketServer({ port: 9000 })
const connectionManager = new ConnectionManager()

server.on('connection', connection => {
  const client = connectionManager.createClient(connection)

  console.log('Connection established')

  connection.on('message', message => {
    const data = JSON.parse(message)
    const messageType = data.type

    switch (messageType) {
      case ('initSession'):
        connectionManager.initSession(client, data)
        console.log(
          `A new client start a session
          client id: ${client.id}
          session id: ${client.session.id}`
        )
        break
      case ('joinSession'):
        connectionManager.joinSession(client, data)
        console.log(
          `A new client join a session
          client id: ${client.id}
          session id: ${client.session.id}`
        )
        break
      case ('stateUpdate'):
        connectionManager.broadcastClient(client, data)
        break
    }
  })

  connection.on('close', () => {
    connectionManager.disconnect(client)

    const sessionCount = connectionManager.sessions.size
  
    console.log(
      `Client disconnect
      client id: ${client.id}
      There is now ${sessionCount} session${sessionCount > 1 ? 's' : ''}`
    )
  })
})
