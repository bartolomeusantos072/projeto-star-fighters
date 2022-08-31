import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const connection = new Pool({
  connectionString: process.env.DATABASEURI,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default connection;