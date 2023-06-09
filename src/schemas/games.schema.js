import joi from "joi";

export const jogomodelo = joi.object({
    name: joi.string().required(),
    image: joi.string(),
    stockTotal: joi.number().min(1).required(),
    pricePerDay: joi.number().greater(0).required()
})