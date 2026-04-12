import {fastify} from 'fastify';

import { Database } from './database.js';

const server = fastify();   

const database = new Database();

server.get('/', () => {
    
});

server.get('/home', () => {

});

server.post('/estoque', async (req, reply) => {

    const { Name, Model, Date, Category } = req.body;

    await database.create({
        Name,
        Model,
        Date,
        Category
    });

    return reply.status(201).send();

});

server.get('/estoque', async (req, reply) => {
    const search = req.query.search
    
    const items = await database.list(search);

    return items;
});

server.put('/estoque/:id', async (req, reply) => {
    const itemid = req.params.id;

    await database.update(itemid, {
        Name: req.body.Name,
        Model: req.body.Model,
        Date: req.body.Date,
        Category: req.body.Category
    });

    return reply.status(204).send();
});

server.delete('/estoque/:id', async (req, reply) => {
    const itemid = req.params.id;

    await database.delete(itemid);

    return reply.status(204).send();
});

server.get('/financeiro', () => {

});

server.listen({port: 3333,})