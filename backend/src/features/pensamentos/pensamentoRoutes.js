import { Router } from "express";
import { criarPensamento, listarPensamento } from "./pensamentoController.js";

import {
    verifyToken

} from "../../middlewares/verifyToken.js";
import { pensamentoModel } from "./pensamentoModel.js";
const router = Router()

router.get('/', verifyToken, listarPensamento)
router.post("/", verifyToken, criarPensamento)

export default router