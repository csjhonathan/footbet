/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Errors } from '../constants';
import { ApplicationError, GenericError } from '../protocols';
import 'dotenv/config';

export function handleApplicationErrors(
	err: ApplicationError | Error | GenericError,
	_req: Request,
	res: Response,
	_next: NextFunction,
) {
	// para ficar mais fácil de debugar erros

	if(process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development')
		console.log({
			message: err.message ?? 'internal Server Error!',
			status: Errors[err.name] ?? httpStatus.INTERNAL_SERVER_ERROR
		});

	res
		.status(Errors[err.name] ?? httpStatus.INTERNAL_SERVER_ERROR)
		.send({
			message:err.message ?? 'internal Server Error!',
			status:Errors[err.name] ?? httpStatus.INTERNAL_SERVER_ERROR
		});
}