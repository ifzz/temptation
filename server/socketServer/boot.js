import socketIO from 'socket.io'

let numUsers = 0 // 0

const SERVICE_NAME_PREFIX = 'chatroom-'

export default function(server) {
  let io = socketIO(server)

  io.on('connection', (socket) => {
    let __added = false

    socket.on(`${SERVICE_NAME_PREFIX}new message`, (data) => {
      let msgData = {
        sender: socket.user,
        createTime: new Date(),
        message: data.message,
      }
      socket.broadcast.emit(`${SERVICE_NAME_PREFIX}new message`, msgData)
    })

    // when the client emits 'add user', this listens and executes
    socket.on(`${SERVICE_NAME_PREFIX}add user`, (userInfo) => {

      console.log(`${userInfo['name']} 进入聊天室`)

      if (__added) return

      numUsers += 1
      __added = true
        // we store the username in the socket session for this client
      socket.user = userInfo

      socket.emit(`${SERVICE_NAME_PREFIX}login`, {
        numUsers: numUsers,
      })

      // echo globally (all clients) that a person has connected
      socket.broadcast.emit(`${SERVICE_NAME_PREFIX}user joined`, {
        user: socket.user,
        numUsers: numUsers,
      })
    })

    // when the client emits 'typing', we broadcast it to others
    socket.on(`${SERVICE_NAME_PREFIX}typing`, () => {
      socket.broadcast.emit(`${SERVICE_NAME_PREFIX}typing`, {
        user: socket.user,
        _id: socket.id,
      })
    })

    // when the client emits 'stop typing', we broadcast it to others
    socket.on(`${SERVICE_NAME_PREFIX}stop typing`, () => {
      socket.broadcast.emit(`${SERVICE_NAME_PREFIX}stop typing`, {
        _id: socket.id,
      })
    })

    // when the user disconnects.. perform this
    socket.on('disconnect', () => {

      if (__added) {
        numUsers -= 1
      }
      // echo globally that this client has left
      socket.broadcast.emit(`${SERVICE_NAME_PREFIX}user left`, {
        user: socket.user,
        numUsers: numUsers,
      })
    })
  })
}
