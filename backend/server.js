import {fastify} from 'fastify';

import { Database } from './database.js';

const server = fastify();   

const database = new Database();

server.get('/', () => {
    
});

server.get('/home', () => {

});

server.post('/estoque', async (req, reply) => {
    const { nome_item, modelo, categoria, quantidade } = req.body;

    await database.create({
        nome_item,
        modelo,
        categoria,
        quantidade
    });

    return reply.status(201).send();
});

server.get('/estoque', async (req) => {
    const search = req.query.search;
    return await database.list(search);
});

server.put('/estoque/:id', async (req, reply) => {
    const id = req.params.id;
    const { nome_item, modelo, categoria, quantidade } = req.body;

    await database.update(id, {
        nome_item,
        modelo,
        categoria,
        quantidade
    });

    return reply.status(204).send();
});

server.patch('/estoque/:id/quantidade', async (req, reply) => {
    const id = req.params.id;
    const { quantidade } = req.body;

    await database.updateQuantidade(id, quantidade);

    return reply.status(204).send();
});

server.delete('/estoque/:id', async (req, reply) => {
    const itemid = req.params.id;

    await database.delete(itemid);

    return reply.status(204).send();
});

server.post('/usuarios', async (req, reply) => {
    const { cnpj, nome, email, senha } = req.body;

    await database.createUsuario({
        cnpj,
        nome,
        email,
        senha
    });

    return reply.status(201).send();
});

server.get('/usuarios', async () => {
    const usuarios = await database.listUsuarios();
    return usuarios;
});

server.put('/usuarios/:id', async (req, reply) => {
    const usuarioId = req.params.id;
    const { cnpj, nome, email, senha } = req.body;

    await database.updateUsuario(usuarioId, {
        cnpj,
        nome,
        email,
        senha
    });

    return reply.status(204).send();
});

server.delete('/usuarios/:id', async (req, reply) => {
    const usuarioId = req.params.id;
    await database.deleteUsuario(usuarioId);
    return reply.status(204).send();
});


server.get('/financeiro', () => {

});

server.listen({port: 3333,})