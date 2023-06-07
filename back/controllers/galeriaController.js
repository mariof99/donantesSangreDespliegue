const {response, request} = require('express');
const queries_Galeria = require('../database/queries/queriesGaleria');
const fs = require('fs');
const path = require('path');

//Todo Alejandro

const getGaleria_Imagenes = (req = request, res = response) => {
    
    queries_Galeria.getGaleria_Imagenes()
    .then( msg => {
        res.status(200).json(msg);
    });
}

const insertar_Galeria_Imagen = (req = request, res = response) => {
    queries_Galeria.insertarGaleria_Imagen(req)
    .then( msg => {
        res.status(201).json(msg);
    });
}

const mostrar_Galeria_Imagen = (req, res = response) => {
    
    queries_Galeria.getGaleria_Imagen(req.params.id).then((imagen) => {
        if (imagen) {
            const pathImagen = path.join(__dirname, '../uploads', 'galeria', imagen.nombre);
            if (fs.existsSync(pathImagen)) {
                return res.sendFile(pathImagen);
            }
        }
    }).catch((err) => {
        console.log("No se ha encontrado la Imagen");
    });
}

const borrarGaleria = (req, res = response) => {
    queries_Galeria.deleteGaleriaImagen(req.params.id).then((imagen) => {
        res.status(204).json("La imagen de la Galeria ha sido eliminada");
    }).catch((err) => {
        res.status(400).json("No se ha podido eliminar la imagen de la galeria");
    })
}
module.exports = {
    insertar_Galeria_Imagen,
    getGaleria_Imagenes,
    mostrar_Galeria_Imagen,
    borrarGaleria
}