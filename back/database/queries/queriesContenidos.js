const Sequelize = require('sequelize');
const models = require('../../models/index.js');

//Alicia
getHistoria = async () => {
  const historia = await models.Contenido.findOne({
    attributes: ['id', 'nombre', 'valor'],
    where: {
      nombre: 'historia'
    }
  });

  return historia;
}


getHorarios = async () => {
  const horarios = await models.Horario.findAll();

  return horarios;
}


getTelefonos = async () => {
  const telefonos = await models.Telefono.findAll();

  return telefonos;
}


getDirecciones = async () => {
  const direcciones = await models.Direccion.findAll();

  return direcciones;
}


getCargosJunta = async () => {
  const cargos = await models.CargoJunta.findAll();

  return cargos;
}


getCargoIntegrantes = async () => {
  //https://stackoverflow.com/questions/68132680/how-to-return-values-from-joined-tables-in-sequelize-at-the-same-level-as-master
  const cargosIntegrantes = await models.IntegranteJunta.findAll({
    include: [
      {
        model: models.CargoIntegrante,
        attributes: [],
        as: 'CargoIntegrante',
        include: [
          {
            model: models.CargoJunta,
            attributes: [],
            as: 'CargoJunta'
          }
        ]
      }
    ],
    attributes: ['id', 'nombre', [Sequelize.col('CargoIntegrante.CargoJunta.nombre'), 'cargo'],
      [Sequelize.col('CargoIntegrante.CargoJunta.id'), 'idCargo']]
  });

  return cargosIntegrantes;
}


getMemoria = async (id) => {
  const memoria = await models.Memoria.findByPk(id);

  return memoria;
}


getMemorias = async () => {
  const memorias = await models.Memoria.findAll({ order: [['anio', 'ASC']] });

  return memorias;
}


insertHorario = async (horario) => {
  try {

    const resp = await models.Horario.create({
      dia: horario.dia,
      hEntrada: horario.hEntrada,
      hSalida: horario.hSalida
    });

    return resp;

  } catch (err) {
    throw err;
  }
}


insertTfno = async (datos) => {
  try {

    const tfno = await models.Telefono.create({
      numero: datos.numero,
      extension: datos.extension
    });

    return tfno;

  } catch (err) {
    throw err;
  }
}


insertIntegranteJunta = async (datos) => {
  try {

    const intJunta = await models.IntegranteJunta.create({ id: null, nombre: datos.nombre });
    datos.id = intJunta.id;
    const cargoInt = await models.CargoIntegrante.create({ idCargo: datos.idCargo, idIntegrante: datos.id });
    const cargo = await models.CargoJunta.findByPk(cargoInt.idCargo, { attributes: ['nombre'] });

    return {
      cargo: cargo.nombre,
      id: intJunta.id,
      idCargo: cargoInt.idCargo,
      nombre: intJunta.nombre
    }

  } catch (err) {
    await models.IntegranteJunta.destroy({ where: { id: datos.id } });

    throw err;
  }
}


updateHistoria = async (historia) => {
  try {

    const [resp, created] = await models.Contenido.findOrCreate({
      where: { id: historia.id },
      defaults: {
        id: null,
        nombre: historia.nombre,
        valor: historia.valor
      }
    });
    
    if (!created) await resp.update({ valor: historia.valor });

    return resp;

  } catch (err) {
    throw err;
  }
}


updateIntegranteJunta = async (datos) => {
  try {

    const intJunta = await models.IntegranteJunta.findByPk(datos.id);
    const cargoInt = await models.CargoIntegrante.findOne({ where: { idIntegrante: datos.id } });
    const cargo = await models.CargoJunta.findByPk(datos.idCargo, { attributes: ['nombre'] });
    
    if (intJunta && cargoInt) {
      await Promise.all([intJunta.update({ nombre: datos.nombre }), cargoInt.update({ idCargo: datos.idCargo })]);

      return {
        cargo: cargo.nombre,
        id: intJunta.id,
        idCargo: cargoInt.idCargo,
        nombre: intJunta.nombre
      };
 
    } else return null;

  } catch (err) {
    throw err;
  }
}


updateDireccion = async (direccion) => {
  try {

    const dir = await models.Direccion.findByPk(direccion.id);
    const resp = await dir.update({
      lugar: direccion.lugar,
      calle: direccion.calle,
      numero: direccion.numero,
      provincia: direccion.provincia,
      ciudad: direccion.ciudad,
      cp: direccion.cp
    });

    return resp;

  } catch (err) {
    throw err;
  }
}


updateTfno = async (datos) => {
  try {

    const tfno = await models.Telefono.findByPk(datos.id);

    if (tfno) {
      
      return await tfno.update({
        numero: datos.numero,
        extension: datos.extension
      });

    } else return null;

  } catch (err) {
    throw err;
  }
}


updateHorario = async (horario) => {
  try {

    const h = await models.Horario.findByPk(horario.id);
    const resp = await h.update({
      hEntrada: horario.hEntrada,
      hSalida: horario.hSalida
    });

    return resp;

  } catch (err) {
    throw err;
  }
}


insertOrUpdateMemoria = async (memoria) => {
  try {

    const [mem, creada] = await models.Memoria.findOrCreate({
      where: { id: memoria.id },
      defaults: {
        id: null,
        anio: memoria.anio,
        imagen: memoria.imagen,
        documento: memoria.documento
      }
    });

    const resp = creada
      ? mem
      : await mem.update({
        anio: memoria.anio,
        imagen: memoria.imagen ? memoria.imagen : null,
        documento: memoria.documento ? memoria.documento : null,
      });

    return resp;

  } catch (err) {
    throw err;
  }
}


deleteHorario = async (id) => {
  try {

    return await models.Horario.destroy({ where: { id: id } });

  } catch (err) {
    throw err;
  }
}


deleteMemoria = async (id) => {
  try {
    return await models.Memoria.destroy({ where: { id: id } });

  } catch (err) {
    throw err;
  }
}


deleteImgMemoria = async (id) => {
  try {

    const mem = await models.Memoria.findByPk(id);
    const resp = await mem.update({ imagen: null });

    return resp;

  } catch (err) {
    throw err;
  }
}


deleteTfno = async (id) => {
  try {

    return await models.Telefono.destroy({ where: { id: id } });

  } catch (err) {
    throw err;
  }
}


deleteIntegranteJunta = async (id) => {
  try {

    const integrante = await models.IntegranteJunta.destroy({ where: { id: id } });

    if (integrante == 1) {
      const cargoInt = await models.CargoIntegrante.destroy({ where: { idIntegrante: id } });

      if (cargoInt == 0) {
        await models.IntegranteJunta.restore({ where: { id: id } });
        return 0;
      }
    }

    return integrante;

  } catch (err) {
    throw err;
  }
}


module.exports = {
  getHistoria,
  getHorarios,
  getTelefonos,
  getDirecciones,
  getCargosJunta,
  getCargoIntegrantes,
  getMemoria,
  getMemorias,
  insertHorario,
  insertTfno,
  insertIntegranteJunta,
  updateHistoria,
  updateIntegranteJunta,
  updateDireccion,
  updateTfno,
  updateHorario,
  insertOrUpdateMemoria,
  deleteHorario,
  deleteMemoria,
  deleteImgMemoria,
  deleteTfno,
  deleteIntegranteJunta
};