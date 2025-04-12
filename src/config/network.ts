import { config } from 'dotenv';

config();
const network = {
  PORT: process.env.PORT,
  FRONTEND_URL: process.env.FRONTEND_URL,

  JWT_EXPIRATION: process.env.JWT_EXPIRATION,
  JWT_SECRET: process.env.JWT_SECRET,
  SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS) || 10,

  MONGO_URI: process.env.MONGO_URI,

  BASE_PATH: process.cwd(),
};

export default network;
