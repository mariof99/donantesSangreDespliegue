const { Router } = require('express');
const router = Router();
const controlador = require('../controllers/chatController');
const mid = require("../middlewares/userMiddlewares");
const vJwt = require('../middlewares/validarJwt');

//Todo Isa
router.get('/listado',controlador.Listado);
router.delete('/borrar', controlador.borrarMensajes);//Borra todo queda echo por si al final lo añado
module.exports = router;