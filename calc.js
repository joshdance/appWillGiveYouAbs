document.addEventListener("DOMContentLoaded", function() {
    function doTheCalc() {	   
	   weightValue = weightInputBox2.value;
	   percentValue = percentInputBox2.value

	   LbsBfResults = (weightValue * (percentValue/100)); //lbs bf results
	   LbsBfResultsDiv.textContent = LbsBfResults;

	   leanResults = weightValue - LbsBfResults
	   leanResultsDiv.textContent = leanResults;
	   //calcDown(weightValue, percentValue, LbsBfResults, leanResults);
	   calcGoalPercent();
	   calcProteinNeed();
	   calcBmr();
	   calcGoalPercent();
    }

    function reCalc(){
    	doTheCalc();
    }

    function calcBmr(){
    	//get male or female
    	for (var i = sex.length - 1; i >= 0; i--) {
    		let evaluatedSexOption = sex[i];
    		if (evaluatedSexOption.checked == true) {
    			selectedSex = evaluatedSexOption.value;
    		} // end of if
    	}

    	//set male or female value
		const maleSValue = 5;
    	const femaleSValue = -161; //where s is +5 for males and -161 for females.

    	let selectedSexSValue;
    	if (selectedSex == "female") {
    		selectedSexSValue = femaleSValue;
			bfPercentageGoalByGender = bfGoalFemale;
			calcGoalPercentModifier = calcGoalPercentModifierFemale;
    	} else {
    		selectedSexSValue = maleSValue
    		bfPercentageGoalByGender = bfGoalMale;
    		calcGoalPercentModifier = calcGoalPercentModifierMale;
    	}

    	let ageValue = age.value;
    	let feetValue = feet.value;
    	let inchesValue = inches.value;
    	let weightValue = weight.value;
    	

    	//convert
    	let weightValueKilo = weightValue * 0.45359237;
    	//81.6466266
    	
    	let totalInches = ((feetValue*12)+(inchesValue*1));//multiplying by other numbers case to number?
    	//could use parseFloat if needed. 
    	//68
    	let heightValueCentimeteres = ((feetValue*12)+parseFloat(inchesValue))*2.54;
    	//172.72
    	//BMR (kcal / day) = 10 * weight (kg) + 6.25 * height (cm) – 5 * age (y) + s (kcal / day)

    	bmrResult = (10 * weightValueKilo) + (6.25 * heightValueCentimeteres) - (5 * ageValue) + selectedSexSValue;
    	//816.466266 + 1,079.5 - 165 + 5
    	//1,735.966266
    	bmrAnswer.textContent = bmrResult;
    	activeMultipler();
    } //end function calc bmr

    function activeMultipler(){
    	//get multiplier
    	let pickedActivityMultiplier;
    	for (var i = activityList.length - 1; i >= 0; i--) {
    		let evaluatedActivityOption = activityList[i];
    		if (evaluatedActivityOption.checked == true) {
    			pickedActivityMultiplier = evaluatedActivityOption.value;
    		} // end of if
    	} // end of for loop

    	//set values
    	const sedentaryValue = 1.15;
		const lightActivityValue = 1.35;
		const moderateActivityValue = 1.55;
		const veryActiveValue = 1.75;
		const extremelyActiveValue = 1.95;

    	let selectedActivityValue;
    	if (pickedActivityMultiplier == "sedentary") {
    		selectedActivityValue = sedentaryValue;
    	} else if (pickedActivityMultiplier == "light") {
    		selectedActivityValue = lightActivityValue;
    	} else if (pickedActivityMultiplier == "moderate") {
    		selectedActivityValue = moderateActivityValue;
    	} else if (pickedActivityMultiplier == "veryactive") {
    		selectedActivityValue = veryActiveValue;
    	} else if (pickedActivityMultiplier == "extremely") {
    		selectedActivityValue = extremelyActiveValue;
    	}

    	let bmrWithActivity = bmrResult * selectedActivityValue;

    	tdee.textContent = bmrWithActivity;

    } //end activieMultipler

    function calcGoalPercent(){
    	GoalFatResults = calcGoalPercentModifier * leanResults;
    	GoalTotalBodyWeight = GoalFatResults + leanResults;

    	LbsToLoseToGoal = LbsBfResults - GoalFatResults;

    	//set
    	
    	for (var i = bfPercentGenderInsert.length - 1; i >= 0; i--) {
    		bfPercentGenderInsert[i].textContent = bfPercentageGoalByGender*100;
    	}//there are multiple bfPercentGenerInserts so iterate thru them all to set. 
    	
    	//TODO
    	for (var i = weightInsert.length - 1; i >= 0; i--) {
    		weightInsert[i].textContent = weightValue;
    	//instead of one weightInsert.textContent = weightValue;
    	}//there are multiple weightInsert so iterate thru them all to set. 
    	bfInsert.textContent = percentValue;
    	leanInsert.textContent = leanResults;
    	fatInsert.textContent = LbsBfResults
    	loseInsert.textContent = LbsToLoseToGoal;
    	newFatInsert.textContent = GoalFatResults;
    	newTotalBodyWeightInsert.textContent = GoalTotalBodyWeight;

    	calcDaysToGoalBf();

    } //end calcGoalPercent

    function calcProteinNeed(){
    	gramsProteinNeeded = weightValue * .82;
		gramsProteinInsert.textContent = gramsProteinNeeded;
    } // end calcProteinNeed

    function calcDaysToGoalBf() {
		caloricDeficitValue = parseInt(caloricDeficitInput.value);

		totalCaloriesUntilBfGoal = LbsToLoseToGoal * 3500;

		numberOfDaysTilGoal = totalCaloriesUntilBfGoal / caloricDeficitValue;

		numberOfDaysTilGoalInsert.textContent  = numberOfDaysTilGoal;

		numberOfWeeksTilGoal = numberOfDaysTilGoal / 7;

		numberOfMonthsTilGoal = numberOfWeeksTilGoal / 4;

		numberOfWeeksTilGoalInsert.textContent = numberOfWeeksTilGoal;

		numberOfMonthsTilGoalInsert.textContent = numberOfMonthsTilGoal

		//it will be in miliseconds. So have to convert to days. 
		let numberOfDaysBetweenNowAndSummer = (firstDayOfSummer.getTime() - todaysDate.getTime())/(1000 * 3600 * 24);

		daysTillSummer.textContent = numberOfDaysBetweenNowAndSummer;

    } //end function calcDaysToGoalBf

    function answerApple() {
    	let appleGuessValue = appleGuess.value;
    	let appleGuessDifference = appleGuessValue - appleCalories;
    	if (appleGuessDifference > 0) {
    		appleGuessText.textContent = 'You were over by ' + appleGuessDifference + '. An apple has ' + appleCalories + '.';
    	} else if (appleGuessDifference == 0){
    		appleGuessText.textContent = 'Congratulations! You were spot on. You didn\'t cheat and look it up did you?';
    	} else {
    		appleGuessText.textContent = 'You were under by ' + Math.abs(appleGuessDifference) + '. An apple has ' + appleCalories + '.';
    	}

    }

    function answerSnickers() {
    	let snickersGuessValue = snickersGuess.value;
    	let snickersGuessDifference = snickersGuessValue - snickersCalories;
    	if (snickersGuessDifference > 0) {
    		snickersGuessText.textContent = 'You were over by ' + snickersGuessDifference + '. A Snickers has ' + snickersCalories + ' calories.';
    	} else if (snickersGuessDifference == 0){
    		snickersGuessText.textContent = 'Congratulations! You were spot on. You didn\'t cheat and look it up did you?';
    	}else {
    		snickersGuessText.textContent = 'You were under by ' + Math.abs(snickersGuessDifference) + '. A Snickers has ' + snickersCalories + ' calories.';
    	}
    }

    function answerFiveGuys() {
  		let fiveGuysBurgerGuessValue = fiveGuysBurgerGuess.value;
    	let fiveGuysBurgerGuessDifference = fiveGuysBurgerGuessValue - fiveGuysBurgerCalories;
    	if (fiveGuysBurgerGuessDifference > 0) {
    		fiveGuysBurgerGuessText.textContent = 'You were over by ' + fiveGuysBurgerGuessDifference + '. A Five Guys Burger has ' + fiveGuysBurgerCalories + ' calories.';
    	} else if (fiveGuysBurgerGuessDifference == 0){
    		fiveGuysBurgerGuessText.textContent = 'Congratulations! You were spot on. You didn\'t cheat and look it up did you?';
    	}else {
    		fiveGuysBurgerGuessText.textContent = 'You were under by ' + Math.abs(fiveGuysBurgerGuessDifference) + '. A Five Guys Burger has ' + fiveGuysBurgerCalories + ' calories.';
    	}
    }


    const calcButton = document.querySelector('.calcButton');
    const reCalcButton = document.getElementById('reCalcButton');
    //remember to use the correct selector! Or just id. 
    const calcBmrButton = document.getElementById('calcBmr');

    const weightInputBox2 = document.getElementById('weightInputBox');
    const percentInputBox2 = document.getElementById('percentInputBox');
    const LbsBfResultsDiv = document.getElementById('LbsBfResultsDiv');

	//let weightCount = new CountUp("LbsBfResultsDiv", 22, 99.99);
    //weightCount.start();

    const leanResultsDiv = document.getElementById('leanResultsDiv');
    let bfPercentageArray = [];
    const bfRunDown = document.getElementById('bfRunDown');
    let displayBfRundownData = "";

    let selectedSex;
    let bfPercentageGoalByGender;
    const bfGoalMale = .1;
    const bfGoalFemale = .21;
    let calcGoalPercentModifier;
    const calcGoalPercentModifierFemale = .2658;
    const calcGoalPercentModifierMale = .1111111111;

    const sex = document.getElementsByName('sex');//return node list. All the checkboxes. Careful. 
    const age = document.getElementById('age');
    const feet = document.getElementById('feet');
    const inches = document.getElementById('inches');
    const weight = document.getElementById('weight');
    const bmrAnswer = document.getElementById('bmrAnswer');

    let bmrResult;

    const activityList = document.getElementsByName('activity');
    for (var i = activityList.length - 1; i >= 0; i--) {
    	activityList[i],addEventListener('click', activeMultipler);
    } // end of if

    const bfPercentGenderInsert = document.getElementsByName('bfPercentGenderInsert');
    const weightInsert = document.getElementsByName('weightInsert');
    const bfInsert = document.getElementById('bfInsert');
    const leanInsert = document.getElementById('leanInsert');
    const fatInsert = document.getElementById('fatInsert');
    const loseInsert = document.getElementById('loseInsert');
    const newFatInsert = document.getElementById('newFatInsert');
    const newTotalBodyWeightInsert = document.getElementById('newTotalBodyWeightInsert')
    
    
    let leanResults;
    let weightValue;
    let percentValue;
    let LbsBfResults;
    let GoalFatResults;
    let GoalTotalBodyWeight;
    let LbsToLoseToGoal;

    const caloricDeficitInput = document.getElementById('caloricDeficitInput');
    let caloricDeficitValue; 
    let totalCaloriesUntilBfGoal;
    let numberOfDaysTilGoal;
    let numberOfWeeksTilGoal;
    let numberOfMonthsTilGoal;
    const numberOfDaysTilGoalInsert = document.getElementById('numberOfDaysTilGoalInsert');
    const numberOfWeeksTilGoalInsert = document.getElementById('numberOfWeeksTilGoalInsert');
    const numberOfMonthsTilGoalInsert = document.getElementById('numberOfMonthsTilGoalInsert');

    const appleGuessText = document.getElementById('appleGuessText')
    const appleGuess = document.getElementById('appleGuess')
    const appleGuessButton = document.getElementById('appleGuessButton')
    const appleCalories = 95;

    const snickersGuessText  = document.getElementById('snickersGuessText')
    const snickersGuess = document.getElementById('snickersGuess')
    const snickersGuessButton = document.getElementById('snickersGuessButton')
    const snickersCalories = 280;

    const fiveGuysBurgerGuessText = document.getElementById('fiveGuysBurgerGuessText')
    const fiveGuysBurgerGuess = document.getElementById('fiveGuysBurgerGuess')
    const fiveGuysBurgerGuessButton = document.getElementById('fiveGuysBurgerGuessButton')
    const fiveGuysBurgerCalories = 1060;

	calcButton.addEventListener('click', doTheCalc);
	reCalcButton.addEventListener('click', reCalc);
    calcBmrButton.addEventListener('click', calcBmr);

    appleGuessButton.addEventListener('click', answerApple);
    snickersGuessButton.addEventListener('click', answerSnickers);
    fiveGuysBurgerGuessButton.addEventListener('click', answerFiveGuys);

    const averageMaleWeight = 197;
    const averageMaleHeightInches = 69.0;
    const averageMaleWaistInches = 40.3;
    const averageMaleBodyFatPercentage = 28;

    const averageFemaleWeight = 170;
    const averageFemaleHeight = 63.6;
    const averageFemaleWaistInches = 38.7;
    const averageFemaleBodyFatPercentage = 41;

    const firstDayOfSummer = new Date("06/20/2020");
    let todaysDate = new Date();

    const daysTillSummer = document.getElementById('daysTillSummerInsert');

    let gramsProteinNeeded;
    const gramsProteinInsert = document.getElementById('gramsProteinInsert');

    function calcDown(weightValue, percentValue, LbsBfResults, leanResults) {
    	for (var bfPercentageIterator = percentValue ; bfPercentageIterator >= 5; bfPercentageIterator--) {
    		console.log({bfPercentage: bfPercentageIterator, leanPercentage: 1});
    		{bfPercentage: bfPercentageIterator}
    		bfPercentageArray.push({bfPercentage: bfPercentageIterator, leanPercentage: 1});
    		displayBfRundownData += bfPercentageArray[bfPercentageIterator] + "\n";
    	} //end of for statement

    	bfRunDown.textContent = bfPercentageArray;
    	bfRunDown.textContent = displayBfRundownData;

    
//todo
//1. Figure out Object. 
//2. Figure out how to display a list of objects.
//3. Do the proper calculations for the objects.

    }
});