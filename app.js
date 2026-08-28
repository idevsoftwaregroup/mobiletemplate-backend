// import express from 'express';
// import usersRouter from './Routes/users.route.js';

// const app = express();
// app.use(express.json());
// app.use('/api', usersRouter);

// export default app;


import express from "express";

import usersRouter from "./Routes/users.route.js";
import authRouter from "./Routes/auth.route.js";


const app = express();


app.use(express.json());


app.use("/api/users", usersRouter);

app.use("/api/auth", authRouter);


export default app;
