import { Router } from 'express';
import { createBet } from '../controllers';
import { validateBody } from '../middlewares';
import { inputBetSchema } from '../schemas';

const betRouter = Router();

betRouter.post('', validateBody(inputBetSchema), createBet);

export { betRouter };