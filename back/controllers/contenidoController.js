const fs = require('fs');
const path = require('path');
const moment = require('moment');
const { response, request } = require('express');
const { subirArchivo, borrarArchivo } = require('../helpers/fileUpload');
const queriesContenidos = require('../database/queries/queriesContenidos');
const urlApiUpload = '/api/upload/';
const urlUploadMemorias = '../uploads/memorias/';
const carpetaMems = 'memorias';
const carpetaImgs = 'imagenes';
const carpetaDocs = 'documentos';

//Todo Alicia
const getHistoria = async (req, res = response) => {
    queriesContenidos.getHistoria()
        .then(historia => {

            const resp = {
                success: true,
                msg: 'Registros encontrado',
                data: historia.dataValues
            };

            res.status(200).json(resp);

        }).catch(err => {

            const resp = { success: false, msg: 'No hay registros' };

            res.status(200).json(resp);
        });
}


const getHorarios = (req, res = response) => {
    queriesContenidos.getHorarios()
        .then(horarios => {

            horarios.map(h => {
                h.hEntrada = moment(h.hEntrada, "HH:mm:ss").format('HH:mm');
                h.hSalida = moment(h.hSalida, "HH:mm:ss").format('HH:mm');
            })

            const resp = {
                success: true,
                data: horarios,
            }

            res.status(200).json(resp);

        }).catch(err => {

            const resp = { success: false, msg: 'No hay registros' };

            res.status(200).json(resp);
        });
}


const getTelefonos = (req, res = response) => {
    queriesContenidos.getTelefonos()
        .then(telefonos => {

            const resp = {
                success: true,
                msg: 'Registros encontrados',
                data: telefonos
            }

            res.status(200).json(resp);

        }).catch(err => {

            const resp = { success: false,  msg: 'No hay registros' };

            res.status(200).json(resp);
        });
}


const getDirecciones = (req, res = response) => {
    queriesContenidos.getDirecciones()
        .then(direcciones => {

            const resp = {
                success: true,
                data: direcciones
            }

            res.status(200).json(resp);

        }).catch(err => {

            const resp = { success: false,  msg: 'No hay registros' };

            res.status(200).json(resp);
        });
}


const getCargosJunta = (req, res = response) => {
    queriesContenidos.getCargosJunta()
        .then(listadoCargos => {

            const resp = {
                success: true,
                msg: 'Registos encontrados',
                data: listadoCargos
            }

            res.status(200).json(resp);

        }).catch(err => {

            const resp = {  success: false, msg: 'No hay registros' };

            res.status(200).json(resp);
        });
}


const getIntegrantesCargo = (req, res = response) => {
    queriesContenidos.getCargoIntegrantes()
        .then(listadoJunta => {

            const resp = {
                success: true, 
                msg: 'Registos encontrados',
                data: listadoJunta
            }

            res.status(200).json(resp);

        }).catch(err => {

            const resp = { success: false, msg: 'No hay registros' };

            res.status(200).json(resp);
        });
}


const getMemorias = (req, res = response) => {
    queriesContenidos.getMemorias()
        .then(memorias => {

            memorias.forEach(m => {
                const nombreImg = m.imagen
                    && fs.existsSync(path.join(__dirname, urlUploadMemorias, carpetaImgs, m.imagen))
                    ? m.imagen
                    : null;

                m.imagen = process.env.URL_PETICION + process.env.PORT + `${urlApiUpload}img/${nombreImg}`;
                m.documento = m.documento
                    && fs.existsSync(path.join(__dirname, urlUploadMemorias, carpetaDocs, m.documento))
                    ? process.env.URL_PETICION + process.env.PORT + `${urlApiUpload}doc/${m.documento}`
                    : null;
            });

            const resp = {
                success: true,
                msg: 'Registros encontrados',
                data: memorias
            }

            res.status(200).json(resp);

        }).catch(err => {

            const resp = {
                success: false,
                msg: 'No hay registros',
            }

            res.status(200).json(resp);
        });
}


const getImagen = async (req, res = response) => {
    const pathImagen = path.join(__dirname, urlUploadMemorias, carpetaImgs, req.params.nombre);

    return fs.existsSync(pathImagen)
        ? res.sendFile(pathImagen)
        : res.sendFile(path.join(__dirname, urlUploadMemorias, `${carpetaImgs}/default.png`))
}


const getDocumento = async (req, res = response) => {
    const pathDoc = path.join(__dirname, urlUploadMemorias, carpetaDocs, req.params.nombre);

    return fs.existsSync(pathDoc)
        ? res.sendFile(pathDoc)
        : res.sendFile(path.join(__dirname, urlUploadMemorias, `${carpetaImgs}/default.png`))
}


const descargarDocumento = async (req, res = response) => {
    const pathName = path.join(__dirname, urlUploadMemorias, carpetaDocs, req.params.nombre);

    if (!fs.existsSync(pathName))
        return res.status(404).json({ msg: 'No existe el archivo' });

    return res.download(pathName);
}


const updateHistoria = async (req, res = response) => {
    let resp = { success: false, msg: 'Se ha producido un error' };

    try {

        const historia = await queriesContenidos.updateHistoria(req.body);
       
        if (historia) {
            resp = {
                success: true,
                msg: 'Historia actualizada con éxito',
                historia: historia
            }
        }

        res.status(200).json(resp);

    } catch (err) {
        res.status(200).json(resp);
    }
}


const insertOrUpdateTfno = async (req, res = response) => { 
    let resp = { success: false, msg: 'Se ha producido un error' };
    let tfno;

    try {

        if (req.body.id == null) tfno = await queriesContenidos.insertTfno(req.body);
        else tfno = await queriesContenidos.updateTfno(req.body);
       
        if (tfno) {
            resp = {
                success: true,
                msg: 'Teléfono actualizado con éxito',
                data: tfno
            }
        }

        res.status(200).json(resp);

    } catch (err) {
        res.status(200).json(resp);
    }
}


const insertOrUpdateIntegranteJunta = async (req, res = response) => { 
    let resp = { success: false, msg: 'Se ha producido un error' };
    let intJunta;

    try {

        if (req.body.id == -1) intJunta = await queriesContenidos.insertIntegranteJunta(req.body);
        else intJunta = await queriesContenidos.updateIntegranteJunta(req.body);
       
        if (intJunta) {
            resp = {
                success: true,
                msg: 'Integrante actualizado con éxito',
                data: intJunta
            }
        }

        res.status(200).json(resp);

    } catch (err) {
        res.status(200).json(resp);
    }
}


const updateContacto = async (req, res = response) => {

    try {
        await Promise.all([
            req.body.telefonos.borrar.map(queriesContenidos.deleteTelefono),
            req.body.horarios.borrar.map(queriesContenidos.deleteHorario)
        ]);

        const [dirs, tlfns, horarios] = await Promise.all([
            Promise.all(req.body.direcciones.map(queriesContenidos.updateDireccion)),
            Promise.all(req.body.telefonos.guardar.map(t => t.id != -1 ? queriesContenidos.updateTelefono(t) : queriesContenidos.insertTelefono(t))),
            Promise.all(req.body.horarios.guardar.map(h => h.id != -1 ? queriesContenidos.updateHorario(h) : queriesContenidos.insertHorario(h)))
        ]);

        const resp = {
            success: true,
            msg: 'Se han guardado los cambios',
            data: {
                "dirs": dirs,
                "tlfns": tlfns,
                "horarios": horarios
            }
        }

        res.status(201).json(resp);

    } catch (err) {

        const resp = {
            success: false,
            msg: 'Se ha producido un error',
        }

        res.status(200).json(resp);
    }
}


const insertOrUpdateMemoria = async (req, res = response) => {
    const extImgs = ['png', 'jpg', 'jpeg', 'gif', 'tiff', 'svg', 'webp'];
    const extDocs = ['pdf', 'odt', 'doc', 'docx'];

    try {
        const memoria = { id: req.body.id, anio: req.body.anio };

        if (req.body.imgBorrar) borrarArchivo(`${carpetaMems}/${carpetaImgs}`, req.body.imgBorrar);
        if (req.body.docBorrar) borrarArchivo(`${carpetaMems}/${carpetaDocs}`, req.body.docBorrar);

        if (req.files) {
            if (req.files.imagen) memoria.imagen = await comprobarArchivo(req.files.imagen, extImgs, `${carpetaMems}/${carpetaImgs}`);
            if (req.files.documento) memoria.documento = await comprobarArchivo(req.files.documento, extDocs, `${carpetaMems}/${carpetaDocs}`);
        }

        const memResp = await queriesContenidos.insertOrUpdateMemoria(memoria);

        const nombreImg = memResp.imagen
            && fs.existsSync(path.join(__dirname, urlUploadMemorias, carpetaImgs, memResp.imagen))
            ? memResp.imagen
            : null;

        memResp.imagen = process.env.URL_PETICION + process.env.PORT + `${urlApiUpload}img/${nombreImg}`;
        memResp.documento = memResp.documento
            ? process.env.URL_PETICION + process.env.PORT + `${urlApiUpload}doc/${memResp.documento}`
            : null;

        const resp = {
            success: true,
            msg: 'Memoria guardada con éxito',
            data: memResp
        }

        res.status(200).json(resp);

    } catch (err) {

        const resp = {
            success: false,
            msg: 'Error al guardar la memoria',
        }

        res.status(200).json(resp);
    }
}


const comprobarArchivo = async (archivo, extensiones, carpeta) => {
    return (archivo.size != 0)
        ? await subirArchivo(archivo, extensiones, carpeta)
        : archivo.name;
}


const deleteMemoria = async (req, res = response) => {
    try {

        const mem = await queriesContenidos.getMemoria(req.params.id);
        let resp = await queriesContenidos.deleteMemoria(req.params.id);

        if (resp == 0) throw error;
        else {
            if (mem.imagen) borrarArchivo(`${carpetaMems}/${carpetaImgs}`, mem.imagen);
            if (mem.documento) borrarArchivo(`${carpetaMems}/${carpetaDocs}`, mem.documento);

            resp = {
                success: true,
                msg: 'Memoria eliminada con éxito',
                data: req.params.id
            }

            res.status(200).json(resp);
        }

    } catch (err) {

        const resp = {
            success: false,
            msg: 'Error al eliminar la memoria',
        }

        res.status(200).json(resp);
    }
}


const deleteTfno = async (req, res = response) => {
    let resp = { success: false, msg: 'Se ha producido un error' }

    try {

        const tfno = await queriesContenidos.deleteTfno(req.params.id);

        if (tfno == 1) {
            resp = {
                success: true,
                msg: 'Teléfono eliminado con éxito',
                data: req.params.id
            }
        }

        res.status(200).json(resp);

    } catch (err) {
        res.status(200).json(resp);
    }
}


const deleteIntegranteJunta = async (req, res = response) => {
    let resp = { success: false, msg: 'Se ha producido un error' }

    try {

        const integrante = await queriesContenidos.deleteIntegranteJunta(req.params.id);
        
        if (integrante == 1) {
            resp = {
                success: true,
                msg: 'Integrante eliminado con éxito',
                data: req.params.id
            }
        }

        res.status(200).json(resp);

    } catch (err) {
        res.status(200).json(resp);
    }
}


module.exports = {
    getHistoria,
    getHorarios,
    getTelefonos,
    getDirecciones,
    getCargosJunta,
    getIntegrantesCargo,
    getImagen,
    getDocumento,
    descargarDocumento,
    getMemorias,
    updateHistoria,
    insertOrUpdateTfno,
    insertOrUpdateIntegranteJunta,
    updateContacto,
    insertOrUpdateMemoria,
    deleteMemoria,
    deleteTfno,
    deleteIntegranteJunta
}