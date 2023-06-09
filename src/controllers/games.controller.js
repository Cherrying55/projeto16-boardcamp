import { db } from "../connections/db.js";

export async function postGame(req,res){
  const { name, image, stockTotal, pricePerDay } = req.body;
  
  try{
      const alreadyname = await db.query(
          `SELECT name FROM jogos WHERE name = $1;`, [name]
      );
      if(alreadyname.rows.length != 0){
          return res.sendStatus(409)
      }
  }
  catch (err){
      return res.status(500).send(err.message)
  }
  
  try {
    const jogo = await db.query(
      `INSERT INTO jogos (name, image, stockTotal, pricePerDay) VALUES ($1, $2, $3, $4);`,
      [name, image, stockTotal, pricePerDay]
    );
    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }

  //close
}
export async function getGames(req,res){
    

  try {
    const game = await db.query(
            `SELECT * FROM jogos;`
        );
        if(game.rows.length === 0) return res.sendStatus(404);

    return res.send(game.rows[0]);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}