import { getToken } from "../shared/function/getToken.js"
import jwt from 'jsonwebtoken'
export const verifyToken = (req, res, next) => {
    try {
        if(!req.headers.authorization){
            const err = new Error("O cabeçario 'authorization' é obrigatorio e deve conter um token bearer")
            err.statusCode = 401
            throw err
        }
        const token = getToken(req)
        if(!token){
            const err = new Error(
                "Esperado formato: 'Bearer <token>'. verifique se o token esta presente e corretamente formatado!"
            )
            err.statusCode = 401
            throw err
        }

        let verified 

        try {
            verified = jwt.verify(token, "SENHASUPERSEGURA")
            console.log(verified)
        } catch (jwtError) {

            let message

            if(jwtError.name === "TokenExpiredError"){
                message = "Token expirado. Por favor, faça login novamente"

            }else if(jwtError.name === "JsonWebTokenError"){
                message = "Token invalido. O token fornecido está mal formatado, corrompido ou não é confiavel"

            }else{
            message = "Erro ao validar token"
        }
    }
        req.usuario = verified
        next()

    } catch (error) {
        next(error)
    }
}