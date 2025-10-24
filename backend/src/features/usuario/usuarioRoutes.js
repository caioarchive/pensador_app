import { Router } from "express";
import { criarUsuario } from "./usuarioController.js";

const router = Router()

router.post('/', criarUsuario)

export default router