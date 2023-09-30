export function amountWonCalculator(amountBet:number, allWinnerBetsAmount:number, allBetsAmount:number){
	const HOUSE_TAX = 0.3;
	return (amountBet/allWinnerBetsAmount) * (allBetsAmount) * (1-HOUSE_TAX);
}