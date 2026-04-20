import { sql } from "./db.js";
import { randomUUID } from 'node:crypto';
import bcrypt from 'bcrypt';

export class Database {

    async list(search) {
        
        if (search) {
            return await sql`
                SELECT i.*, e.quantidade 
                FROM tb_item i
                LEFT JOIN tb_estoque e ON i.id_item = e.id_item
                WHERE i.nome_item ILIKE ${'%' + search + '%'}
            `;
        }
        
        return await sql`
            SELECT i.*, e.quantidade 
            FROM tb_item i
            LEFT JOIN tb_estoque e ON i.id_item = e.id_item
        `;
    }

    async create(item) {
        const idItem = randomUUID();
        const idEstoque = randomUUID();
        const { nome_item, modelo, categoria, quantidade } = item;

        await sql`
            INSERT INTO tb_item (id_item, nome_item, modelo, categoria)
            VALUES (${idItem}, ${nome_item}, ${modelo}, ${categoria})
        `;

        await sql`
            INSERT INTO tb_estoque (id_estoque, id_item, quantidade)
            VALUES (${idEstoque}, ${idItem}, ${quantidade || 0})
        `;
    }

    async update(id, item) {
        const { nome_item, modelo, categoria, quantidade } = item;

        await sql`
            UPDATE tb_item 
            SET nome_item = ${nome_item}, modelo = ${modelo}, categoria = ${categoria} 
            WHERE id_item = ${id}
        `;

        await sql`
            UPDATE tb_estoque 
            SET quantidade = ${quantidade} 
            WHERE id_item = ${id}
        `;
    }

    async updateQuantidade(id, quantidade) {
        await sql`
            UPDATE tb_estoque 
            SET quantidade = ${quantidade} 
            WHERE id_item = ${id}
        `;
    }

    async delete(id) {
        await sql`DELETE FROM tb_item WHERE id_item = ${id}`;
    }  

    //CRUD Tabela Usuário
    async createUsuario(usuario) {
        const id = randomUUID();
        const { cnpj, nome, email, senha } = usuario;

        const senhaCriptografada = await bcrypt.hash(senha, 10);
        
        await sql`
            INSERT INTO tb_usuario (id_usuario, cnpj, nome, email, senha)
            VALUES (${id}, ${cnpj}, ${nome}, ${email}, ${senhaCriptografada})
        `;
    }

    async listUsuarios() {
        return await sql`SELECT id_usuario, cnpj, nome, email, data_registro FROM tb_usuario`;
    }
    
    async updateUsuario(id, usuario) {
        const { cnpj, nome, email, senha } = usuario;
        
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        await sql`
            UPDATE tb_usuario 
            SET cnpj = ${cnpj}, nome = ${nome}, email = ${email}, senha = ${senhaCriptografada}
            WHERE id_usuario = ${id}
        `;
    }

    async deleteUsuario(id) {
        await sql`DELETE FROM tb_usuario WHERE id_usuario = ${id}`;
    }
}