document.addEventListener("DOMContentLoaded", function() {
    function mainCalc() {
    	getUserInputs()
    	createUser();
    	calcCurrentWeightAndLean();
    	calcGoalPercent();
	    calcBmr();
	    activeMultipler();
	    calcGoalPercent();
	    calcPercentDeficit();
	    calcProteinNeed();
        generateTable();
    }

    function getUserInputs(){
    	//weight
    	weightValue = weightInputBox2.value;

    	//body fat
    	percentValue = percentInputBox2.value

    	//gender
	    sex.forEach( function(element, index) {
			let evaluatedSexOption = element;
			if (evaluatedSexOption.checked == true) {
				selectedSex = evaluatedSexOption.value;
			} // end of if
		}); //end of sex.forEach

		//bf goal
		userBfGoal = bfGoalInputBox.value;

		//age
		ageValue = age.value;

		//height
		feetValue = feet.value;
    	inchesValue = inches.value;

		//activity level
		activityList.forEach( function(element, index) {
    		let evaluatedActivityOption = element;
    		if (evaluatedActivityOption.checked == true) {
    			pickedActivityMultiplier = evaluatedActivityOption.value;
    		} // end of if
    	}); //end of actibityList.forEach

        //caloric deficit
        caloricDeficitValue = parseInt(caloricDeficitInput.value);
    }

    function createUser(){
    	user = new Object();
    	user.weight = weightValue;
    	user.bodyFatPercentage = percentValue;
    	user.leanBodyMass = leanResults;
    	user.fatBodyMass = LbsBfResults;
    	user.bodyFatPercentageGoal = userBfGoal;
    	user.age = ageValue;
    	user.heightInInches = ((feetValue*12)+(inchesValue*1)); //magic number to cast it correctly. :(
    	user.activityLevel = pickedActivityMultiplier;
    	console.log('Player 1 ready');
    }

    function reCalc(){
    	mainCalc();
    }

    function calcCurrentWeightAndLean() {	   
	   LbsBfResults = (user.weight * (user.bodyFatPercentage /100)); //lbs bf results
	   LbsBfResultsDiv.textContent = LbsBfResults;

	   leanResults = weightValue - LbsBfResults
	   leanResultsDiv.textContent = leanResults;
	   //calcDown(weightValue, percentValue, LbsBfResults, leanResults);
	  
    }

    function calcBmr(){
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
    } //end function calc bmr

    function activeMultipler(){

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

    	bmrWithActivity = bmrResult * selectedActivityValue;

    	tdee.forEach( function(element, index) {
    		element.textContent  = bmrWithActivity;
    	});

    	userPickedDeficitInsert.forEach( function(element, index) {
    		element.textContent  = caloricDeficitValue;
    	});

    	let caloriesADay = bmrWithActivity - caloricDeficitValue;

    	calorieBudgetInsert.forEach( function(element, index) {
    		element.textContent  = caloriesADay;
    	});

    } //end activieMultipler

    function calcGoalPercent(){
    	userGoalPercentModifer = userBfGoal/(100 - userBfGoal);

    	GoalFatResults = userGoalPercentModifer * leanResults;
    	GoalTotalBodyWeight = GoalFatResults + leanResults;

    	LbsToLoseToGoal = LbsBfResults - GoalFatResults; 
    	
    	bfPercentGenderInsert.forEach( function(element, index) {
    		element.textContent = userBfGoal;
    	});

    	weightInsert.forEach( function(element, index) {
    		element.textContent = weightValue;
    	});
    	
    	bfInsert.forEach( function(element, index) {
    		element.textContent = percentValue;
    	});

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
		console.log('Welcome to the matrix. Ready Player 2')
    } // end calcProteinNeed

    function calcDaysToGoalBf() {
		totalCaloriesUntilBfGoal = LbsToLoseToGoal * 3500;

		numberOfDaysTilGoal = totalCaloriesUntilBfGoal / caloricDeficitValue;

    	numberOfDaysTilGoalInsert.forEach( function(element, index) {
    		element.textContent  = numberOfDaysTilGoal;
    	});

		numberOfWeeksTilGoal = numberOfDaysTilGoal / 7;
        numberOfWeeksTilGoalInsert.textContent = numberOfWeeksTilGoal;

		numberOfMonthsTilGoal = numberOfWeeksTilGoal / 4;
		numberOfMonthsTilGoalInsert.textContent = numberOfMonthsTilGoal

		//it will be in miliseconds. So have to convert to days. 
		let numberOfDaysBetweenNowAndSummer = (firstDayOfSummer.getTime() - todaysDate.getTime())/(1000 * 3600 * 24);

		daysTillSummer.textContent = numberOfDaysBetweenNowAndSummer;

		let today = new Date();
		let goalEndDate = new Date();
		//numberOfDaysTilGoal is the days to add
		goalEndDate.setDate(today.getDate() + numberOfDaysTilGoal);

		let dd = goalEndDate.getDate();
		let mm = goalEndDate.getMonth() + 1; //javascript is weird. 
		let yyyy = goalEndDate.getFullYear();

		let goalEndDateFormatted = dd + '/' + mm + '/' + yyyy;
		dateFromCalculatedDaysAway.textContent = goalEndDateFormatted;

    } //end function calcDaysToGoalBf

    function calcPercentDeficit() {
    	calculatedPercentDeficit = caloricDeficitValue / bmrWithActivity;
    	percentDeficitInsert.textContent = calculatedPercentDeficit;
    }

    function generateTable() {
        //get days till goal
        //iterate through each day til goal
            //calc the needed values for each day. 
        //put each value in a table row
        //display the table
        console.log('the table of power has been created');
    };

    let user;

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

    const sexElements = document.getElementsByClassName('sex');//return 'array like' list. All the checkboxes. Careful. 
    const sex = Array.from(sexElements);

    const age = document.getElementById('age');
    let ageValue;
    const feet = document.getElementById('feet');
    let feetValue;
    const inches = document.getElementById('inches');
	let inchesValue;
    const bmrAnswer = document.getElementById('bmrAnswer');



    let bmrResult;

    let bmrWithActivity;

    let tdee = document.getElementsByName('tdee');

    const activityListElements = document.getElementsByClassName('activity');
    const activityList = Array.from(activityListElements);
    activityList.forEach( function(element, index) {
    	element,addEventListener('click', activeMultipler);
    });

    const bfPercentGenderInsert = document.getElementsByName('bfPercentGenderInsert');
    const weightInsert = document.getElementsByName('weightInsert');
    const bfInsert = document.getElementsByName('bfInsert');
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
    const numberOfDaysTilGoalInsert = document.getElementsByName('numberOfDaysTilGoalInsert');
    const numberOfWeeksTilGoalInsert = document.getElementById('numberOfWeeksTilGoalInsert');
    const numberOfMonthsTilGoalInsert = document.getElementById('numberOfMonthsTilGoalInsert');

	calcButton.addEventListener('click', mainCalc);
	reCalcButton.addEventListener('click', reCalc);
    calcBmrButton.addEventListener('click', calcBmr);

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

    const percentDeficitInsert = document.getElementById('percentDeficitInsert');
    let calculatedPercentDeficit;

    const dateFromCalculatedDaysAway = document.getElementById('dateFromCalculatedDaysAway');
    let calculatedDateFromCalculatedDaysAway;

    const calorieBudgetInsert = document.getElementsByName('calorieBudgetInsert');
    const userPickedDeficitInsert = document.getElementsByName('userPickedDeficitInsert');

    const bfGoalInputBox = document.getElementById('bfGoalInputBox');
    let userBfGoal;

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