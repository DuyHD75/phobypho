import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import http from 'http';
import mongoose from 'mongoose';
import 'dotenv/config';
import routes from './src/routers/index.route.js'
import session from 'express-session';
import path from 'path';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';

const app = express();
const jsonPath = path.resolve('./api/swagger_output.json');
const swaggerFile = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const corsOptions = {
    origin: ['https://phobypho.vercel.app', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(session({
     resave: false,
     saveUninitialized: true,
     secret: process.env.SESSION_SECRET 
 }));

app.use("/api/v1", routes);

const port = process.env.PORT || 5000;

const server = http.createServer(app);

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Mongodb connected !");
        server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.log({ err });
        process.exit(1);
    });
