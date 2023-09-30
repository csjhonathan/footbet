import { ParticipantInput } from '@/protocols';
import { prisma } from '@/config';

function create(data:ParticipantInput){
	return prisma.participant.create({data});
}

function findMany(){
	return prisma.participant.findMany();
}

function findOne(id:number){
	return prisma.participant.findUnique({where:{id}});
}

export const participantRepository = {
	create,
	findMany,
	findOne
};