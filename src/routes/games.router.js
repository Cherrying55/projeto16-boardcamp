import { Router } from "express";
import { getGames, postGame } from "../controllers/games.controller.js";
import { validamodelo } from "../middlewares/universalValidation.js";
import { jogomodelo } from "../schemas/games.schema.js";


const gamesrouter = Router();

gamesrouter.post("/games", validamodelo(jogomodelo), postGame);
gamesrouter.get("/games", getGames);

export default gamesrouter;