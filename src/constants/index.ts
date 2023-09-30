import httpStatus from 'http-status';

export const Errors = {
	'DuplicatedEmailError' : httpStatus.CONFLICT,
	'UnauthorizedError': httpStatus.UNAUTHORIZED,
	'NotFoundError' : httpStatus.NOT_FOUND,
	'ForbiddenError' : httpStatus.FORBIDDEN,
	'BadRequestError' : httpStatus.BAD_REQUEST
};