const clienteService = require('../services/clienteService');
const errorList = require('../errors');

function handleError(res, type='Unknown') {
    const err = errorList[type] || errorList.Unknown;
    return res.status(err.status).json({code: err.code, message: err.message});
}

class ClienteController {
    async getClientes(req, res){
        try {
            const clientes = await clienteService.getClientes();
            res.json(clientes);
        }catch (error) {
            console.error(error);
            handleError(res, 'DatabaseError');
        }
    }

    async getClienteByDni(req, res){
        const { dni } = req.params;

        try{
            const cliente = await clienteService.getClienteByDni(dni);

            if(!cliente){
                return handleError(res, 'NotFound')
            }
            res.json(cliente);
        }catch(error){
            console.error(error);
            handleError(res, 'DatabaseError');
        }
    }

    async createCliente(req, res) {
        try{
            const {dni, nombre, apellido_paterno, apellido_materno, fecha_nacimiento} = req.body;
            const newCliente = await clienteService.addCliente({dni, nombre, apellido_paterno, apellido_materno, fecha_nacimiento});
            res.status(201).json(newCliente);
        }catch (error){
            console.error(error);
            handleError(res, 'Validation');
        }
    }

    async updateCliente(req, res) {
        try{
            const { dni } = req.params;
            const {nombre, apellido_paterno, apellido_materno, fecha_nacimiento} = req.body;
            const updatedCliente = await clienteService.modifyCliente(dni, {nombre, apellido_paterno, apellido_materno, fecha_nacimiento});
            res.json(updatedCliente);
        }catch (error) {
            console.error(error);
            handleError(res, 'DatabaseError');
        }
    }

    async deleteCliente(req, res) {
        try {
            const { dni } = req.params;
            await clienteService.removeCliente(dni);
            res.sendStatus(204);
        }catch (error) {
            console.error(error);
            handleError(res, 'DatabaseError');
        }

    }

    async getPurchasedProducts(req, res){
        try{
            const { dni } = req.params;
            const purchasedProducts = await clienteService.listPurchasedProducts(dni);
            console.log(purchasedProducts);
            res.json(purchasedProducts);

        }catch(error){
            console.error(error);
            handleError(res, 'DatabaseError');
        }
        
    }
}

module.exports = new ClienteController();