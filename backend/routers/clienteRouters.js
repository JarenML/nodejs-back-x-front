const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/', (req, res) => clienteController.getClientes(req, res));
router.get('/:dni', (req, res) => clienteController.getClienteByDni(req, res));
router.post('/', (req, res) => clienteController.createCliente(req, res));
router.put('/:dni', (req, res) => clienteController.updateCliente(req, res));
router.delete('/:dni', (req, res) => clienteController.deleteCliente(req, res));
router.get('/purchasedProducts/:dni', (req, res) => clienteController.getPurchasedProducts(req, res));

module.exports = router;