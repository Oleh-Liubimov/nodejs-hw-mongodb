import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { env } from './utils/env';

const PORT = Number(env('PORT', '3000'));

export function startServer() {
  const app = express();

    app.use(express.json());
    app.use(cors());

    app.use(
        pino({
            transport: {
                target: 'pino-pretty'
            }
        })
    );

    

















    app.get('*', (req,res) => {
        res.status(404).json({
            message: 'Not found'
        });
    });

    app.listen(PORT, () => {
    console.log(`Sever is running on port ${PORT}`);
  });
}
