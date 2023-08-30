const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

// Configuracion la conexión a la base de datos
require('dotenv').config();
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//crear
app.post('/usuarios', async (req, res) => {
    try {
        const {
            name,
            lastname,
            birthday,
            profession,
            email,
            password
        } = req.body;
        const query = 'INSERT INTO usuarios (name, lastname, birthday, profession, email, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
        const values = [name, lastname, birthday, profession, email, password];
        const result = await pool.query(query, values);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al crear un usuario:', error);
        res.status(500).json({
            error: 'Ocurrió un error al crear el usuario.'
        });
    }
});

//actualizar
app.put('/usuarios/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const {
            name,
            lastname,
            birthday,
            profession,
            email,
            password
        } = req.body;
        const query = 'UPDATE usuarios SET name = $1, lastname = $2, birthday = $3, profession = $4, email = $5, password = $6 WHERE id = $7 RETURNING *';
        const values = [name, lastname, birthday, profession, email, password, userId];
        const result = await pool.query(query, values);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al actualizar un usuario:', error);
        res.status(500).json({
            error: 'Ocurrió un error al actualizar el usuario.'
        });
    }
});

//eliminar
app.delete('/usuarios/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const query = 'DELETE FROM usuarios WHERE id = $1';
        const result = await pool.query(query, [userId]);
        res.json({
            message: 'Usuario eliminado exitosamente.'
        });
    } catch (error) {
        console.error('Error al eliminar un usuario:', error);
        res.status(500).json({
            error: 'Ocurrió un error al eliminar el usuario.'
        });
    }
});

//seleccionar
app.get('/usuarios/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM usuarios');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({
            error: 'Ocurrió un error al obtener los usuarios.'
        });
    }
});


app.get('/pacientes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM pacientes');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener pacientes');
    }
});

app.get('/pacientes/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const result = await pool.query('SELECT * FROM pacientes WHERE id=$1', [id]);
        if (result.rowCount === 0) {
            res.status(404).send('Paciente no encontrado');
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener paciente');
    }
});

app.post('/pacientes', async (req, res) => {
    const {
        name_patients,
        lastname_patients,
        dni,
        cuil,
        afi,
        id_obra_social
    } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO pacientes (name_patients, lastname_patients, dni, cuil, afi, id_obra_social) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name_patients, lastname_patients, dni, cuil, afi, id_obra_social]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear paciente');
    }
});

app.put('/pacientes/:id', async (req, res) => {
    const id = req.params.id;
    const {
        name_patients,
        lastname_patients,
        dni,
        cuil,
        afi,
        id_obra_social
    } = req.body;
    try {
        const result = await pool.query(
            'UPDATE pacientes SET name_patients=$1, lastname_patients=$2, dni=$3, cuil=$4, afi=$5, id_obra_social=$6 WHERE id=$7 RETURNING *',
            [name_patients, lastname_patients, dni, cuil, afi, id_obra_social, id]
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar paciente');
    }
});

app.delete('/pacientes/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query('DELETE FROM pacientes WHERE id=$1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            res.status(404).send('Paciente no encontrado');
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar paciente');
    }
});

app.post('/obra_social', async (req, res) => {

    try {
        const {
            cuil,
            denomination,
            social_work,
            province,
            location,
            postal_code,
            address,
            phone,
            email,
            web,
            otro
        } = req.body;
        const query = 'INSERT INTO obra_social (cuil, denomination, social_work, province, location, postal_code, address, phone, email, web, otro) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *';
        const values = [cuil, denomination, social_work, province, location, postal_code, address, phone, email, web, otro];
        console.log(query);
        console.log(values);
        const result = await pool.query(query, values);
        res.json(result.rows[0]);
    } catch (error) {
        console.log('Error al crear una obra social:', error);
        res.status(500).json({
            error: 'Ocurrió un erro al crear la obra social.'
        });
    }
})

app.put('/obra_social/:id', async (req, res) => {
    try {
        const obraSocialId = req.params.id;
        const {
            cuil,
            denomination,
            social_work,
            province,
            location,
            postal_code,
            address,
            phone,
            email,
            web,
            otro
        } = req.body;
        const query = 'UPDATE obra_social SET cuil = $1, denomination = $2, social_work = $3, province = $4, location = $5, postal_code = $6, address = $7, phone = $8, email = $9, web = $10, otro = $11 WHERE id = $12 RETURNING *';
        const values = [cuil, denomination, social_work, province, location, postal_code, address, phone, email, web, otro, obraSocialId];
        const result = await pool.query(query, values);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al actualizar un obra_social:', error);
        res.status(500).json({
            error: 'Ocurrió un error al actualizar el obra_social.'
        });
    }
});

app.delete('/obra_social/:id', async (req, res) => {
    try {
        const obraSocialId = req.params.id;
        const query = 'DELETE FROM obra_social WHERE id = $1';
        await pool.query(query, [obraSocialId]);
        res.json({
            message: 'Obra social eliminado exitosamente.'
        });
    } catch (error) {
        console.error('Error al eliminar un Obra social:', error);
        res.status(500).json({
            error: 'Ocurrió un error al eliminar el Obra social.'
        });
    }
});

app.get('/obra_social', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM obra_social');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener obra_social:', error);
        res.status(500).json({
            error: 'Ocurrió un error al obtener los obra_social.'
        });
    }
});

app.get('/obra_social/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const result = await pool.query('SELECT * FROM obra_social WHERE id=$1', [id]);
        if (result.rowCount === 0) {
            res.status(404).send('obra social no encontrado');
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener obra social');
    }
});

// Crear una factura
app.post('/facturas', async (req, res) => {
    try {
        const {
            fecha,
            numero_factura,
            monto,
            id_paciente,
            id_obra_social
        } = req.body;
        const query = 'INSERT INTO facturas (fecha, numero_factura, monto, id_paciente, id_obra_social) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [fecha, numero_factura, monto, id_paciente, id_obra_social];
        const result = await pool.query(query, values);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al crear una factura:', error);
        res.status(500).json({
            error: 'Ocurrió un error al crear la factura.'
        });
    }
});

// Actualizar una factura
app.put('/facturas/:id', async (req, res) => {
    try {
        const facturaId = req.params.id;
        const {
            fecha,
            numero_factura,
            monto,
            id_paciente,
            id_obra_social
        } = req.body;
        const query = 'UPDATE facturas SET fecha = $1, numero_factura = $2, monto = $3, id_paciente = $4, id_obra_social = $5 WHERE id = $6 RETURNING *';
        const values = [fecha, numero_factura, monto, id_paciente, id_obra_social, facturaId];
        const result = await pool.query(query, values);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al actualizar una factura:', error);
        res.status(500).json({
            error: 'Ocurrió un error al actualizar la factura.'
        });
    }
});

// Eliminar una factura
app.delete('/facturas/:id', async (req, res) => {
    try {
        const facturaId = req.params.id;
        const query = 'DELETE FROM facturas WHERE id = $1';
        await pool.query(query, [facturaId]);
        res.json({
            message: 'Factura eliminada exitosamente.'
        });
    } catch (error) {
        console.error('Error al eliminar una factura:', error);
        res.status(500).json({
            error: 'Ocurrió un error al eliminar la factura.'
        });
    }
});



app.get('/facturas', async (req, res) => {
    try {
        const query = `
            SELECT 
                f.*,
                p.name_patients AS nombre,
                p.lastname_patients AS apellido,
                os.social_work AS social_work_obra_social
            FROM 
                facturas f
            JOIN 
                pacientes p ON f.id_paciente = p.id
            JOIN 
                obra_social os ON p.id_obra_social = os.id
            WHERE f.pagada = false;
            
        `;

        const { rows } = await pool.query(query);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener facturas:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Buscar una factura por ID
app.get('/facturas/:id', async (req, res) => {
    try {
        const facturaId = req.params.id;
        const query = 'SELECT * FROM facturas WHERE id = $1';
        const result = await pool.query(query, [facturaId]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener una factura por ID:', error);
        res.status(500).json({
            error: 'Ocurrió un error al obtener la factura.'
        });
    }
});

// Obtener todas las facturas
app.get('/facturas', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM facturas');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener facturas:', error);
        res.status(500).json({
            error: 'Ocurrió un error al obtener las facturas.'
        });
    }
});

app.post('/facturas_pagas', async (req, res) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const billIds = req.body.billIds;

        for (let id of billIds) {
            // Insertar en facturas_pagas
            await client.query(`INSERT INTO facturas_pagas (id_factura, fecha_pago, monto_pagado) 
                                SELECT id, NOW(), monto FROM facturas WHERE id = $1`, [id]);

            // Actualizar el estado de la factura en la tabla facturas
            await client.query(`UPDATE facturas SET pagada = TRUE WHERE id = $1`, [id]);
        }

        await client.query('COMMIT');

        res.status(200).send('Facturas procesadas correctamente');
    } catch (e) {
        await client.query('ROLLBACK');
        res.status(500).send('Error procesando las facturas');
    } finally {
        client.release();
    }
});

// Obtener todas las facturas pagas
app.get('/facturas_pagas', async (req, res) => {
    const mes = req.query.mes; // Ejemplo: '05' para mayo
    const ano = req.query.ano; // Ejemplo: '2023'
    let query = `
        SELECT 
            fp.*,
            p.name_patients AS nombre,
            p.lastname_patients AS apellido,
            os.social_work AS obra_social
        FROM 
            facturas_pagas fp
        JOIN 
            facturas f ON fp.id_factura = f.id
        JOIN 
            pacientes p ON f.id_paciente = p.id
        JOIN 
            obra_social os ON p.id_obra_social = os.id
    `;

    const values = [];
    if (mes && ano) {
        query += ` WHERE EXTRACT(MONTH FROM fp.fecha_pago) = $1 AND EXTRACT(YEAR FROM fp.fecha_pago) = $2`;
        values.push(mes, ano);
    }

    try {
        const result = await pool.query(query, values);
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener facturas_pagas:', error);
        res.status(500).json({
            error: 'Ocurrió un error al obtener las facturas_pagas.'
        });
    }
});

// Actualizar una factura pagada
app.put('/facturas_pagas/:id', async (req, res) => {
    try {
        const facturaPagaId = req.params.id;
        const {
            id_factura,
            fecha_pago,
            monto_pagado
        } = req.body;
        const query = 'UPDATE facturas_pagas SET id_factura = $1, fecha_pago = $2, monto_pagado = $3 WHERE id = $4 RETURNING *';
        const values = [id_factura, fecha_pago, monto_pagado, facturaPagaId];
        const result = await pool.query(query, values);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al actualizar una factura pagada:', error);
        res.status(500).json({
            error: 'Ocurrió un error al actualizar la factura pagada.'
        });
    }
});

// Eliminar una factura pagada
app.delete('/facturas_pagas/:id', async (req, res) => {
    try {
        const facturaPagaId = req.params.id;
        const query = 'DELETE FROM facturas_pagas WHERE id = $1';
        await pool.query(query, [facturaPagaId]);
        res.json({
            message: 'Factura pagada eliminada exitosamente.'
        });
    } catch (error) {
        console.error('Error al eliminar una factura pagada:', error);
        res.status(500).json({
            error: 'Ocurrió un error al eliminar la factura pagada.'
        });
    }
});

app.listen(3002, () => {
    console.log('Servidor iniciado en el puerto 3002');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('¡Algo salió mal!');
});