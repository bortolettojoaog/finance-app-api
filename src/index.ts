import 'dotenv/config.js';
// @ts-expect-error Express type declarations are unavailable in this environment.
import express from 'express';

const app = express();

app.use(express.json());

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
