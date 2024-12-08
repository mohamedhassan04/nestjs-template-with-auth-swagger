import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

async function createDatabaseIfNotExists() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  });

  try {
    // Connect to PostgreSQL
    await client.connect();

    // Check if the database exists and create it if it doesn’t
    const databaseName = process.env.POSTGRES_DATABASE;
    const result = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [databaseName],
    );

    if (result.rowCount === 0) {
      await client.query(`CREATE DATABASE "${databaseName}"`);
      console.log(`Database "${databaseName}" created successfully`);
    } else {
    }
  } finally {
    await client.end();
  }
}

export { createDatabaseIfNotExists };
