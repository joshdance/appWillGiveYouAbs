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
    	weightInsert.textContent = weightValue;
    	bfInsert.textContent = percentValue;
    	leanInsert.textContent = leanResults;
    	fatInsert.textContent = LbsBfResults
    	loseInsert.textContent = LbsToLoseToGoal;
    	newFatInsert.textContent = GoalFatResults;

    	calcDaysToGoalBf();

    } //end calcGoalPercent

    function calcDaysToGoalBf() {
		caloricDeficitValue = parseInt(caloricDeficitInput.value);

		totalCaloriesUntilBfGoal = LbsToLoseToGoal * 3500;

		numberOfDaysTilGoal = totalCaloriesUntilBfGoal / caloricDeficitValue;

		numberOfDaysTilGoalInsert.textContent  = numberOfDaysTilGoal;
    } //end function calcDaysToGoalBf

    const calcButton = document.querySelector('.calcButton');
    //remember to use the correct selector! Or just id. 
    const calcBmrButton = document.getElementById('calcBmr');

    const weightInputBox2 = document.getElementById('weightInputBox');
    const percentInputBox2 = document.getElementById('percentInputBox');
    const LbsBfResultsDiv = document.getElementById('LbsBfResultsDiv');
    const leanResultsDiv = document.getElementById('leanResultsDiv');
    let bfPercentageArray = [];
    const bfRunDown = document.getElementById('bfRunDown');
    let displayBfRundownData = "";

    let selectedSex;
    let bfPercentageGoalByGender;
    const bfGoalMale = .1;
    const bfGoalFemale = .2;
    let calcGoalPercentModifier;
    const calcGoalPercentModifierFemale = .25;
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
    const weightInsert = document.getElementById('weightInsert');
    const bfInsert = document.getElementById('bfInsert');
    const leanInsert = document.getElementById('leanInsert');
    const fatInsert = document.getElementById('fatInsert');
    const loseInsert = document.getElementById('loseInsert');
    const newFatInsert = document.getElementById('newFatInsert');
    
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
    const numberOfDaysTilGoalInsert = document.getElementById('numberOfDaysTilGoalInsert');
    

	calcButton.addEventListener('click', doTheCalc);
    calcBmrButton.addEventListener('click', calcBmr);
   

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