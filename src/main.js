const WebSocketServer = require('ws').Server

const ConnectionManager = require('./ConnectionManager')

const server = new WebSocketServer({ port: 9000 })
const connectionManager = new ConnectionManager()

server.on('connection', connection => {
  const client = connectionManager.createClient(connection)

  console.log('Connection established and new client created')

  connection.on('message', message => {
    const data = JSON.parse(message)
    const messageType = data.type

    console.log(`Message received`)

    switch (messageType) {
      case ('initSession'):
        connectionManager.initSession(client)
        console.log('initSession Ok')
        break
      case ('joinSession'):
        connectionManager.joinSession(client, data.id)
        console.log('joinSession Ok')
        break
    }
  })

  connection.on('close', () => {
    connectionManager.disconnect(client)
    
    const sessionCount = connectionManager.sessions.size

    console.log(
      `Client disconnected, there is now ${sessionCount} session${sessionCount > 1 ? 's' : ''}`
    )
  })
})
