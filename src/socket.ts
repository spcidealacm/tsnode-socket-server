import { createServer } from "http"
import SocketIO, { Server } from "socket.io"

export class SocketServer {
  readonly http_server = createServer()
  readonly io = new Server(this.http_server, { cors: { origin: '*' } })
  readonly port = process.env.PORT || 3000

  constructor(){
    this.connect()
  }

  protected connect(){
    this.io.on('connect', (socket) => {
      this.connect_init(socket)
      socket.on('disconnect', () => {
        this.connect_finish(socket)
      })
    })
    
  }

  protected connect_init(socket: SocketIO.Socket){
    console.log("[Socket IO] client connected, id:", socket.id)
    socket.emit("which_type")
  }

  protected connect_finish(socket: SocketIO.Socket){
    console.log("[Socket IO] client disconnect id:", socket.id)
  }

  public start(){
    this.http_server.listen(this.port, ()=>{
      console.log('> Socket.io server start on port:', this.port)
    })
  }
}