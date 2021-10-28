//function name ();
document.addEventListener("DOMContentLoaded", calculateUserBodyFat);

//put each function no nested. 

function calculateUserBodyFat() {
    
    let user = new Object;

    function bootup() {
        getUserInputs();
        setUser();
        generateEstimatingText();
        genderPicked();
        calcDaysTilSummer();
    }

    function calcDaysTilSummer(){
        //it will be in miliseconds. So have to convert to days. 
        let numberOfDaysBetweenNowAndSummer = (firstDayOfSummer.getTime() - todaysDate.getTime())/(1000 * 3600 * 24);

        numberOfDaysBetweenNowAndSummer = (Math.round (numberOfDaysBetweenNowAndSummer * 10) / 10) + 1;

        daysTillSummer.textContent = numberOfDaysBetweenNowAndSummer;
    }

    function setUser(){
        user.name = name;
        user.weight = weightValue;
        user.bodyFatPercentage = percentValue;
        user.leanBodyMass = leanResults;
        user.fatBodyMass = LbsBfResults;
        user.bodyFatPercentageGoal = userBfGoal;
        user.age = ageValue;
        user.heightInInches = ((feetValue*12)+(inchesValue*1)); //magic number to cast it correctly. :(
        user.activityLevel = pickedActivityMultiplier;
        user.sex = selectedSex;
        user.caloricDeficit = caloricDeficitValue;
        user.setOwnBodyFatGoal = false;
        console.log('Player 1 ready');
    }


    function mainCalc() {
    	getUserInputs();
        genderPicked();
    	calcCurrentWeightAndLean();
    	calcGoalPercent();
	    calcBmr();
	    activeMultipler();
	    calcGoalPercent();
	    calcPercentDeficit();
        calcMaxCaloricDeficit();
	    calcProteinNeed();
        calcCalsFromProtein();
        calcCalsFromCarbsAndFatAtMaxDeficit();
        generateTable();
        calcTwentyFivePercentDeficit();
        setDailyCaloriesInputField();
    }



    function calcBodyFatLevels(){
        percentValue = percentInputBox2.value
        if (user != null) {
            user.bodyFatPercentage = percentValue;
        }

        calcCurrentWeightAndLean();

        weightInsert.forEach( function(element, index) {
            element.textContent = weightValue;
        });

        bfInsert.forEach( function(element, index) {
            element.textContent = user.bodyFatPercentage;
        });

        LbsBfResultsDiv.textContent = LbsBfResults;

        leanResultsDiv.textContent = leanResults;      
    }

    function getUserInputs(){

        getUserName();

        //weight
        getUserWeight();

    	//body fat
        calcBodyFatLevels();

    	//gender
	    getUserGender();

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
        calcCaloricDeficitValue();
    }

    function calcCaloricDeficitValue(){
        getUserCalorieIntake();

        caloricDeficitValue = bmrWithActivity - userSelectedDailyCalories; 
        caloricDeficitValue = roundNumPlace(caloricDeficitValue,1);
    }
    
    function getUserCalorieIntake(){
        userSelectedDailyCalories = parseInt(caloricBudgetInput.value);

        calorieBudgetInsert.forEach( function(element, index) {
            element.textContent  = userSelectedDailyCalories;
        });
    }

    function setDailyCaloriesInputField(){
        if (userDidSetDailyCalories == false) {
            caloricBudgetInput.value = recommendedDailyCalories;
        }
    }

    function getUserName(){
        if (nameInputBox != null) {
            name = nameInputBox.value;
        }
        user.name = name;
    }

    function getUserGender(){
        sex.forEach( function(element, index) {
            let evaluatedSexOption = element;
            if (evaluatedSexOption.checked == true) {
                selectedSex = evaluatedSexOption.value;
            } // end of if
        }); //end of sex.forEach

        if (user != null) {
            user.sex = selectedSex;
        }
    }

    function getUserWeight(){
        weightValue = weightInputBox2.value;
        user.weight = weightValue;
    }



    function customizeEssayWithName(){
        name = nameInputBox.value;
        user.name = name;
        userNameInsert.forEach( function(element, index) {
            element.textContent = user.name;
        });
    }

    function reCalc(){
    	mainCalc();
    }

    function calcCurrentWeightAndLean() {	   
	   LbsBfResults = (user.weight * (user.bodyFatPercentage /100)); //lbs bf results
	   LbsBfResults = roundNumPlace(LbsBfResults,1);
       LbsBfResultsDiv.textContent = LbsBfResults;

	   leanResults = weightValue - LbsBfResults;
       leanResults = roundNumPlace(leanResults,1);
	   leanResultsDiv.textContent = leanResults;	  
    }

    function calcBmr(){
    	calcGoalPercent();

        //set male or female value
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

    	let unRoundedBmrResult = (10 * weightValueKilo) + (6.25 * heightValueCentimeteres) - (5 * ageValue) + selectedSexSValue;
    	bmrResult = Math.round (unRoundedBmrResult * 10) / 10;

        bmrAnswer.forEach( function(element, index) {
            element.textContent = bmrResult;
        });

        activeMultipler();
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

    	let unRoundedBmrWithActivity = bmrResult * selectedActivityValue;
        bmrWithActivity = Math.round (unRoundedBmrWithActivity * 10) / 10;

    	tdee.forEach( function(element, index) {
    		element.textContent  = bmrWithActivity;
    	});

        calcTwentyFivePercentDeficit();

        //if user picked a deficit, leave that, if 
        //userManuallyPickedDeficit = true
        //if not calc 25%

    	userPickedDeficitInsert.forEach( function(element, index) {
    		element.textContent  = caloricDeficitValue;
    	});
        calcCaloricDeficitValue();
    } //end activieMultipler

    function calcTwentyFivePercentDeficit(){
        twentyFivePercentDeficit = bmrWithActivity - (bmrWithActivity*.25);
        twentyFivePercentDeficit = roundNumPlace(twentyFivePercentDeficit,1);

        recommendedDailyCalories = twentyFivePercentDeficit;
        setDailyCaloriesInputField();

        twentyFivePercentCalorieDeficitOnly = bmrWithActivity*.25;
        twentyFivePercentCalorieDeficitOnly = roundNumPlace(twentyFivePercentCalorieDeficitOnly,1);

        twentyFivePercentCalorieDeficitInsert.forEach( function(element, index) {
            element.textContent  = twentyFivePercentCalorieDeficitOnly;
        });

        theoreticalCalorieIntakeInsert.forEach( function(element, index) {
            element.textContent  = twentyFivePercentDeficit;
        });
    }

    function calcGoalPercent(){
    	userGoalPercentModifer = user.bodyFatPercentageGoal/(100 - user.bodyFatPercentageGoal);

    	GoalFatResults = userGoalPercentModifer * leanResults;
        GoalFatResults = roundNumPlace(GoalFatResults,2);

    	GoalTotalBodyWeight = GoalFatResults + leanResults;
        GoalTotalBodyWeight = roundNumPlace(GoalTotalBodyWeight,2);

    	LbsToLoseToGoal = LbsBfResults - GoalFatResults; 
        LbsToLoseToGoal = roundNumPlace(LbsToLoseToGoal,1);
    	
    	genderGoalBodyFatPercentageInsert.forEach( function(element, index) {
    		element.textContent = user.bodyFatPercentageGoal;
    	});

        goalBodyFatPercentageInsert.forEach( function(element, index) {
            element.textContent = user.bodyFatPercentageGoal;
        });

    	weightInsert.forEach( function(element, index) {
    		element.textContent = weightValue;
    	});
    	
    	bfInsert.forEach( function(element, index) {
    		element.textContent = user.bodyFatPercentage;
    	});

        leanInsert.forEach( function(element, index) {
            element.textContent = leanResults;
        });

        fatInsert.forEach( function(element, index) {
            element.textContent = LbsBfResults;
        });

        loseInsert.forEach( function(element, index) {
            element.textContent = LbsToLoseToGoal;
        });

        newFatInsert.forEach( function(element, index) {
            element.textContent = GoalFatResults;
        });

        newTotalBodyWeightInsert.forEach( function(element, index) {
            element.textContent = GoalTotalBodyWeight;
        });

    	calcDaysToGoalBf();

    } //end calcGoalPercent

    function calcProteinNeed(){
    	gramsProteinNeeded = weightValue * .82;
		gramsProteinNeeded = Math.round (gramsProteinNeeded * 10) / 10;
        gramsProteinInsert.forEach( function(element, index) {
            element.textContent = gramsProteinNeeded;
        });
		console.log('Welcome to the matrix. Ready Player 2')
    } // end calcProteinNeed

    function calcDaysToGoalBf() {
		totalCaloriesUntilBfGoal = LbsToLoseToGoal * 3500;
        totalCaloriesUntilBfGoal = roundNumPlace(totalCaloriesUntilBfGoal,1);

        caloriesToUseUp.forEach( function(element, index) {
            element.textContent = totalCaloriesUntilBfGoal;
        });

		numberOfDaysTilGoal = totalCaloriesUntilBfGoal / caloricDeficitValue;
        numberOfDaysTilGoal = Math.round (numberOfDaysTilGoal * 10) / 10;
    	numberOfDaysTilGoalInsert.forEach( function(element, index) {
    		element.textContent  = numberOfDaysTilGoal;
    	});

		numberOfWeeksTilGoal = numberOfDaysTilGoal / 7;
        numberOfWeeksTilGoal = Math.round (numberOfWeeksTilGoal * 10) / 10;

        numberOfWeeksTilGoalInsert.forEach( function(element, index) {
            element.textContent = numberOfWeeksTilGoal;
        });

		numberOfMonthsTilGoal = numberOfWeeksTilGoal / 4;
        numberOfMonthsTilGoal = Math.round (numberOfMonthsTilGoal * 10) / 10;
		numberOfMonthsTilGoalInsert.textContent = numberOfMonthsTilGoal

		let today = new Date();
		let goalEndDate = new Date();
		//numberOfDaysTilGoal is the days to add
		goalEndDate.setDate(today.getDate() + numberOfDaysTilGoal);

		let dd = goalEndDate.getDate();
		let mm = goalEndDate.getMonth() + 1; //javascript is weird. 
		let yyyy = goalEndDate.getFullYear();

		let goalEndDateFormatted = mm + '/' + dd + '/' + yyyy;
		dateFromCalculatedDaysAway.textContent = goalEndDateFormatted;

    } //end function calcDaysToGoalBf

    function calcPercentDeficit() {
    	unroundedCalculatedPercentDeficit = caloricDeficitValue / bmrWithActivity;
        calculatedPercentDeficit = (Math.round (unroundedCalculatedPercentDeficit * 100) / 100)*100;
    	percentDeficitInsert.textContent = calculatedPercentDeficit;
        calcDeficitExample();
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
        } else {
            estimateBodyFatSection.style.display = "block";
        }
    }

    function toggleActivityLevelSection() {
        console.log('toggle activity estimtes section');

        if (activityLevelSection.style.display == 'block') {
            activityLevelSection.style.display = "none";
            buttonToggleActivityLevelSection.textContent = 'Click to show Activity estimating section.';
        } else {
            activityLevelSection.style.display = "block";
            buttonToggleActivityLevelSection.textContent = 'Click to hide Activity estimating section.';
        }
    }

    function generateEstimatingText(){
        
        let fourtyPercent = "40% body fat: Significant fat accumulation in the stomach and waist region. Basic daily activities like walking up stairs or bending over to pick something up are difficult. This body fat percentage is considered morbidly obese.";
        let thirtyfivePercent = "35% body fat: This percentage of body fat is more of the beer gut look. The waist circumference at this point can be about 40+ inches."
        let thirtyPercent = "30% body fat: Fat is present all around the body including waist, back, thighs, and calves. The waist will appear slightly larger relative to the hips, and the stomach will most likely be protruding noticeably over the waist."
        let twentyfivePercent = "25% body fat: This is the start of average territory, but 25% body fat for a man is still considered obese. The waist is creeping over 40 inches, which is considered abdominal obesity. There is almost no separation of muscles, no noticeable veins and no muscle striations. There may be a little neck fat. However, this man may not look like he has 25% body fat in normal clothing.";
        let twentyPercent = "20% body fat: Low end of the average territory. Muscle definition is not as present and noticeable especially in the abdomen. A man with this level of body fat typically has the “soft” look and has a pouch on his abdomen.";
        let fifteenPercent = "15% body fat: This percentage of body fat usually fits into the “lean and fit” category. Outlines of muscle can be seen, but there is not really a clear separation between them. Muscles and veins can slightly be seen, but are covered by a thin layer of fat. However, the overall body shape is present and can be noticed.";
        let tenToTwelvePercent = "10-12% body fat: Very in shape. This is the beach body fat percentage that most people strive for 🏝. Your abs can be clearly seen. At this level is some defined veins in the arms and legs."; 
        let sixToEightPercent = "6-8% body fat: Extremely low levels of body fat. Absolutely chiseled from stone. Think Baywatch or Blade. This level is very difficult to maintain and not easily sustainable. This level is characterized by muscle definition in most muscle groups and some clear showing of your veins (vascularity) in areas such as arms, legs, and abs.";
        let fivePercent = "5% body fat: Ridiculously (dangerously) lean. All muscles, veins, and striations (the rod looking stripes on a muscle) are very visible. This is around the lowest level of body fat a human male can have. You look like an anatomy mannequin.";
        let maleEstimateTextArray = [fourtyPercent, thirtyfivePercent, thirtyPercent, twentyfivePercent, twentyPercent, fifteenPercent, tenToTwelvePercent, sixToEightPercent, fivePercent];

        let femaleFiftyPercent = "50% body fat: Significant fat accumulation in all body regions. Basic daily activities like walking up stairs or bending over to pick something up are difficult. This body fat percentage is considered morbidly obese. This skin will appear more dimple or “cottage cheese” like.";
        let femaleFourtyfivePercent = "45% body fat: At this body weight, the hips become noticeably wider than the shoulders. The general hip circumference may reach 45+ inches and waist circumference 35+ inches. The skin may start to lose its smooth nature at this percentage level.";
        let femaleFourty = "40% body fat: At this level a women is considered obese. This means there is not a very balanced muscle to fat ratio. Some women may not look like they have 40% body fat, but their muscle mass is lower, which brings their percentage to 40%.";
        let femaleThirtyfive = "35% body fat: The body has more fat accumulations and the face and neck begin to appear fuller and more round. Belly fat is also more pronounced at this level as well.";
        let femaleThirty = "30% body fat: At this level there is more accumulation of fat in the hips and butt region. 30% body fat is considered a high average for women.";
        let femaleTwentyfive = "25% body fat: This percentage is on the lower end of what is average for women. Abs and other muscles are not as apparent at this level, and there is generally more fat around the hips and buttocks areas."; 
        let femaleTwentyToTwentytwo = "20-22% body fat: This is the beach body fat percentage that most people strive for 🏝. This level is the most common among female athletes. Some definition in the abs.";
        let femaleFifteenToSeventeen = "15-17% body fat: At this level muscles are still visible. Abs, legs, and arms have definition. There is some separation between muscles there is also some vascularity. Women don’t have as much curvature in hips and buttocks because of the low body fat level. This is a common level of body fat among fitness models. Many women who are at this level may not be able to menstruate.";
        let femaleTenToTwelve = "10-12% Body fat: Ridiculously (dangerously) lean. At this percentage the women’s vascularity and some striations are visible. The woman’s muscles are clearly separated. This level of body fat isn’t considered safe or healthy for women who menstruate.";
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

        if (user.sex == 'male') {
            maleExampleImageLinks.forEach( function(element, index) {
                element.style.display = "block";// statements
            });
            femaleExampleImageLinks.forEach( function(element, index) {
                element.style.display = "none";// statements
            });
        } else {
            maleExampleImageLinks.forEach( function(element, index) {
                element.style.display = "none";// statements
            });
            femaleExampleImageLinks.forEach( function(element, index) {
                element.style.display = "block";// statements
            });
        }
    }

    function generateOptimalBodyFatText(){
        if (user.sex == 'male') {
            genderBfGoalFrom100 = bfGoalMale*100
        } else {
            genderBfGoalFrom100 = bfGoalFemale*100;
        }

        genderOptimalBfGoal.forEach( function(element, index) {
            element.textContent = genderBfGoalFrom100;
        });

        //set the body fat goal input box to the gender suggestion
        if (userDidSetBodyFatPercentageGoal === false) {
            bfGoalInputBox.value = genderBfGoalFrom100;
        }
    }

    function genderPicked(){
        getUserGender();
        generateEstimatingText();
        generateOptimalBodyFatText();
        generateOptimalBodyFatText();

        selectedGenderInsert.forEach( function(element, index) {
            element.textContent = user.sex;
        });




        genderGoalBodyFatPercentageInsert.forEach( function(element, index) {
            element.textContent = genderBfGoalFrom100;
        });
    }

    function roundNumPlace(num, places) {
        return +(Math.round(num + "e+" + places)  + "e-" + places);
    }

    function calcCalsFromProtein(){
        calsFromProtein = gramsProteinNeeded * 4;
        calsFromProtein = roundNumPlace(calsFromProtein,1);

        calsFromProteinInsert.forEach( function(element, index) {
            element.textContent = calsFromProtein;
        });
    }

    function calcCalsFromCarbsAndFatAtMaxDeficit(){
        let dailyCalsAtMax = bmrWithActivity - maxCaloricDeficit;
        dailyCalsAtMax = roundNumPlace(dailyCalsAtMax,1);

        dailyCaloriesAtMaxInsert.forEach( function(element, index) {
            element.textContent = dailyCalsAtMax;
        });

        calsFromCarbsAndFatAtMaxCaloricDeficit = dailyCalsAtMax - calsFromProtein;
        calsFromCarbsAndFatAtMaxCaloricDeficit = roundNumPlace(calsFromCarbsAndFatAtMaxCaloricDeficit,1);

        calsFromCarbsAndFatAtMaxCaloricDeficitInsert.forEach( function(element, index) {
            element.textContent = calsFromCarbsAndFatAtMaxCaloricDeficit;
        });
    }

    function calcMaxCaloricDeficit() {
        maxCaloricDeficit = user.fatBodyMass * 31;
        maxCaloricDeficit = roundNumPlace(maxCaloricDeficit,1);

        maxCaloricDeficitInsert.forEach( function(element, index) {
            element.textContent = maxCaloricDeficit;
        });
    }

    function calcDeficitExample() {
        let tdeeDeficitExample = (bmrWithActivity * .25);
        tdeeDeficitExample = roundNumPlace(tdeeDeficitExample,1);

        let tdeeDeficitExampleResult = bmrWithActivity - tdeeDeficitExample;
        tdeeDeficitExampleResult = roundNumPlace(tdeeDeficitExampleResult,1);

        tdeeDeficitExampleInsert.forEach( function(element, index) {
            element.textContent = tdeeDeficitExample;
        });

        tdeeDeficitExampleResultInsert.forEach( function(element, index) {
            element.textContent = tdeeDeficitExampleResult;
        });
    }

    function weightButtonClicked() {
        getUserWeight();
        let genderAverageWeight;
        if (user.sex == 'male') {
            genderAverageWeight = kAverageMaleWeight;
        } else {
            genderAverageWeight = kAverageFemaleWeight;
        }

        averageGenderMassInsert.forEach( function(element, index) {
            element.textContent = genderAverageWeight;
        });

        let overUnder;

        if (user.weight > genderAverageWeight) {
            overUnder = 'over';
        } else if ((user.weight < genderAverageWeight)) {
            overUnder = 'under';
        } else {
            overUnder = 'right at';
        }

        overUnderAverageGenderMassInsert.forEach( function(element, index) {
            element.textContent = overUnder;
        });
    }

    function toggleSideNotesForScience() {
        if (scienceUnderDevelopedCore.style.display == "block") {
            scienceUnderDevelopedCore.style.display = "none";
        } else {
            scienceUnderDevelopedCore.style.display = "block";
        }
    }

    function toggleSideNotesForScienceFattyAcidBreakdown() {
        if (fattyAcidBreakdown.style.display == "block") {
            fattyAcidBreakdown.style.display = "none";
        } else {
            fattyAcidBreakdown.style.display = "block";
        }
    }

    function toggleSideNotesForScienceFatCellDetail() {
        if (fatCellDetails.style.display == "block") {
            fatCellDetails.style.display = "none";
        } else {
            fatCellDetails.style.display = "block";
        }
    }

    function toggleSideNotesForScienceSpotReduceDetails() {
        if (spotReduceDetails.style.display == "block") {
            spotReduceDetails.style.display = "none";
        } else {
            spotReduceDetails.style.display = "block";
        }
    }

    function toggleSideNotesForScienceShowWeightDoesntMatterDetails() {
        if (weightDoesntMatterDetails.style.display == "block") {
            weightDoesntMatterDetails.style.display = "none";
        } else {
            weightDoesntMatterDetails.style.display = "block";
        }
    }

    function toggleSideNotesForScienceShowPoundMassPoundForceDetails() {
        if (poundMassPoundForceDetails.style.display == "block") {
            poundMassPoundForceDetails.style.display = "none";
        } else {
            poundMassPoundForceDetails.style.display = "block";
        }
    }

    function clearNameBox() {
        nameInputBox.value = '';
    }

    function userPickedCaloriesSwitch(){
        userDidSetDailyCalories = true;
    }

    function userPickedBodyFatPercentageGoal(){
        userDidSetBodyFatPercentageGoal = true;
    }

    function getAbPlan() {
        if (userDidSetBodyFatPercentageGoal == true) {
            user.bodyFatPercentageGoal = bfGoalInputBox.value;
        }
        mainCalc();
    }

    let name;
    let userManuallyPickedDeficit = false;

    const selectedGenderInsert = document.getElementsByName('selectedGenderInsert');

    const nameInputBox = document.getElementById('nameInputBox');
    if (nameInputBox != null) {
        nameInputBox.addEventListener('focus', clearNameBox)
    }
    const nameButton = document.getElementById('nameButton');
    if (nameButton != null) {
        nameButton.addEventListener('click', customizeEssayWithName);
    }
    const userNameInsert = document.getElementsByName('userNameInsert');

    const genderGoalBodyFatPercentageInsert = document.getElementsByName('genderGoalBodyFatPercentageInsert');

    const enterWeightButton = document.getElementById('enterWeightButton');
    if (enterWeightButton != null) {
        enterWeightButton.addEventListener('click', weightButtonClicked);
    }

    const averageGenderMassInsert = document.getElementsByName('averageGenderMassInsert');
    const overUnderAverageGenderMassInsert = document.getElementsByName('overUnderAverageGenderMassInsert');

    const showScienceUnderDevelopedCore = document.getElementById('showScienceUnderDevelopedCore');
    const scienceUnderDevelopedCore = document.getElementById('scienceUnderDevelopedCore');
    if (showScienceUnderDevelopedCore != null) {
            showScienceUnderDevelopedCore.addEventListener('click', toggleSideNotesForScience);
    }

    const showFattyAcidBreakdown = document.getElementById('showFattyAcidBreakdown');
    if (showFattyAcidBreakdown != null) {
            showFattyAcidBreakdown.addEventListener('click', toggleSideNotesForScienceFattyAcidBreakdown);
    }
    const fattyAcidBreakdown = document.getElementById('fattyAcidBreakdown');

    const showFatCellDetails = document.getElementById('showFatCellDetails');
    if (showFatCellDetails != null) {
            showFatCellDetails.addEventListener('click', toggleSideNotesForScienceFatCellDetail);
    }
    const fatCellDetails = document.getElementById('fatCellDetails');

    const showSpotReduceDetails = document.getElementById('showSpotReduceDetails');
    if (showSpotReduceDetails != null) {
            showSpotReduceDetails.addEventListener('click', toggleSideNotesForScienceSpotReduceDetails);
    }
    const spotReduceDetails = document.getElementById('spotReduceDetails');

    const showWeightDoesntMatterDetails = document.getElementById('showWeightDoesntMatterDetails');
    if (showWeightDoesntMatterDetails != null) {
            showWeightDoesntMatterDetails.addEventListener('click', toggleSideNotesForScienceShowWeightDoesntMatterDetails);
    }
    const weightDoesntMatterDetails = document.getElementById('weightDoesntMatterDetails');

    const showPoundMassPoundForceDetails = document.getElementById('showPoundMassPoundForceDetails');
    if (showPoundMassPoundForceDetails != null) {
            showPoundMassPoundForceDetails.addEventListener('click', toggleSideNotesForScienceShowPoundMassPoundForceDetails);
    }
    const poundMassPoundForceDetails = document.getElementById('poundMassPoundForceDetails');

    const doYouKnowBodyFatQuestionAnswers = document.getElementsByName('bodyFatKnowledge');//return 'array like' list. All the checkboxes. Careful. 
    if (doYouKnowBodyFatQuestionAnswers != null) {
        doYouKnowBodyFatQuestionAnswers.forEach( function(element, index) {
        element.addEventListener('change', toggleEstimates);
    });
    };

    let genderBfGoalFrom100;


    const calcButton = document.querySelector('.calcButton');
    const calcStartingPointButton = document.getElementById('calcStartingPointButton');

    if (calcStartingPointButton != null) {
        calcStartingPointButton.addEventListener('click', calcBodyFatLevels);
    }

    const reCalcButton = document.getElementById('reCalcButton');

    const calcTimeToGoalButton = document.getElementById('calcTimeToGoalButton');
    reCalcButton.addEventListener('click', calcDaysToGoalBf);

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
    const bfGoalMale = .10;
    const bfGoalFemale = .20;
    let calcGoalPercentModifier;
    const calcGoalPercentModifierFemale = .2658;
    const calcGoalPercentModifierMale = .1111111111;

    const tempGenderOptimalBfGoal = document.getElementsByClassName('genderOptimalBfGoal');
    const genderOptimalBfGoal = Array.from(tempGenderOptimalBfGoal);

    const tempmaleExampleImageLinks = document.getElementsByClassName('maleExampleImageLinks');
    const maleExampleImageLinks = Array.from(tempmaleExampleImageLinks);

    const tempfemaleExampleImageLinks = document.getElementsByClassName('femaleExampleImageLinks');
    const femaleExampleImageLinks = Array.from(tempfemaleExampleImageLinks);


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
    const bmrAnswer = document.getElementsByName('bmrAnswer');



    let bmrResult;

    let bmrWithActivity;

    let tdee = document.getElementsByName('tdee');

    //could turn this into a function getArrayOfElementsByClassName
    const activityListElements = document.getElementsByClassName('activity');
    const activityList = Array.from(activityListElements);
    activityList.forEach( function(element, index) {
    	element,addEventListener('change', activeMultipler);
    });

    const goalBodyFatPercentageInsert = document.getElementsByName('goalBodyFatPercentageInsert');

    const weightInsert = document.getElementsByName('weightInsert');
    const bfInsert = document.getElementsByName('bfInsert');
    const leanInsert = document.getElementsByName('leanInsert');
    const fatInsert = document.getElementsByName('fatInsert');
    const loseInsert = document.getElementsByName('loseInsert');
    const newFatInsert = document.getElementsByName('newFatInsert');
    const newTotalBodyWeightInsert = document.getElementsByName('newTotalBodyWeightInsert');
    
    
    let leanResults;
    let weightValue;
    let percentValue;
    let LbsBfResults;
    let GoalFatResults;
    let GoalTotalBodyWeight;
    let LbsToLoseToGoal;

    let caloricDeficitValue; 
    let totalCaloriesUntilBfGoal;
    let numberOfDaysTilGoal;
    let numberOfWeeksTilGoal;
    let numberOfMonthsTilGoal;
    const numberOfDaysTilGoalInsert = document.getElementsByName('numberOfDaysTilGoalInsert');
    
    const numberOfWeeksTilGoalInsert = document.getElementsByName('numberOfWeeksTilGoalInsert');
    

    const numberOfMonthsTilGoalInsert = document.getElementById('numberOfMonthsTilGoalInsert');

    const caloricBudgetInput =  document.getElementById('caloricBudgetInput');
    caloricBudgetInput.addEventListener('focusin',userPickedCaloriesSwitch);

    let caloriesADay;

	calcButton.addEventListener('click', mainCalc);

	reCalcButton.addEventListener('click', reCalc);
    calcBmrButton.addEventListener('click', calcBmr);

    const kAverageMaleWeight = 197;
    const kAverageMaleHeightInches = 69.0;
    const kAverageMaleWaistInches = 40.3;
    const kAverageMaleBodyFatPercentage = 28;

    const kAverageFemaleWeight = 170;
    const kAverageFemaleHeight = 63.6;
    const kAverageFemaleWaistInches = 38.7;
    const kAverageFemaleBodyFatPercentage = 41;

    const maleSValue = 5;
    const femaleSValue = -161; //where s is +5 for males and -161 for females.

    const firstDayOfSummer = new Date("06/20/2020");
    let todaysDate = new Date();

    const daysTillSummer = document.getElementById('daysTillSummerInsert');

    let gramsProteinNeeded;
    const gramsProteinInsert = document.getElementsByName('gramsProteinInsert');

    const percentDeficitInsert = document.getElementById('percentDeficitInsert');
    let calculatedPercentDeficit;

    const dateFromCalculatedDaysAway = document.getElementById('dateFromCalculatedDaysAway');
    let calculatedDateFromCalculatedDaysAway;

    const calorieBudgetInsert = document.getElementsByName('calorieBudgetInsert');
    const userPickedDeficitInsert = document.getElementsByName('userPickedDeficitInsert');

    const maxCaloricDeficitInsert = document.getElementsByName('maxCaloricDeficitInsert');

    const calsFromProteinInsert = document.getElementsByName('calsFromProteinInsert');
    let calsFromProtein;

    const calsFromCarbsAndFatAtMaxCaloricDeficitInsert = document.getElementsByName('calsFromCarbsAndFatAtMaxCaloricDeficitInsert');
    let calsFromCarbsAndFatAtMaxCaloricDeficit;

    const dailyCaloriesAtMaxInsert = document.getElementsByName('dailyCaloriesAtMaxInsert');

    const bfGoalInputBox = document.getElementById('bfGoalInputBox');
    bfGoalInputBox.addEventListener('focusin',userPickedBodyFatPercentageGoal);


    let userBfGoal;

    const estimateBodyFatSection = document.getElementById('estimateBodyFat');
    estimateBodyFatSection.style.display = "block";
    const estimateBodyFatLevelDescriptions = document.getElementById('estimateBodyFatLevelDescriptions');

    const buttonToggleActivityLevelSection = document.getElementById('buttonToggleActivityLevelSection');
    buttonToggleActivityLevelSection.addEventListener('click', toggleActivityLevelSection);
    const activityLevelSection = document.getElementById('activityLevelSection');

    const getAbPlanButton = document.getElementById('getAbPlanButton');
    getAbPlanButton.addEventListener('click', getAbPlan);

    const tdeeDeficitExampleInsert = document.getElementsByName('tdeeDeficitExampleInsert');
    const tdeeDeficitExampleResultInsert = document.getElementsByName('tdeeDeficitExampleResultInsert');

    const caloriesToUseUp = document.getElementsByName('caloriesToUseUp');

    const theoreticalCalorieIntakeInsert = document.getElementsByName('theoreticalCalorieIntakeInsert');

    const twentyFivePercentCalorieDeficitInsert = document.getElementsByName('twentyFivePercentCalorieDeficitInsert');

    let recommendedDailyCalories;
    let userSelectedDailyCalories;

    let userDidSetDailyCalories = false;
    let userDidSetBodyFatPercentageGoal = false;

    bootup();

//<script src="countUp.js"></script>    
//todo
//1. Figure out Object. 
//2. Figure out how to display a list of objects.
//3. Do the proper calculations for the objects.

} //end calculateUserBodyFat



