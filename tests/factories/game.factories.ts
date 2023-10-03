import { faker } from '@faker-js/faker';
import { prisma } from '../../src/config';
import { GameInput, GameUpdate } from '../../src/protocols';
import { amountWonCalculator, betsResultsCalculator } from '../../src/helpers';
import { betFactories } from './bet.factories';
import { participantFactories } from './participant.factories';

type ManyGames = {
  many:number
}

class GameFactories {

	insertGameObject({valid}:{valid:boolean}): GameInput {
		return {
			awayTeamName: valid ? faker.company.name() : '',
			homeTeamName: valid ? faker.company.name() : '',
		};
	}

	insertGameScoreObject({valid}:{valid:boolean}) {
		return {
			awayTeamScore: valid ? faker.number.int({min:1, max:10}) : '',
			homeTeamScore: valid ? faker.number.int({min:1, max:10}) : '',
		};
	}


	// DB methods

	async updateGameInDb(id:number, data:GameUpdate){
		return await prisma.$transaction(async () => {
			const [game, bets] = await Promise.all([
				prisma.game.update({where:{id}, data:{...data, isFinished:true}}),
				prisma.bet.findMany({where:{gameId:id}}),
			]);

			const { allBetsAmount, allWinnerBetsAmount } = betsResultsCalculator(bets, data);

			for(const bet of bets){
				const won = (data.awayTeamScore === bet.awayTeamScore) && (data.homeTeamScore === bet.homeTeamScore);
				const amountWon = won ? amountWonCalculator(bet.amountBet, allWinnerBetsAmount, allBetsAmount) : 0;
				const status = won ? 'WON' : 'LOST';

				await Promise.all([
					betFactories.updateBetInDb(bet.id, {status, amountWon}, prisma),
					participantFactories.updateParticipantsInDb(bet.participantId, amountWon, prisma)
				]);
			}

			return game;
		});
	}

	async insertGameInDb({many}:ManyGames){
		if(many === 1){
			const data = this.insertGameObject({valid:true});
			return await prisma.game.create({data});
		}

		const data:GameInput[] = [];

		for(let i = 0 ; i < many; i++){
			data.push(this.insertGameObject({valid:true}));
		}

		return await prisma.game.createMany({data});
	}

	findManyGames(){
		return prisma.game.findMany();
	}

}


export const gameFactories = new GameFactories();