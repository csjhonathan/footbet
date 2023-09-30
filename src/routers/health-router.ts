import { Request, Response, Router } from 'express';
import httpStatus from 'http-status';

const healthRouter = Router();

healthRouter.get('',(_req:Request, res:Response)=> res.send({message:'I\'m okay!', status:httpStatus.OK}) );

export { healthRouter };