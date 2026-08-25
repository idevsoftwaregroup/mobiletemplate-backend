import express from 'express';
import usersRouter from './Routes/users.route.js';

const app = express();
app.use(express.json());
app.use('/api', usersRouter);

export default app;
