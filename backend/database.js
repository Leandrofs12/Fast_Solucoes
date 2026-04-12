import { sql } from "./db.js";
import { randomUUID } from 'node:crypto';

export class Database {

    async list(search) {
        let items

        if (search) {
            items = await sql`SELECT * FROM item WHERE Name ILIKE ${'%' + search + '%'}`;
        } else {
            items = await sql`SELECT * FROM item`;

        }

        return items;
    }

  async create(item) {
       const itemid = randomUUID();

       await sql`INSERT INTO item (id, Name, Model, Date, Category) VALUES (${itemid}, ${item.Name}, ${item.Model}, ${item.Date}, ${item.Category})`;
    }

    async update(id, item) {
        await sql`UPDATE item SET Name = ${item.Name}, Model = ${item.Model}, Date = ${item.Date}, Category = ${item.Category} WHERE id = ${id}`;
    }

    async delete(id) {
        await sql`DELETE FROM item WHERE id = ${id}`;
    }   
}