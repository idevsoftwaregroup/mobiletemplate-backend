import "dotenv/config";

import cors from "cors";
import app from "./app.js";

const PORT = 3000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.listen(PORT, () => {
  console.log(`Server Running on PORT : ${PORT}`);
});
