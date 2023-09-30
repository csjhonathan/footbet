import { ApplicationError } from '@/protocols';
import httpStatus from 'http-status';

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