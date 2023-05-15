import express from "express";
import { Router } from "express";
import cors from 'cors';
import clientsrouter from "./routes/clients.router.js";
import rentalsrouter from "./routes/rentals.router.js";
import gamesrouter from "./routes/games.router.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


const router = Router();
router.use(clientsrouter);
router.use(gamesrouter);
router.use(rentalsrouter);
app.use(router);

app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});

