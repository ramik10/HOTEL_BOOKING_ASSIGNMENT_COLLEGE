import express from 'express';
import dotenv from 'dotenv';
import pool from './db';
import hotelRoutes from './routes/hotels';
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT;

const corsOptions: cors.CorsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  };
  
  // app.use(limiter);
  app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/hotels', hotelRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
