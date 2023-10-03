import { PrismaClient } from '@prisma/client';
import { BetResult } from '../../src/protocols';

class BetFactories {

	updateBetInDb(id:number, result:BetResult, prispaTransaction:PrismaClient){
		return prispaTransaction.bet.update({
			where: { id },
			data: {...result}
		});
	}
}

export const betFactories = new BetFactories();