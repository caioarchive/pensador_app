import jwt from 'jsonwebtoken'

const senhaToken = "SENHASUPERSEGURA"

export const createTokenUser = (usuario, req, res) => {
    const token = jwt.sign(
        {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
        },
        senhaToken,
        {expiresIn: "12h"}
        )
        res.status(200).json({
            success:true,
            statusCode: 200,
            message: "Voce está autenticado",
            token,
            usuarioId: usuario.id,
        })
}