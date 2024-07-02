import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import http from 'http';
import mongoose from 'mongoose';
import 'dotenv/config';
import routes from './src/routers/index.route.js'


const app = express();
const corsOptions = {
     origin: process.env.CLIENT_URL, 
     credentials: true,
     optionsSuccessStatus: 200,
     allowedHeaders: ['Content-Type', 'Authorization'], 
     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] 
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1", routes);



const port = process.env.PORT || 5000;

const server = http.createServer(app);

mongoose.connect(process.env.MONGODB_URL)
     .then(() => {
          console.log("Mongodb connected !");
          server.listen(port, () => {
               console.log(`Server is running on port ${port}`);
          })
     })
     .catch((err) => {
          console.log({ err });
          process.exit(1)
     });
