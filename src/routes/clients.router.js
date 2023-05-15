import { Router } from "express";
import { postClient, getClients, getClientById, updateClient } from "../controllers/clients.controller.js";
import { validamodelo } from "../middlewares/universalValidation.js";
import { clientemodelo } from "../schemas/clients.schema.js";

const clientsrouter = Router();

clientsrouter.post("/customers", validamodelo(clientemodelo), postClient);
clientsrouter.get("/customers", getClients);
clientsrouter.get("/customers/:id", getClientById);
clientsrouter.put("/customers/:id", validamodelo(clientemodelo), updateClient);

export default clientsrouter;