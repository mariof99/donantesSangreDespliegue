//Isa
const sequelize = require('../ConexionSequelize');
const models = require('../../models/index.js');
const moment = require('moment');
const metodosFecha = require('../../helpers/fechas');

class QueriesChat {
    constructor() {
        this.sequelize = sequelize;
    }
    getListado = async () => {
        let mensajes = "";
        let c = [];
        try {
            this.sequelize.conectar();
            mensajes = await models.Chat.findAll();
            if (mensajes != null) {
                let data = "";
                mensajes.forEach(m => {
                    let fecha = "";
                    let hora = "";
                    hora = moment(m.dataValues.createdAt, 'HH:mm').format('HH:mm');
                    fecha = new Date(m.dataValues.createdAt).toLocaleDateString();
                    //Se deja creado por si da problemas con la hora.
                    /*
                    let fechaDb = new Date(m.dataValues.createdAt);
                    fechaDb.setHours(fechaDb.getHours() + 2);
                    
                    if (!metodosFecha.comprobarHoraFecha(fechaDb, m.dataValues.createdAt)) {
                        hora = moment(m.dataValues.createdAt, 'HH:mm').subtract(2, 'hour').format('HH:mm');
                    } else {
                        hora = moment(m.dataValues.createdAt, 'HH:mm').format('HH:mm');
                    }
                    */
                    data = {
                        "id": m.dataValues.id,
                        "nombre": m.dataValues.nombreUser,
                        "mensaje": m.dataValues.mensaje,
                        "fecha": fecha,
                        "hora": hora
                    }
                    c.push(data);
                });
            }
            this.sequelize.desconectar();
        } catch (err) {
            this.sequelize.desconectar();
            throw err;
        }
        return c;
    }
    addMensaje = async (datos) => {

        let data = "";
        let respuesta="";
        this.sequelize.conectar();
        try {
            let mensaje = await models.Chat.create({
                idUser: datos.id,
                nombreUser: datos.nombreUser,
                mensaje: datos.mensaje
            });
            let hora = moment(mensaje.dataValues.createdAt, 'HH:mm').format('HH:mm');
            let fecha = new Date(mensaje.dataValues.createdAt).toLocaleDateString();

            data = {
                "idUser": datos.id,
                "nombre": datos.nombreUser,
                "mensaje": datos.mensaje,
                "fecha": fecha,
                "hora": hora
            }
            this.sequelize.desconectar();

        } catch (err) {
            this.sequelize.desconectar();
            throw err;
        }
        respuesta = {
            success: true,
            data: data,
            msg: 'Mensaje creado'
        }
        return respuesta;
    }
    borrarTodo = async () => {
        this.sequelize.conectar();
        let mensajes = await models.Chat.findAll();
        if (!mensajes) {
            this.sequelize.desconectar();
            throw error;
        }
        for (let index = 0; index < mensajes.length; index++) {
            await mensajes[index].destroy();
        }
        this.sequelize.desconectar();
        return mensajes;
    }
}




const queriesChat = new QueriesChat();
module.exports = queriesChat;