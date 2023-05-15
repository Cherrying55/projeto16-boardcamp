import dayjs from "dayjs";
import { db } from "../connections/db.js";

export async function getRentals(req,res){
      
  
    try {
      const alugueis = await db.query(
              `SELECT alugueis.*, 
              clientes.id AS "idCustomer", 
              clientes.name AS "customerName", 
              jogos.id AS "idGame", 
              jogos.name AS "gameName"
          FROM
              alugueis
          JOIN
              clientes
          ON
              alugueis.customerId = clientes.id
          JOIN
              jogos
          ON
              jogos.id = alugueis.gameId
        ;`        
          );
          if(alugueis.rows.length === 0) return res.sendStatus(404);
      return res.send(alugueis.rows);
    } catch (err) {
      return res.status(500).send(err.message);
    }
}

export async function postRental(req,res){
    const {customerId, gameId, daysRented } = req.body;

    try{
        const customerindb = await db.query(`
        SELECT * FROM clientes WHERE id=$1
        `,[customerId]);
        if(customerindb.rows.length === 0){
            return res.sendStatus(400)
        }
    }
    catch(err){
        return res.status(500).send(err.message);
    }

    try{
        const gameindb = await db.query(`
        SELECT * FROM jogos WHERE id=$1
        `,[gameId]);
        if(gameindb.rows.length === 0){
            return res.sendStatus(400)
        }
    }
    catch(err){
        return res.status(500).send(err.message);
    }

    try {
        const temespaco= await db.query(`SELECT * FROM jogos WHERE id=$1`, [gameId]);
        if(temespaco.rows[0].stockTotal < daysRented){
            res.sendStatus(400);
        }
    } catch (err) {
        return res.status(500).send(err.message);
    }

    try{
        const query = await db.query(`
        SELECT * FROM jogos WHERE id=$1
        `,[gameId]);
        let game = query.rows[0];
        console.log(game.priceperday * daysRented);
        let originalPrice = game.priceperday * daysRented;
        const novoaluguel = await db.query(`
        INSERT INTO alugueis (customerId, gameId, daysRented, rentDate, originalPrice, returnDate, delayFee) VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [customerId, gameId, daysRented, dayjs().format('DD-MM-YYYY'), originalPrice , null, null ]);
        return res.sendStatus(201);
    }
    catch(err){
        return res.status(500).send(err.message);
    }
}

export async function deleteRental(req,res){
    const id = parseInt(req.params.id);
  
    if (!id) return res.sendStatus(400);

    try {

        const nadb = await db.query(`
        SELECT * FROM alugueis WHERE id=$1
        `,[id]);
        const preenchido = nadb.rows[0].returnDate;
        if(preenchido){
            return res.sendStatus(400)
        }
        
    } catch (err) {
        return res.status(500).send(err.message);
    }

    try {
        
        const deletedb = await db.query(`
        DELETE FROM alugueis WHERE id=$1
        `, [id]);
        return res.sendStatus(200)

    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function endRental(req,res){
    const id = parseInt(req.params.id);
  
    if (!id) return res.sendStatus(400);

    try {

        const query = await db.query(`
    SELECT * FROM alugueis WHERE id=$1
    `, [id]);
    if(query.rows.length === 0){
        return res.sendStatus(404);
    }
    const aluguel = query.rows[0];
    console.log(aluguel);
    if (aluguel.returnDate) return res.sendStatus(400);
    let formatado = dayjs(aluguel.rentDate).format('DD-MM-YYYY');
    let diferença = dayjs().diff(dayjs(formatado), 'days');
    let delayFee = 0;
    if (diferença > aluguel.daysRented) {
      const passados = diferença - aluguel.daysRented;
      delayFee = passados * aluguel.originalPrice;
    }
    const update = db.query(
        `
          UPDATE alugueis
          SET returnDate = $1, delayFee = $2
          WHERE id=$3;
       `,
        [dayjs().format("DD-MM-YYYY"), delayFee, id]
      );
     return res.sendStatus(200);
        
    } catch (error) {
        return res.status(500).send(error.message)
    }
    
}