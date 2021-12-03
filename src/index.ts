import './env'
import { SocketServer } from './socket'

const server = new SocketServer()
server.start()