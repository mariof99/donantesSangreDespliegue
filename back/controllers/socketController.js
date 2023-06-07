//Isa
const jwt = require('jsonwebtoken');
const userCan = require('../helpers/rolesAbilities');
const statsController = require('./statsController');
const { getArrayRoles } = require('../helpers/getRelaciones');
const queriesChat = require("../database/queries/queries-chat");
const queriesUsers = require('../database/queries/queriesUsers');


const connectedUsers = [];
const salaChat = "Chat"


const conectarChat = (socket, data, callback) => {
  let { payload } = socket.handshake.query;

  if (payload != 'undefined' && payload != "") {

    if (!connectedUsers.includes(payload)) {
      socket.join(salaChat);
      connectedUsers.push(payload);
    }

    callback(connectedUsers);
    socket.to(salaChat).emit("usuario-conectado", connectedUsers);
  }
};


const desconectado = (socket) => {
  const { payload } = socket.handshake.query;

  const index = connectedUsers.indexOf(payload);

  if (index !== -1) {
    connectedUsers.splice(index, 1);
    socket.to(salaChat).emit("usuario-conectado", connectedUsers);
    socket.leave(salaChat);
  }
};


const logout = (socket, data, callback) => {
  socket.leave(salaChat)

  const index = connectedUsers.indexOf(data["payload"]);

  if (index !== -1) {
    connectedUsers.splice(index, 1);
    callback({ success: true, data: connectedUsers, msg: "Ha cerrado sesion correctamente" });
    socket.to(salaChat).emit("usuario-conectado", connectedUsers);
    socket.leave(salaChat);
  }
};


const iniciarSesion = (socket, data, callback) => {
  socket.join(salaChat);
  connectedUsers.push(data["payload"]);

  callback({ success: true, data: connectedUsers, msg: "Ha iniciado correctamente" });
  socket.to(salaChat).emit("usuario-conectado", connectedUsers);
};


const enviarMensaje = (socket, data, callback) => {
  if (connectedUsers.includes(data["payload"]["nombreUser"])) {

    queriesChat.addMensaje(data["payload"]).then((respuesta) => {
      callback(respuesta);
      socket.to(salaChat).emit('enviar-mensaje', respuesta.data);

    }).catch((error) => {
      console.error('Error al agregar el mensaje:', error);
    });

  } else {
    socket.to(salaChat).emit('error', { message: 'El usuario no está conectado' });
  }
};


const socketController = (socket) => {

  socket.on('conectar-chat', (data, callback) => {
    conectarChat(socket, data, callback);
  });

  socket.on('iniciarSesion', (data, callback) => {
    iniciarSesion(socket, data, callback);
  });

  socket.on('disconnect', () => {
    desconectado(socket);
  });

  socket.on('enviar-mensaje', (data, callback) => {
    enviarMensaje(socket, data, callback);
  });

  socket.on('logout', (data, callback) => {
    logout(socket, data, callback);
  });

  socket.on('enviar-lista', () => {
    socket.to(salaChat).emit("usuario-conectado", connectedUsers);
  });

  socket.on('lista', (data, callback) => {
    callback({ success: true, data: connectedUsers });
    socket.to(salaChat).emit("usuario-conectado", connectedUsers);
  });

  socket.on('insertar-donacion', async (datos, callback) => {
    const user = JSON.parse(socket.handshake.query.payload);

    if (validarToken(user.token) != -1 && await validarRol(user)) {

      const resp = await statsController.insertDonacion(datos);
      callback(resp);

      socket.broadcast.emit('insertar-donacion', resp);
  
    } else callback({ sucess: false, msg: 'No autorizado' });
  });

  socket.on('insertar-altas', async (payload, callback) => {
    const user = JSON.parse(socket.handshake.query.payload);

    if (validarToken(user.token) != -1 && await validarRol(user)) {

      const resp = await statsController.insertAltas(payload);
      callback(resp);

      socket.broadcast.emit('insertar-altas', resp);

    } else callback({ sucess: false, msg: 'No autorizado' });
  });
};


const validarRol = async(user) => {
  const userRoles = await queriesUsers.getUserRoles(user.id);
  const roles = getArrayRoles(userRoles);
  const abilities = await queriesUsers.getAbilities(roles);

  let arrayAbilities = [];
  abilities.forEach(ability => {
    arrayAbilities = Array.from(new Set([...arrayAbilities, ...ability.dataValues.abilities.split(' ')]));
  });

  user.userAbilites = arrayAbilities;

  return await userCan(user, ['leer', 'editar', 'borrar']);
}


const validarToken = (token) => {
  try {
    const { id } = jwt.verify(token, process.env.JWT_PRIVATEKEY);
    return id;

  } catch (err) {

    return -1;
  }
}



module.exports = { socketController }