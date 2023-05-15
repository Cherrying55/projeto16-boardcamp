import joi from "joi";

export const clientemodelo = joi.object({
    cpf: joi.string().length(11).required(),
    name: joi.string().required(),
    birthday: joi.date().required(),
    phone: joi.string().min(10).required()

})