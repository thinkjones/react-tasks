import "reflect-metadata"
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import { rootHandler } from '@/handlers/root';
import { AppDataSource } from '@/boundaries/data-source';
import { tasksGetHandler, tasksPostHandler } from '@/handlers/tasks';

const start = async () => {
    // Setup config
    await dotenv.config();
    console.log(`start: db url: ${process.env.DB_HOST_URI}`)

    // Setup handlers
    const app = express();
    app.use(cors())
    app.use(express.json());

    const port = process.env.PORT;
    app.get('/', rootHandler);
    app.get('/tasks', tasksGetHandler);
    app.post('/tasks/:taskId', tasksPostHandler);
    app.post('/tasks', tasksPostHandler);

    // Setup database
    await AppDataSource.getInstance()

    // Setup API URL
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
}

start()
