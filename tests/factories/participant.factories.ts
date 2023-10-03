import { PrismaClient } from '@prisma/client';

class ParticipantFactories {

	updateParticipantsInDb(id:number, increment:number, prispaTransaction:PrismaClient){
		return prispaTransaction.participant.update({
			where: { id },
			data: {
				balance : {
					increment
				}
			}
		});
	}
}

export const participantFactories = new ParticipantFactories();