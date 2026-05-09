//Load dotenv here too because populatedb.js is run SEPARATELY from app.js
//So it needs its own dotenv load
require("dotenv").config();

const {Client}=require("pg")
const SQL=`
CREATE TABLE IF NOT EXISTS usernames (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR (255)
);

INSERT INTO usernames (username)
VALUES
    ('Bryan'),
    ('Odin'),
    ('Damon')
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