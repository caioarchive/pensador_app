import { Router } from "express";
import { listarPensamento } from "./pensamentoController.js";

import { verifyToken

 } from "../../middlewares/verifyToken.js";
const router = Router()

router.get('/', verifyToken, listarPensamento)

export default router