import { sql } from "./db.js";

sql`
CREATE TABLE item (
    id UUID PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Model VARCHAR(100),
    Date DATE DEFAULT CURRENT_DATE,
    Category VARCHAR(100)
);
`
.then(() => {
    console.log('Table created successfully!');
})
