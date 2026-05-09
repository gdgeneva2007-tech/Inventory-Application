# Environment variables

keeps secretes out of your code
Node.js has a built-in object called process.env. It holds environment variables - key/value pairs available to your program.

// You can read any environment variable like this:
console.log(process.env.HOME); // /home/yourname
console.log(process.env.PATH); // /usr/bin:/bin:...

// You can set your OWN variables too:
// process.env.MY_SECRET = "hello" ← but this only lasts during runtime

.env file - this is NOT JavaScript, no quotes needed usually

DATABASE_URL=postgresql://geneva:0317@localhost:5432/top_users
PORT=3000
SECRET_KEY=mysecretkey123

# How do developers handle database setup?

Option 1: They copy the db folder from previous project ,change the database name in .env, and start fresh with new queries

Option 2: Create a starter template

my-express-starter/
├── db/
│ └── pool.js
├── routes/
│ └── index.js
├── views/
│ └── partials/
├── app.js
├── .env.example
└── .gitignore

When starting a new project:
Just copy this folder and start adding features

Option 3: Use framework CLI tools

# What a typical day looks like when working on a Node + PostgreSQL project:

1. cd my-project
2. sudo service postgresql start (on linux)
3. npm run dev (start your dev server)
4. Open browser to localhost:3000
5. Open your code editor
   Now you are ready to work

# When you need a new feature:

Step 1: Think about the SQL first
─────────────────────────────────
What SQL do I need?
DELETE FROM usernames WHERE id = $1
Test it in pgAdmin or psql first to make sure it works

Step 2: Add the query function in queries.js
─────────────────────────────────────────────
async function deleteUsername(id) {
await pool.query("DELETE FROM usernames WHERE id = $1", [id]);
}

Step 3: Add the route
─────────────────────
router.post("/delete/:id", async (req, res) => {
await db.deleteUsername(req.params.id);
res.redirect("/");
});

Step 4: Update the view
───────────────────────
Add a delete button next to each username

Step 5: Test in browser
───────────────────────
Click delete → check if it works

Layers:
Browser (what user sees)
↕ HTTP requests/responses
Routes (traffic controller)
↕ calls functions
queries.js (speaks to database)
↕ SQL queries
PostgreSQL (stores data)

1. First: what SQL do I need? (bottom layer)
2. Then: add it to queries.js
3. Then: add a route that calls it
4. Then: update the view (top layer)

# SQL you should know by heart (use constantly)

SELECT \* FROM tablename;

SELECT \* FROM tablename WHERE column =$1;

INSERT INTO tablename (col1,col2) VALUES ($1,$2);

UPDATE tablename SET column=$1 WHERE id=$2;

DELETE FROM tablename WHERE id=$1;

# Run both in separate terminals:

Terminal 1: runs your express server
npm run dev

Terminal 2: watches for tailwind class changes
npm run watch:css
