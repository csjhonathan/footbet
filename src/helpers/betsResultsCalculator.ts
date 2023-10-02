import { Bet } from '@prisma/client';
import { GameUpdate } from '../protocols';

export function betsResultsCalculator(bets:Bet[], data:GameUpdate){
	return bets.reduce(
		(totals, bet) => {
			const won = (data.awayTeamScore === bet.awayTeamScore ) && (data.homeTeamScore === bet.homeTeamScore);
			return {
				allBetsAmount: totals.allBetsAmount + bet.amountBet,
				allWinnerBetsAmount: totals.allWinnerBetsAmount + (won ? bet.amountBet : 0),
			};
		},
		{ allBetsAmount: 0, allWinnerBetsAmount: 0 }
	);

}