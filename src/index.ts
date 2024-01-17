import express from "express";
import cors from "cors";
import initialDB from "./db/initialDb";
import { authRouter } from "./routes/users";
import { cardRouter } from "./routes/cards";

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());
// app.use('/api')
app.use("/api/authJayMoji", authRouter);
app.use("/api/cardMoji", cardRouter);

initialDB();

const PORT = 3001
app.listen(PORT, () => console.log('Server is running on port: ' + PORT))