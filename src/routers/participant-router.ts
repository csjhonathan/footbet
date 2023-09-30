import {  Router } from 'express';
import { createParticipant, findManyParticipants } from '../controllers';
import { inputParticipantSchema } from '../schemas';
import { validateBody } from '../middlewares';

const participantRouter = Router();

participantRouter.post('', validateBody(inputParticipantSchema), createParticipant );
participantRouter.get('', findManyParticipants);

export { participantRouter };