import express from 'express'
import cors from 'cors'
import { errorHandler } from './middlewares/errorHandler.js'
import { conn } from './config/sequelize.js'

import "./shared/database/associations.js"

import usuarioRoutes from './features/usuario/usuarioRoutes.js'
import pensamentoRoutes from './features/pensamentos/pensamentoRoutes.js'
import autenticacaoRoutes from './features/autenticacao/autenticacaoRoutes.js'

const app = express()


app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

app.use(express.json())

//http://localhost:3333/api/v1/usuarios
app.use('/api/v1/usuarios', usuarioRoutes)
app.use('/api/v1/pensamentos', pensamentoRoutes)
app.use('/api/v1/autenticacao', autenticacaoRoutes)

conn.sync()

app.use((req, res) => {
    res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Rota não encontrada"
    })
})

app.use(errorHandler)

export default app