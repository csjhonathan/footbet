import { GenericError } from '../protocols';

export function errorHandler({ message, name}: GenericError): GenericError{
	return {
		message, name
	};
}