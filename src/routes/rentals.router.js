import { Router } from "express";
import { getRentals, postRental, deleteRental, endRental } from "../controllers/rentals.controller.js";
import { validamodelo } from "../middlewares/universalValidation.js";
import { aluguelmodelo } from "../schemas/rentals.schema.js";

const rentalsrouter = Router();

rentalsrouter.get("/rentals", getRentals);
rentalsrouter.post("/rentals", validamodelo(aluguelmodelo), postRental);
rentalsrouter.delete("/rentals/:id", deleteRental);
rentalsrouter.post("/rentals/:id/return", endRental);

export default rentalsrouter;