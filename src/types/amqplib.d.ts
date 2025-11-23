declare module "amqplib" {
    import { Connection } from "./amqp";
    export function connect(url: string): Promise<Connection>;
}