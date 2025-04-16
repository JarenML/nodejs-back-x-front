const clienteService = require('../services/clienteService');

class ClienteController {
    async getClientes(req, res){
        try {
            const clientes = await clienteService.getClientes();
            res.json(clientes);
        }catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener los clientes'});
        }
    }

    async getClienteByDni(req, res){
        const { dni } = req.params;

        try{
            const cliente = await clienteService.getClienteByDni(dni);

            if(!cliente){
                return res.status(404).json({ message: 'Cliente no encontrado'});
            }
            res.json(cliente);
        }catch(error){
            console.error(error);
            res.status(500).json({ message: 'Error al obtener el cliente'});
        }
    }

    async createCliente(req, res) {
        try{
            const {dni, nombre, apellido_paterno, apellido_materno, fecha_nacimiento} = req.body;
            const newCliente = await clienteService.addCliente({dni, nombre, apellido_paterno, apellido_materno, fecha_nacimiento});
            res.status(201).json(newCliente);
        }catch (error){
            console.error(error);
            res.status(500).json({message: 'Error al crear el cliente'});
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
            res.status(500).json({ message: 'Error al actualizar el cliente'});
        }
    }

    async deleteCliente(req, res) {
        try {
            const { dni } = req.params;
            await clienteService.removeCliente(dni);
            res.sendStatus(204);
        }catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al eliminar el cliente'});
        }

    }
}

module.exports = new ClienteController();