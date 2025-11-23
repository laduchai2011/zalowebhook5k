import dotenv from 'dotenv';
import my_interface from '@src/interface';

dotenv.config();



const isProduct = process.env.NODE_ENV === 'production';


const redis_config: my_interface['redis']['config'] = isProduct ? {
    host: process.env.REDIS_SERVER_HOST,
    port: Number(process.env.REDIS_SERVER_PORT),
    username: process.env.REDIS_SERVER_USERNAME,
    password: process.env.REDIS_SERVER_PASSWORD,
} : {
    host: '127.0.0.1',
    port: 6379,
    username: '',
    password: '',
};

const rabbitmq_config: my_interface['rabbitmq']['config'] = isProduct ? {
    host: process.env.RABBITMQ_SERVER_HOST,
    port: Number(process.env.RABBITMQ_SERVER_PORT),
    username: process.env.RABBITMQ_SERVER_USERNAME,
    password: process.env.RABBITMQ_SERVER_PASSWORD,
} : {
    host: '127.0.0.1',
    port: 5672,
    username: 'laduchai',
    password: '201195',
};


export { redis_config, rabbitmq_config };
