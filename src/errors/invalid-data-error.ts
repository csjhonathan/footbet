import httpStatus from 'http-status';
import { ApplicationError } from '../protocols';

export function invalidDataError(details: string[]): ApplicationInvalidateDataError {
	return {
		name: 'InvalidDataError',
		message: 'Invalid data',
		details,
		status:httpStatus.UNPROCESSABLE_ENTITY
	};
}

type ApplicationInvalidateDataError = ApplicationError & {
  details: string[];
};