import { sql } from "./db.js";

sql`
CREATE TABLE tb_usuario (
    id_usuario UUID PRIMARY KEY,
    cnpj VARCHAR(14) NOT NULL,
    nome VARCHAR(50) NOT NULL,
    data_registro DATE NOT NULL DEFAULT CURRENT_DATE,
    email VARCHAR(50) NOT NULL,
    senha VARCHAR(255) NOT NULL
);
`
.then(() => {
    console.log('Tabela tb_usuario criada com sucesso!');
});