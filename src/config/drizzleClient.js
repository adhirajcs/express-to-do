const { drizzle } = require("drizzle-orm/postgres-js");
const dotenv = require('dotenv');
const { todosTable } = require("../db/todoSchema");
const { usersTable } = require("../db/userSchema");

// Load environment variables from .env
dotenv.config();

// Define schema with imported tables
const schema = { usersTable, todosTable };

// Ensure DATABASE_URL is not undefined
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined in the environment variables");
}

// Initialize Drizzle client with schema and the Supabase connection URL
const db = drizzle(databaseUrl, { schema });

// Export the db instance and schema to be used in the app
module.exports = { db, schema };
