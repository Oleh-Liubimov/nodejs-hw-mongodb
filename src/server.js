import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { env } from './utils/env.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import router from './routers/contacts.js';

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


    app.get('/', (req,res) => {
        res.json({
            message: 'Hello wold!'
        });
    });

    app.use(router);

    app.use('*', notFoundHandler);

    app.use(errorHandler);

    app.listen(PORT, () => {
    console.log(`Sever is running on port ${PORT}`);
  });
}
