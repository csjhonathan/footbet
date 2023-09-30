import { prisma } from '@/config';
import { GameInput, GameUpdate } from '@/protocols';
import { amountWonCalculator } from '../../helpers';

function create(data:GameInput){
	return prisma.game.create({data});
}

async function update(id:number, data:GameUpdate){
	await prisma.$transaction(async()=>{
		const [_, bets] = await Promise.all([
			prisma.game.update({where:{id}, data:{...data, isFinished:true}}),
			prisma.bet.findMany({where:{gameId:id}}),
		]);
		const allBetsAmount = bets.reduce((total, bet) => total + bet.amountBet, 0);
		const allWinnerBetsAmount = bets.reduce((total, bet) => {
			const won = (data.awayTeamScore === bet.awayTeamScore) && (data.homeTeamScore === bet.homeTeamScore);
			return total + (won ? bet.amountBet : 0);
		}, 0);

		for(const bet of bets){
			const won = (data.awayTeamScore === bet.awayTeamScore) && (data.homeTeamScore === bet.homeTeamScore);
			await Promise.all([
				prisma.bet.update({
					where:{id:bet.id},
					data:{
						status: won ? 'WON' : 'LOST',
						amountWon: won ? amountWonCalculator(bet.amountBet, allWinnerBetsAmount, allBetsAmount) : 0
					}
				}),
				prisma.participant.update({
					where:{id:bet.participantId},
					data:{
						balance : {
							increment: won ? amountWonCalculator(bet.amountBet, allWinnerBetsAmount, allBetsAmount) : 0
						}
					}
				})
			]);
		}
	});

	return prisma.game.findUnique({where:{id}});
}

function findMany(){
	return prisma.game.findMany();
}

function findOne(id:number){
	return prisma.game.findUnique({
		where:{id},
		include:{
			Bet:true
		}
	});
}

export const gameRepository = {
	create,
	update,
	findMany,
	findOne
};