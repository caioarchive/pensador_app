import { usuarioModel } from "../../features/usuario/usuarioModel.js";
import { pensamentoModel } from "../../features/pensamentos/pensamentoModel.js";

//1:N - 1 USUARIO PODE TER MUITO PENSAMENTOS!

pensamentoModel.belongsTo(usuarioModel, { foreignKey: 'usuarioId' });
usuarioModel.hasMany(pensamentoModel, { foreignKey: 'usuarioId' });
export {usuarioModel, pensamentoModel}