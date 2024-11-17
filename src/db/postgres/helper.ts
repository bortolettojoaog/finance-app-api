import pg from 'pg';

const { Pool } = pg;

const pool: pg.Pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
});

/* eslint-disable @typescript-eslint/no-explicit-any */
export const PostgresHelper = {
    query: async (query: string, params: any[]): Promise<any[]> => {
        const client: pg.PoolClient = await pool.connect();

        const results = await client.query(query, params);

        client.release();

        return results.rows;
    },
};
