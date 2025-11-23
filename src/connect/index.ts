import dotenv from 'dotenv';
import REDIS_Server from './redis';
import { serviceRedlock } from './redlock';

dotenv.config();

const NODE_ENV = process.env.NODE_ENV;

const isProduct = NODE_ENV === 'production';


const redis_server = REDIS_Server.getInstance();

const shutdown = async (signal: string) => {
    try {
        console.log(`Received ${signal}. Closing Redis...`);
        await redis_server.close(); // hoặc disconnect() nếu dùng ioredis
        console.log('Redis closed. Exiting now.');
    } catch (err) {
        console.error('Error during shutdown:', err);
    } finally {
        process.exit(0);
    }
};

if (isProduct) {
    process.on('SIGTERM', () => shutdown('SIGTERM')); // khi docker stop
} else {
    process.on('SIGINT', () => shutdown('SIGINT')); // khi nhấn Ctrl+C
}

export { redis_server, serviceRedlock };
