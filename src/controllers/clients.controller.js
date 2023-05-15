import { db } from "../connections/db.js";

export async function postClient(req,res){
    const { name, phone , cpf , birthday } = req.body;

    
    try{
        const alreadyclient = await db.query(
            `SELECT * FROM clientes WHERE cpf = $1;`, [cpf]
        );
        if(alreadyclient.rows.length != 0){
            return res.sendStatus(409)
        }
    }
    catch (err){
        res.status(500).send(err.message)
    }
    

    try {
      await db.query(
        `INSERT INTO clientes (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);`,
        [name, phone, cpf, birthday]
      );
      return res.sendStatus(201);
    } catch (err) {
      res.status(500).send(err.message);
    }

    //close
}
export async function getClients(req,res){
      
  
    try {
      const clientes = await db.query(
              `SELECT * FROM clientes;`
          );
          if(clientes.rows.length === 0) return res.sendStatus(404);
  
      res.send(clientes.rows);
    } catch (err) {
      res.status(500).send(err.message);
    }
}

export async function getClientById(req, res) {
    const id = parseInt(req.params.id);
  
    if (!id) return res.sendStatus(400);
  
    try {
      const cliente = await db.query(
              `SELECT * FROM clientes WHERE id = $1;`, 
              [id]
          );
  
          if(cliente.rows.length === 0) return res.sendStatus(404);
  
      res.send(cliente.rows[0]);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  export async function updateClient(req,res){
    const {name, cpf, phone, birthday } = req.body;

    const id = parseInt(req.params.id);
  
    if (!id) return res.sendStatus(400);

    
    try{
        const alreadyclient = await db.query(
            `SELECT * FROM clientes WHERE cpf = $1;`, [cpf]
        );
        if(alreadyclient.rows.length != 0){
            return res.sendStatus(409)
        }
    }
    catch (err){
        res.status(500).send(err.message)
    }
    

    try{
        const update = await db.query(
            `UPDATE clientes SET name=$1, phone = $2, cpf = $3, birthday=$4 WHERE id=$5;`, 
            [name, phone, cpf, birthday, id]
        );
        res.sendStatus(200);
    }
    catch(err){
        res.status(500).send(err.message);
    }
  }