const db = require('../config/db')

class ProductModel{
    async getAllClientes(){
        const result = await db.query('SELECT * FROM cliente');
        return result.rows;
    }

    async getCliente(dni){
        const result = await db.query('SELECT * FROM cliente WHERE dni = $1', [dni]);
        return result.rows[0];
    }

    async createCliente({dni, nombre, apellido_paterno, apellido_materno, fecha_nacimiento}){
        const result = await db.query(
            'INSERT INTO cliente (dni, nombre, apellido_paterno, apellido_materno, fecha_nacimiento) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [dni, nombre, apellido_paterno, apellido_materno, fecha_nacimiento]
        );

        return result.rows[0];
    }

    async updateCliente(dni, {nombre, apellido_paterno, apellido_materno, fecha_nacimiento}){
        const result = await db.query(
            `UPDATE cliente SET nombre = $1, apellido_paterno = $2, 
            apellido_materno = $3, fecha_nacimiento = $4 WHERE dni = $5 RETURNING *`,
            [nombre, apellido_paterno, apellido_materno, fecha_nacimiento, dni]
        );

        return result.rows[0];
    }

    async deleteProduct(dni){
        await db.query(
            'DELETE FROM Cliente where dni = $1',
            [dni]
        );
    }

}

module.exports = new ProductModel();