const { Router } = require('express');
const controlador = require('../controllers/galeriaController');
const router = Router();

//Todo Alejandro

router.get('/mostrarGaleria_Imagenes', controlador.getGaleria_Imagenes);
router.post('/insertarGaleria_imagen', controlador.insertar_Galeria_Imagen);
router.get('/upload/:id', controlador.mostrar_Galeria_Imagen);
router.delete('/borrarGaleria_Imagen/:id', controlador.borrarGaleria);

module.exports = router;