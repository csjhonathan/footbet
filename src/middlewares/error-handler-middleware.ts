import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ApplicationError, GenericError } from '@/protocols';
import { Errors } from '../constants';

export function handleApplicationErrors(
	err: ApplicationError | Error | GenericError,
	_req: Request,
	res: Response,
	_next: NextFunction,
) {
	// para ficar mais fácil de debugar erros
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