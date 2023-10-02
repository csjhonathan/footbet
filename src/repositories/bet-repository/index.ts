import { PrismaClient } from '@prisma/client';
import { BetInput, BetResult } from '../../protocols';
import { prisma } from '../../config';

function create(data:BetInput){
	return prisma.$transaction([
		prisma.bet.create({data}),
		prisma.participant.update({
			where:{
				id: data.participantId,
			},
			data:{
				balance: {
					decrement: data.amountBet
				}
			}
		})
	]);
}

function update(id:number, result:BetResult, prispaTransaction:PrismaClient){
	return prispaTransaction.bet.update({
		where: { id },
		data: {...result}
	});
}

export const betRepository = {
	create,
	update
};