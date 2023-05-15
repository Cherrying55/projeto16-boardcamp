import dayjs from "dayjs";
import { db } from "../connections/db.js";

export async function getRentals(req,res){
      
  
    try {
      const alugueis = await db.query(
              `SELECT * FROM alugueis;
              JOIN clientes ON alugueis."customerId"=clientes.id
              JOIN jogos ON alugueis."gameId"=jogos.id;
              `
          );
          if(alugueis.rows.length === 0) return res.sendStatus(404);
  
      res.send(alugueis);
    } catch (err) {
      res.status(500).send(err.message);
    }
}

export async function postRental(req,res){
    const {customerId, gameId, daysRented } = req.body;

    try{
        const customerindb = db.query(`
        SELECT * FROM clientes WHERE id=$1
        `,[customerId]);
        if(!customerindb){
            res.sendStatus(400)
        }
    }
    catch(err){
        res.status(500).send(err.message);
    }

    try{
        const gameindb = db.query(`
        SELECT * FROM jogos WHERE id=$1
        `,[gameId]);
        if(!gameindb){
            res.sendStatus(400)
        }
    }
    catch(err){
        res.status(500).send(err.message);
    }

    try {
        const temespaco= db.query(`SELECT * FROM jogos WHERE id=$1`, [gameId]);
        if(temespaco.rows[0].stockTotal < daysRented){
            res.sendStatus(400);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }

    try{
        const novoaluguel = db.query(`
        INSERT INTO alugueis (customerId, gameId, daysRented) VALUES ($1, $2, $3)
        `, [customerId, gameId, daysRented]);
        res.sendStatus(201);
    }
    catch(err){
        res.status(500).send(err.message);
    }
}

export async function deleteRental(req,res){
    const id = parseInt(req.params.id);
  
    if (!id) return res.sendStatus(400);

    try {

        const nadb = db.query(`
        SELECT * FROM alugueis WHERE id=$1
        `,[id]);
        const preenchido = nadb.rows[0].returnDate;
        if(preenchido){
            res.sendStatus(400)
        }
        
    } catch (err) {
        res.status(500).send(err.message);
    }

    try {
        
        const deletedb = db.query(`
        DELETE FROM alugueis WHERE id=$1
        `, [id]);
        res.sendStatus(200)

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function endRental(req,res){

}