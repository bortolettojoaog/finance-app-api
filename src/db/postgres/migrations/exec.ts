import 'dotenv/config.js';

import fs from 'fs';
import path from 'path';
import { pool } from '../helper';

const execMigrations = async () => {
    const client = await pool.connect();

    try {
        const filePath = path.join(__dirname, '');

        const migrationFiles = fs
            .readdirSync(filePath)
            .filter((file) => file.endsWith('.sql'));

        for (const file of migrationFiles) {
            const script = fs.readFileSync(path.join(filePath, file), 'utf-8');

            await client.query(script);

            console.log(`Migration ${file} executed successfully!`);
        }
    } catch (error) {
        console.error('Error executing migrations:', error);
    } finally {
        client.release();
    }
};

execMigrations();
