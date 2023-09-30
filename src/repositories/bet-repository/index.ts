import { BetInput } from '@/protocols';
import { prisma } from '@/config';

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

export const betRepository = {
	create,
};