import dotenv from 'dotenv';

dotenv.config();

export default {
  app: {
    clientURL: process.env.CLIENT_URL,
    baseURL: process.env.BASE_URL,
    sessionSecret: process.env.SESSION_SECRET
  },
  db: {
    host: process.env.DB_HOST,
    name: process.env.DB_NAME
  },
  redis: {
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT,
		password: process.env.REDIS_PASSWORD
	}
}