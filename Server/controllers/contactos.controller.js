const { Pool } = require('pg');

const conexion = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '6njh35',
    port: 5432,
    database: 'reactEvaluacion',

})

const ContactoCtrl = {

    listAll: async (req, res) => {
        const respuesta = await conexion.query('Select * from contactos');
        res.status(200).json(respuesta.rows);
    },
    create: async(req,res) =>{
        const {nombre,apellido,telefono} = req.body;
        const respuesta = await conexion.query('Insert into contactos \
        (nombre,apellido,telefono) values ($1,$2,$3)',[nombre,apellido,telefono])
        res.status(201).send('Contacto Creado');
    },
    getOne: async (req,res) => {
        const id = req.params.id;
        const respuesta = await conexion.query('Select * from contactos where id = $1',[id])
        res.status(200).json(respuesta.rows);
    },
    update: async (req,res) => {
        const id = req.params.id;
        const {nombre,apellido,telefono} = req.body;
        const respuesta = await conexion.query('Update contactos set nombre =$1, apellido=$2 where id = $3',[nombre,apellido,id])
        res.status(201).send('Contacto actualizado exitosamente');
    },
    delete: async (req,res) => {
        const id = req.params.id;
        const respuesta = await conexion.query('Delete from contactos where id = $1',[id])
        console.log(respuesta)
        res.status(204).send('Contacto eliminado exitosamente');
    },

    
}


module.exports = ContactoCtrl;