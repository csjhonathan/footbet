import { Bet } from '@prisma/client';

export type ApplicationError = {
  name: string;
  message: string;
  status: number
};

export type GenericError = {
  message: string;
  name: 'BadRequestError' | 'NotFoundError';
}

export type ParticipantInput = {
	name: string;
	balance: number;
}

export type GameInput = {
	homeTeamName: string;
	awayTeamName: string;
}

export type GameUpdate = {
	homeTeamScore: number;
	awayTeamScore: number;
}

export type BetResult = {
  status : 'WON' | 'LOST';
  amountWon: number;
}

export type BetInput = Omit<Bet, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'amountWon'>