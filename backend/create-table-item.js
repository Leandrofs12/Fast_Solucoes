import { sql } from "./db.js";

async function criarTabelas() {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS tb_item (
                id_item UUID PRIMARY KEY,
                nome_item VARCHAR(50) NOT NULL,
                modelo VARCHAR(50),
                data_inscricao DATE NOT NULL DEFAULT CURRENT_DATE,
                categoria VARCHAR(50)
            );
        `;
        console.log('Tabela tb_item criada com sucesso!');

        await sql`
            CREATE TABLE IF NOT EXISTS tb_estoque (
                id_estoque UUID PRIMARY KEY,
                id_item UUID NOT NULL REFERENCES tb_item(id_item) ON DELETE CASCADE,
                quantidade INT NOT NULL DEFAULT 0
            );
        `;
        console.log('Tabela tb_estoque criada com sucesso!');
        
    } catch (erro) {
        console.error('As Tabelas não foram criadas com sucesso', erro);
    } finally {
        process.exit(0);
    }
}

criarTabelas();