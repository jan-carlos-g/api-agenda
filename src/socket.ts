import { Server } from "socket.io"
import { serverHttp } from "./http"

const io = new Server(serverHttp, {
    cors: {
        origin: "*"
    }
})

io.on("connection", async (socket) => {
    console.log(`Usuário conectado no socket ${socket.id}`)

    socket.on("disconnect", async () => {
        console.log(`Usuário desconectado do socket ${socket.id}`)
    })

})

export { io }