document.addEventListener("DOMContentLoaded", function() {
    
    function bootup() {
        getUserInputs();
        createUser();
        generateEstimatingText();
    }

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
        createUser();
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
        user.sex = selectedSex;
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
        getUserInputs();//if they change activity level before anything else. 

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

    function toggleEstimates() {
        console.log('toggleEstimates')
        
        if (estimateBodyFatSection.style.display == "block") {
            estimateBodyFatSection.style.display = "none";
            showEstimateSection.textContent = 'Click to show body fat estimating section.'
        } else {
            estimateBodyFatSection.style.display = "block";
            showEstimateSection.textContent = 'Click to hide body fat estimating section.'
        }
    }

    function generateEstimatingText(){
        
        let fourtyPercent = "40% body fat: Significant fat accumulation in the stomach and waist region. Basic daily activities like walking up stairs or bending over to pick something up are difficult. This body fat percentage is considered morbidly obese.";
        let thirtyfivePercent = "35% body fat: This percentage of body fat is more of the beer gut look. The waist circumference at this point can be about 40+ inches."
        let thirtyPercent = "30% body fat: Fat is present all around the body including waist, back, thighs, and calves. The waist will appear slightly larger relative to the hips, and the stomach will most likely be protruding noticeably over the waist."
        let twentyfivePercent = "25% body fat: This is the start of average territory, but 25% body fat for a man is still considered obese. The waist is creeping over 40 inches, which is considered abdominal obesity. There is almost no separation of muscles, no noticeable veins and no muscle striations. There may be a little neck fat. However, this man may not look like he has 25% body fat in normal clothing.";
        let twentyPercent = "20% body fat: Low end of the average territory. Muscle definition is not as present and noticeable especially in the abdomen. A man with this level of body fat typically has the “soft” look and has a pouch on his abdomen.";
        let fifteenPercent = "15% body fat: This percentage of body fat usually fits into the “lean and fit” category. Outlines of muscle can be seen, but there is not really a clear separation between them. Muscles and veins can slightly be seen, but are covered by a thin layer of fat. However, the overall body shape is present and can be noticed.";
        let tenToTwelvePercent = "10-12% body fat: Very in shape. Your abs can be seen, but aren’t as deeply chiseled or defined as a man with 6-8% body fat. This is the body fat percentage that is the perfect beach body most people strive for. At this level is some defined veins in the arms and legs."; 
        let sixToEightPercent = "6-8% body fat: Extremely low levels of body fat. Think Hollywood Baywatch or Blade. This level is very difficult to maintain and not easily sustainable. This level is characterized by muscle definition in most muscle groups and some clear showing of your veins (vascularity) in areas such as arms, legs, and abs.";
        let fivePercent = "5% body fat: Ridiculously (dangerously) lean. All muscles, veins, and striations (the rod looking stripes on a muscle) are very visible. This is around the lowest level of body fat a human male can have. You look like an anatomy mannequin.";
        let maleEstimateTextArray = [fourtyPercent, thirtyfivePercent, thirtyPercent, twentyfivePercent, twentyPercent, fifteenPercent, tenToTwelvePercent, sixToEightPercent, fivePercent];

        let femaleFiftyPercent = "50% body fat: Significant fat accumulation in all body regions. Basic daily activities like walking up stairs or bending over to pick something up are difficult. This body fat percentage is considered morbidly obese. This skin will appear more dimple or “cottage cheese” like.";
        let femaleFourtyfivePercent = "45% body fat: At this body weight, the hips become noticeably wider than the shoulders. The general hip circumference may reach 45+ inches and waist circumference 35+ inches. The skin may start to lose its smooth nature at this percentage level.";
        let femaleFourty = "40% body fat: At this level a women is considered obese. This means there is not a very balanced muscle to fat ratio. Some women may not look like they have 40% body fat, but their muscle mass is lower, which brings their percentage to 40%.";
        let femaleThirtyfive = "35% body fat: The body has more fat accumulations and the face and neck begin to appear fuller and more round. Belly fat is also more pronounced at this level as well.";
        let femaleThirty = "30% body fat: At this level there is more accumulation of fat in the hips and butt region. 30% body fat is considered a high average for women.";
        let femaleTwentyfive = "25% body fat: This percentage is on the lower end of what is average for women. Abs and other muscles are not as apparent at this level, and there is generally more fat around the hips and buttocks areas."; 
        let femaleTwentyToTwentytwo = "20-22% body fat: This is the start of the “fit and lean” area. This level is the most common among female athletes. Some definition in the abs.";
        let femaleFifteenToSeventeen = "15-17% body fat: At this level muscles are still visible. Abs, legs, and arms have definition. There is some separation between muscles there is also some vascularity. Women don’t have as much curvature in hips and buttocks because of the low body fat level. This is a common level of body fat among fitness models. Many women who are at this level may not be able to menstruate.";
        let femaleTenToTwelve = "10-12% Body fat: This percentage is the lowest a woman should be. At this percentage the women’s vascularity and some striations are visible. The woman’s muscles are clearly separated. This level of body fat isn’t considered safe or healthy for women who menstruate.";
        let femaleEstimateTextArray = [femaleFiftyPercent, femaleFourtyfivePercent, femaleFourty, femaleThirtyfive, femaleThirty, femaleTwentyfive, femaleTwentyToTwentytwo, femaleFifteenToSeventeen, femaleTenToTwelve];

        let genderBodyFatEstimationArray;
        if (user.sex == 'male') {
            genderBodyFatEstimationArray = maleEstimateTextArray;
        } else {
            genderBodyFatEstimationArray = femaleEstimateTextArray;
        }

        //clear out the node if they click a gender
        while (estimateBodyFatLevelDescriptions.firstChild) {
            estimateBodyFatLevelDescriptions.firstChild.remove();
        }

        //generate a paragraph for each element and set it to the node
        genderBodyFatEstimationArray.forEach( function(element, index) {
            let textNode = document.createTextNode(element);
            let paragraph = document.createElement("p");
            paragraph.appendChild(textNode);
            estimateBodyFatLevelDescriptions.appendChild(paragraph);
        });
    }

    function genderPicked(){
        getUserInputs();
        generateEstimatingText();
    }

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
    sex.forEach( function(element, index) {
        element.addEventListener('change', genderPicked);
    });

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
    	element,addEventListener('change', activeMultipler);
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

    const showEstimateSection = document.getElementById('showEstimateSection');
    showEstimateSection.addEventListener('click', toggleEstimates);
    const estimateBodyFatSection = document.getElementById('estimateBodyFat');
    const estimateBodyFatLevelDescriptions = document.getElementById('estimateBodyFatLevelDescriptions');


    bootup();

    function calcDown(weightValue, percentValue, LbsBfResults, leanResults) {
    	for (var bfPercentageIterator = percentValue ; bfPercentageIterator >= 5; bfPercentageIterator--) {
    		console.log({bfPercentage: bfPercentageIterator, leanPercentage: 1});
    		{bfPercentage: bfPercentageIterator}
    		bfPercentageArray.push({bfPercentage: bfPercentageIterator, leanPercentage: 1});
    		displayBfRundownData += bfPercentageArray[bfPercentageIterator] + "\n";
    	} //end of for statement

    	bfRunDown.textContent = bfPercentageArray;
    	bfRunDown.textContent = displayBfRundownData;
    
//<script src="countUp.js"></script>    
//todo
//1. Figure out Object. 
//2. Figure out how to display a list of objects.
//3. Do the proper calculations for the objects.
}
});