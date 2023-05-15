
export function validamodelo(modelo){
    
    return (req,res,next) => {
        const validation = modelo.validate(req.body);
    
      if (validation.error) {
        return res.sendStatus(400);
      }
    
      next();
    }
    }