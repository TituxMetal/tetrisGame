const express = require('express')
const path = require('path')
const WebSocketServer = require('ws').Server

const ConnectionManager = require('./ConnectionManager')

const port = process.env.PORT || 5000
const index = path.resolve(__dirname, 'dist', 'index.html')
const server = express()
  .use(express.static('dist'))
  .use((req, res) => res.sendFile(index))
  .listen(port, () => console.log(`Server running on port ${port}`))

const wss = new WebSocketServer({ server })
const connectionManager = new ConnectionManager()

wss.on('connection', connection => {
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
