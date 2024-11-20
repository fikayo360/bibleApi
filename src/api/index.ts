import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import sequelizee from "../config/db/orm/sequelizeOrm";
import authRoute from '../api/entities/auth/authRoute'
import { User,Quiz,Chapters,BriefSum } from "../config/db/schema";
import ErrorHandler from "./middlewares/errorHandler";
dotenv.config();

sequelizee
  .authenticate()
  .then(() => {
    console.log('Connection successful!')
    console.log({ User,Quiz,Chapters,BriefSum});
  })
  .catch((error) => {
    console.log('Connection failed:', error)
})

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/v1/auth',authRoute)
app.use(ErrorHandler)


app.get('/ping',(req:Request,res:Response) =>{ 
  res.status(200).json('pong')
})


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});