//Load dotenv here too because populatedb.js is run SEPARATELY from app.js
//So it needs its own dotenv load
require("dotenv").config();

const {Client}=require("pg")
const SQL=`
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS categories;

CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR (100) NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    origin VARCHAR(100),
    category_id INTEGER REFERENCES categories(id)
);

INSERT INTO categories (name,description)
VALUES
    ('Green Tea', 'Unoxidized leaves, fresh and grassy flavors.'),
    ('Black Tea', 'Fully oxidized leaves, bold and robust.'),
    ('Oolong Tea', 'Partially oxidized, complex and floral.'),
    ('Herbal Infusion', 'Caffeine-free blends of herbs, fruits, and flowers.');

INSERT INTO items (name,description,price,stock,origin,category_id)
VALUES
    ('Sencha', 'Traditional Japanese steamed green tea.', 15.99, 50, 'Japan', 1),
    ('Matcha', 'Ceremonial grade stone-ground powder.', 29.99, 20, 'Japan', 1),
    ('Dragon Well', 'Famous pan-fired Chinese green tea.', 22.50, 15, 'China', 1),
    
    ('Earl Grey', 'Black tea flavored with bergamot oil.', 12.00, 100, 'India', 2),
    ('Assam Bold', 'Strong, malty breakfast tea.', 10.50, 80, 'India', 2),
    ('Lapsang Souchong', 'Distinctive smoky pine-fired tea.', 18.00, 10, 'China', 2),
    
    ('Tie Guan Yin', 'Premium "Iron Goddess of Mercy" oolong.', 25.00, 12, 'China', 3),
    ('Milk Oolong', 'Creamy, buttery texture and sweet aroma.', 28.00, 8, 'Taiwan', 3),
    
    ('Chamomile Dreams', 'Calming dried chamomile flowers.', 9.00, 60, 'Egypt', 4),
    ('Peppermint Blast', 'Refreshing and cool pure peppermint.', 8.50, 45, 'USA', 4);
`;



async function main(){
    console.log("seeding...");
    const client =new Client({
        connectionString:process.env.DATABASE_URL,
    })
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done")
}
main();