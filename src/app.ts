import 'express-async-errors';
import express, { Express } from 'express';
import cors from 'cors';
import { loadEnv, connectDb, disconnectDB } from './config';
import { betRouter, gameRouter, healthRouter, participantRouter } from './routers';
import { handleApplicationErrors } from './middlewares';

loadEnv();

const app = express();

app
	.use(cors())
	.use(express.json())
	.use('/health', healthRouter)
	.use('/participants', participantRouter)
	.use('/games', gameRouter)
	.use('/bets', betRouter)
	.use(handleApplicationErrors)
;


export function init(): Promise<Express> {
	connectDb();
	return Promise.resolve(app);
}

export async function close(): Promise<void> {
	await disconnectDB();
}

export default app;