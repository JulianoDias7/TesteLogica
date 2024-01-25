const express = require('express');
const {Pool} = require('pg');
const cors = require('cors');
const app = express();
const port = 5000;
require('dotenv').config();



const pool = new Pool({
    connectionString: process.env.DBConfigLink,
    idleTimeoutMillis: 30000,
    ssl: {
        rejectUnauthorized: false
    }
});

// Middleware para permitir o uso do req.body **NÂO REMOVER O CORS**
app.use(express.json());
app.use(cors())


// Rota para listar todos os clientes
app.get('/clientes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM clientes');//Cnsulta no PG
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao listar clientes:', error);
        res
            .status(500)
            .json({error: 'Erro interno do servidor'});
    }
});

// Rota para filtrar clientes com base no nome, partindo dos clientes já carregados
app.get('/clientes/filtrar/:filtro', async (req, res) => {
    const filtro = req.params.filtro;
    try {
        const result = await pool.query(
            'SELECT * FROM clientes WHERE nome ILIKE $1',
            [`%${filtro}%`]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao filtrar clientes:', error);
        res
            .status(500)
            .json({error: 'Erro interno do servidor'});
    }
});

// Post para cadastro de novos clientes
app.post('/clientes', async (req, res) => {
    const {nome, email, telefone, coordenada_x, coordenada_y} = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO clientes (nome, email, telefone, coordenada_x, coordenada_y) VALUE' +
                    'S ($1, $2, $3, $4, $5) RETURNING *',
            [nome, email, telefone, coordenada_x, coordenada_y]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
        res
            .status(500)
            .json({error: 'Erro interno do servidor'});
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});