const { response, request } = require('express');
const queriesUsers = require('../database/queries/queriesUsers');
const userHelper = require('../helpers/validators/usuario-validators');

const updateUser = (req, res = response) => {

    try {

        const infoUser = {...req.body};
        delete infoUser.id;

        if (userHelper.dniValido(infoUser.dni) && userHelper.gSanguineoValido(infoUser.gSanguineo)) {

            console.log(req.body.id + ' => id');
            console.log(infoUser);
            const resp = queriesUsers.updateUser(req.body.id, infoUser);
    
            res.status(201).json({success: true, msg: 'actualizado con éxito'});
        }
        else {
            
            res.status(200).json({success: false, msg: 'se ha producido un error'});
        }

    }
    catch (err) {

        res.status(200).json({success: false, msg: 'se ha producido un error'});
    }
}

module.exports = {
    updateUser
}