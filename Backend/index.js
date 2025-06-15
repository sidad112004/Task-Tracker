import dotenv from 'dotenv';
import app from './app.js';
import prisma from './prismaClient.js';

dotenv.config({
  path: "./.env"
});

const port = process.env.PORT || 5000;

const check = async () => {
  try {
   
    await prisma.$connect();
    console.log(" Database is connected");

    app.listen(port, () => {
      console.log(" Server is running on the port:", port);
    });
  } catch (error) {
    console.error("Failed to connect to the database in index.js:", error);
    process.exit(1);
  }
};

check();
