document.addEventListener("DOMContentLoaded", startUpTheCalculator);

//todo - refactor to have each function separate, not nested in one giant function.
function startUpTheCalculator() {
    
    let testing = false;

    let user = new Object;
        // user.name
        // user.bodyFatPercentage
        // user.weightInPounds
        // user.weightInKilograms
        // user.WeightComparedToNationalAverage
        // user.leanBodyMass
        // user.fatBodyMass
        // user.bodyFatPercentageGoal
        // user.heightFeet
        // user.heightInches
        // user.heightInOnlyInches 
        // user.heightInCentimeters
        // user.BMR
        // user.TDEE
        // user.activityLevel
        // user.selectedActivityLevelNumericValue
        // user.caloricDeficit
        // user.selectedDailyCalories
        // user.setOwnBodyFatGoal
        // user.numberOfDaysTilGoal
        // user.sex
        // user.selectedSexSValue
        // user.gramsProteinNeeded

    function bootup() {
        //functions that only run once
        generateBodyFatEstimatingText();
        calcDaysTilSummer();
        updatePageWithNumberOfDaysUntilSummer();

        //functions the can run more than once
        getUserName();
        getUserGender();
        setUpForSelectedGender();

        getUserWeight();
        getUserHeight();
        
        getUserBodyFatPercentage();
        getBodyFatPercentageGoal();
        getUserAge();
        getUserActivityLevel();
        getUserCalorieIntake();
        updatePageWithUserCalorieIntake();
  
        calcCurrentBodyFatMassAndLeanMass();

        updatePageWithUserWeight();
        updatePageWithBodyFatMass();
        updatePageWithBodyFatPercentage();
        updatePageWithLeanBodyMass();
        calcCaloricDeficitValue();
        console.log('Player 1 ready');
    }

    function mainCalc() {
        getUserGender();
        getUserWeight();
        getUserHeight();

        getUserBodyFatPercentage();
        getBodyFatPercentageGoal();

        getUserAge();
        getUserActivityLevel();
        getUserCalorieIntake();
        updatePageWithUserCalorieIntake();

        calcCurrentBodyFatMassAndLeanMass();

        updatePageWithUserWeight();
        updatePageWithBodyFatMass();
        updatePageWithBodyFatPercentage();
        updatePageWithLeanBodyMass();

    	calcCurrentBodyFatMassAndLeanMass();
    	calcGoalForNewBodyFatMassAndToTalBodyWeight();

        
	    calcBmr();
        updatePageWithBMR();
	    calcTDEE();
        updatePageWithTDEE();
        calcCaloricDeficitValue();

        calcDaysToGoalBf();
        updatePageWithUserPickedDeficit();
	    calcPercentDeficit();
        calcMaxCaloricDeficit();
	    calcProteinNeed();
        updatePageWithProteinNeed();
        calcCalsFromProtein();
        calcCalsFromCarbsAndFatAtMaxDeficit();
        calcTwentyFivePercentDeficit();
        setDailyCaloriesInputField();
        generateProgressTable();
    }

    function getUserGender(){
        sex.forEach( function(element, index) {
            let evaluatedSexOption = element;
            if (evaluatedSexOption.checked == true) {
                user.sex = evaluatedSexOption.value;
            } // end of if
        }); //end of sex.forEach
    }

    function setUpForSelectedGender(){
        let genderBodyFatEstimationArray;

        if (user.sex == "female") {
            genderBfGoalFrom100 = bfGoalFemale*100;
            user.selectedSexSValue = femaleSValue; //Mifflin St Jeor female value
            bfPercentageGoalByGender = bfGoalFemale; //society standard goal
            calcGoalPercentModifier = calcGoalPercentModifierFemale; //equation constant
            genderBodyFatEstimationArray = femaleEstimateTextArray; //female estimate body fat text

            maleExampleImageLinks.forEach( function(element, index) {
                element.style.display = "none";// hide male
            });
            femaleExampleImageLinks.forEach( function(element, index) {
                element.style.display = "block";// show female
            });
        } else { //user.sex == "male"
            genderBfGoalFrom100 = bfGoalMale*100
            user.selectedSexSValue = maleSValue //Mifflin St Jeor male value
            bfPercentageGoalByGender = bfGoalMale; //society standard goal
            calcGoalPercentModifier = calcGoalPercentModifierMale; //equation constant
            genderBodyFatEstimationArray = maleEstimateTextArray; //male estimate body fat text

            maleExampleImageLinks.forEach( function(element, index) {
                element.style.display = "block";// show male
            });
            femaleExampleImageLinks.forEach( function(element, index) {
                element.style.display = "none";// hide female
            });
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

        genderOptimalBfGoal.forEach( function(element, index) {
            element.textContent = genderBfGoalFrom100;
        });

        selectedGenderInsert.forEach( function(element, index) {
            element.textContent = user.sex;
        });

        updatePageWithStandardGenderBodyFatPercentageGoal();

        //set the body fat goal input box to the gender suggestion
        if (userDidSetBodyFatPercentageGoal === false) {
            bfGoalInputBox.value = genderBfGoalFrom100;
        }
    }

    function genderPicked(){
        getUserGender();
        setUpForSelectedGender();
    }

    function getUserWeight(){
        user.weightInPounds = weightInputBox2.value;
        user.weightInKilograms = convertPoundsToKilograms(user.weightInPounds);
    }

    function updatePageWithUserWeight(){
        weightInsert.forEach( function(element, index) {
            element.textContent = user.weightInPounds;
        });
    }

    function getUserBodyFatPercentage(){
        if (user != null) {
            user.bodyFatPercentage = percentInputBox2.value;
        }
    }

    function getBodyFatPercentageGoal(){
        user.bodyFatPercentageGoal = bfGoalInputBox.value; 
    }

    function setBodyFatPercentage(){
        getUserBodyFatPercentage();//get the updated body fat %
        calcCurrentBodyFatMassAndLeanMass();

        updatePageWithUserWeight();
        updatePageWithBodyFatMass();
        updatePageWithBodyFatPercentage();
        updatePageWithLeanBodyMass();
    }

    function calcCurrentBodyFatMassAndLeanMass() {
        user.fatBodyMass = (user.weightInPounds * (user.bodyFatPercentage /100)); //lbs bf results
        user.fatBodyMass = roundNumPlace(user.fatBodyMass,1);

        user.leanBodyMass = user.weightInPounds - user.fatBodyMass;
        user.leanBodyMass = roundNumPlace(user.leanBodyMass,1);
    }

    function updatePageWithBodyFatPercentage(){
        bfInsert.forEach( function(element, index) {
            element.textContent = user.bodyFatPercentage;
        });
    }

    function updatePageWithBodyFatMass(){
        fatInsert.forEach( function(element, index) {
            element.textContent = user.fatBodyMass;
        });
    }

    function getUserCalorieIntake(){
        user.selectedDailyCalories = parseInt(caloricBudgetInput.value);
    }

    function calcCaloricDeficitValue(){
        user.caloricDeficit = user.TDEE - user.selectedDailyCalories; 
        user.caloricDeficit = roundNumPlace(user.caloricDeficit,1);
    }

    function updatePageWithUserCalorieIntake(){
        calorieBudgetInsert.forEach( function(element, index) {
            element.textContent  = user.selectedDailyCalories;
        });
    }

    function setDailyCaloriesInputField(){
        if (userDidSetDailyCalories == false) {
            caloricBudgetInput.value = recommendedDailyCalories;
        }
    }

    function getUserName(){
        if (nameInputBox != null) {
            user.name = nameInputBox.value;
        }
    }

    function updatePageWithUserName(){
        userNameInsert.forEach( function(element, index) {
            element.textContent = user.name;
        });
    }

    function userSetTheirName(){
        getUserName();
        updatePageWithUserName();
    }

    function getUserAge(){
        user.age = age.value;
    }

    function getUserActivityLevel(){
        activityList.forEach( function(element, index) {
            let evaluatedActivityOption = element;
            if (evaluatedActivityOption.checked == true) {
                user.activityLevel = evaluatedActivityOption.value;
            }
        }); //end of activityList.forEach
        setUserActivityLevelNumeric();
    }

    function setUserActivityLevelNumeric(){
        if (user.activityLevel == "sedentary") {
            user.selectedActivityLevelNumericValue = sedentaryValueConstant;
        } else if (user.activityLevel == "light") {
            user.selectedActivityLevelNumericValue = lightActivityValueConstant;
        } else if (user.activityLevel == "moderate") {
            user.selectedActivityLevelNumericValue = moderateActivityValueConstant;
        } else if (user.activityLevel == "veryactive") {
            user.selectedActivityLevelNumericValue = veryActiveValueConstant;
        } else if (user.activityLevel == "extremely") {
            user.selectedActivityLevelNumericValue = extremelyActiveValueConstant;
        }
    }

    function getUserHeight(){
        user.heightFeet = feet.value;
        user.heightInches = inches.value;
        convertUserHeightToCentimeters(user.heightFeet,user.heightInches);
    }

    function convertUserHeightToCentimeters(feet, inches) {
        user.heightInOnlyInches = convertFeetAndInchesToTotalInches(feet,inches);
        user.heightInCentimeters = convertInchesToCentimeters(user.heightInOnlyInches);
    }

    function calcBmrButtonClicked(){
        getUserAge();
        calcGoalForNewBodyFatMassAndToTalBodyWeight();
        calcDaysToGoalBf();
        calcBmr();
        updatePageWithBMR();
    }

    function calcBmr(){
    	//BMR (kcal / day) = 10 * weight (kg) + 6.25 * height (cm) – 5 * age (y) + s (kcal / day)
        //testing data 200 pounds to kg = 90.7185, 68 inches to cm = 172.72
    	let unRoundedBmrResult = (10 * user.weightInKilograms) + (6.25 * user.heightInCentimeters) - (5 * user.age) + user.selectedSexSValue;
    	user.BMR = Math.round (unRoundedBmrResult * 10) / 10;
        //BMR result for 200 pounds and 68 inches is = 1826.68
    }

    function calcBmrAtWeight(weightInKilograms){
        //BMR (kcal / day) = 10 * weight (kg) + 6.25 * height (cm) – 5 * age (y) + s (kcal / day)
        //testing data 200 pounds to kg = 90.7185, 68 inches to cm = 172.72
        let BMRAtWeight;
        let unRoundedBmrResult = (10 * weightInKilograms) + (6.25 * user.heightInCentimeters) - (5 * user.age) + user.selectedSexSValue;
        BMRAtWeight = Math.round (unRoundedBmrResult * 10) / 10;
        return BMRAtWeight;
        //BMR result for 200 pounds and 68 inches is = 1826.68
    }

    function updatePageWithBMR(){
        bmrAnswer.forEach( function(element, index) {
            element.textContent = user.BMR;
        });
    }


    function userSetActiveMultipler(){
        getUserActivityLevel();
        calcTDEE();
        updatePageWithTDEE();
    }

    function calcTDEE(){
    	let unRoundedBmrWithActivity = user.BMR * user.selectedActivityLevelNumericValue;
        user.TDEE = roundNumPlace(unRoundedBmrWithActivity,1);

        calcTwentyFivePercentDeficit();

    	updatePageWithUserPickedDeficit();

        calcCaloricDeficitValue();
    }

    function updatePageWithUserPickedDeficit(){
        userPickedDeficitInsert.forEach( function(element, index) {
            element.textContent  = user.caloricDeficit;
        });
    }

    function updatePageWithTDEE(){
        tdee.forEach( function(element, index) {
            element.textContent  = user.TDEE;
        });
    }

    function calcTwentyFivePercentDeficit(){
        twentyFivePercentDeficit = user.TDEE - (user.TDEE*.25);
        twentyFivePercentDeficit = roundNumPlace(twentyFivePercentDeficit,1);

        recommendedDailyCalories = twentyFivePercentDeficit;
        setDailyCaloriesInputField();

        twentyFivePercentCalorieDeficitOnly = user.TDEE*.25;
        twentyFivePercentCalorieDeficitOnly = roundNumPlace(twentyFivePercentCalorieDeficitOnly,1);

        twentyFivePercentCalorieDeficitInsert.forEach( function(element, index) {
            element.textContent  = twentyFivePercentCalorieDeficitOnly;
        });

        theoreticalCalorieIntakeInsert.forEach( function(element, index) {
            element.textContent  = twentyFivePercentDeficit;
        });
    }

    function updatePageWithStandardGenderBodyFatPercentageGoal(){
        genderGoalBodyFatPercentageInsert.forEach( function(element, index) {
            element.textContent = genderBfGoalFrom100;
        }); 
    }

    function updatePageWithUserBodyFatPercentageGoal(){
        goalBodyFatPercentageInsert.forEach( function(element, index) {
            element.textContent = user.bodyFatPercentageGoal;
        }); 
    }

    function updatePageWithUserCurrentBodyFatPercentage(){
        bfInsert.forEach( function(element, index) {
            element.textContent = user.bodyFatPercentage;
        });
    }

    function updatePageWithPoundsToLoseToGoalBodyFatMass(){
        loseInsert.forEach( function(element, index) {
            element.textContent = user.LbsToLoseToGoal;
        });
    }

    function updatePageWithUserGoalForPoundsOfBodyFat(){
        newFatInsert.forEach( function(element, index) {
            element.textContent = user.GoalForPoundsOfBodyFat;
        });
    }

    function updatePageWithUserGoalForTotalBodyWeight(){
        newTotalBodyWeightInsert.forEach( function(element, index) {
            element.textContent = user.GoalTotalBodyWeight;
        });
    }

    function calcGoalForNewBodyFatMassAndToTalBodyWeight(){
    	userGoalPercentModifer = user.bodyFatPercentageGoal/(100 - user.bodyFatPercentageGoal);

    	user.GoalForPoundsOfBodyFat = userGoalPercentModifer * user.leanBodyMass;
        user.GoalForPoundsOfBodyFat = roundNumPlace(user.GoalForPoundsOfBodyFat,2);

    	user.GoalTotalBodyWeight = user.GoalForPoundsOfBodyFat + user.leanBodyMass;
        user.GoalTotalBodyWeight = roundNumPlace(user.GoalTotalBodyWeight,2);

    	user.LbsToLoseToGoal = user.fatBodyMass - user.GoalForPoundsOfBodyFat; 
        user.LbsToLoseToGoal = roundNumPlace(user.LbsToLoseToGoal,1);

        updatePageWithUserBodyFatPercentageGoal();

    	updatePageWithUserWeight();

        updatePageWithUserCurrentBodyFatPercentage();

        updatePageWithLeanBodyMass();

        updatePageWithBodyFatMass();

        updatePageWithPoundsToLoseToGoalBodyFatMass();

        updatePageWithUserGoalForPoundsOfBodyFat();

        updatePageWithUserGoalForTotalBodyWeight();
    }

    function updatePageWithLeanBodyMass(){
        leanInsert.forEach( function(element, index) {
            element.textContent = user.leanBodyMass;
        });
    }


    function calcProteinNeed(){
    	user.gramsProteinNeeded = roundNumPlace((user.weightInPounds * gramsProteinPerPoundRecommended),1);
    } // end calcProteinNeed

    function updatePageWithProteinNeed(){
        gramsProteinInsert.forEach( function(element, index) {
            element.textContent = user.gramsProteinNeeded;
        });
    }

    function calcDaysToGoalBf() {
		totalCaloriesUntilBfGoal = user.LbsToLoseToGoal * 3500;
        totalCaloriesUntilBfGoal = roundNumPlace(totalCaloriesUntilBfGoal,1);

        caloriesToUseUp.forEach( function(element, index) {
            element.textContent = totalCaloriesUntilBfGoal;
        });

		user.numberOfDaysTilGoal = totalCaloriesUntilBfGoal / user.caloricDeficit;
        user.numberOfDaysTilGoal = roundNumPlace(user.numberOfDaysTilGoal,1);
    	numberOfDaysTilGoalInsert.forEach( function(element, index) {
    		element.textContent  = user.numberOfDaysTilGoal;
    	});

		numberOfWeeksTilGoal = user.numberOfDaysTilGoal / 7;
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
		goalEndDate.setDate(today.getDate() + user.numberOfDaysTilGoal);

        let goalEndDateFormatted = formatDate(goalEndDate);
		// let dd = goalEndDate.getDate();
		// let mm = goalEndDate.getMonth() + 1; //javascript is weird. 
		// let yyyy = goalEndDate.getFullYear();

		// let goalEndDateFormatted = mm + '/' + dd + '/' + yyyy;
		dateFromCalculatedDaysAway.textContent = goalEndDateFormatted;

    } //end function calcDaysToGoalBf

    function calcPercentDeficit() {
    	unroundedCalculatedPercentDeficit = user.caloricDeficit / user.TDEE;
        calculatedPercentDeficit = (Math.round (unroundedCalculatedPercentDeficit * 100) / 100)*100;
    	percentDeficitInsert.textContent = calculatedPercentDeficit;
        calcDeficitExample();
    }

    function generateProgressTable() {
        let generatedTable = document.createElement('table');
        generatedTable.id = "progressTable";

        let exampleData = ["Day", "Date", "Body Fat %", "Fat Mass", "Lean Mass", "Weight", 0, todaysDate.toLocaleDateString("en-US"), user.bodyFatPercentage, user.fatBodyMass, user.leanBodyMass, user.weightInPounds];
        //todo make this a proper table header
        let progressData = ["Day", "Date", "Body Fat %", "Fat Mass", "Lean Mass", "Weight", "Pounds Lost"];

        for (var i = user.numberOfDaysTilGoal; i >= 0; i--) {
            let xDays = user.numberOfDaysTilGoal - i; //start at 0.
            let weightOnXDay = user.weightInPounds - (xDays*(((user.TDEE-user.selectedDailyCalories))/caloriesPerPound));
            weightOnXDay = roundNumPlace(weightOnXDay,1);

            //xDays
            let dateOnDay = new Date();
            dateOnDay.setDate(dateOnDay.getDate() + xDays);

            let bodyFatPercentageOnDay = roundNumPlace((((weightOnXDay - user.leanBodyMass)/weightOnXDay)*100),2);
            let fatMassOnDay = roundNumPlace((weightOnXDay - user.leanBodyMass),1);
            let leanMassOnDay = roundNumPlace(user.leanBodyMass,1); //doesn't change right now
            let poundsLostSoFar = roundNumPlace((user.weightInPounds - weightOnXDay),2);
            //weightOnXDay

            progressData.push(xDays);
            progressData.push(dateOnDay.toLocaleDateString("en-US"));
            progressData.push(bodyFatPercentageOnDay);
            progressData.push(fatMassOnDay);
            progressData.push(leanMassOnDay);
            progressData.push(weightOnXDay);
            progressData.push(poundsLostSoFar);
        }

        // (B) CREATE HTML TABLE OBJECT
        let perrow = 7, // CELLS PER ROW
        row = generatedTable.insertRow();

        // LOOP THROUGH ARRAY AND ADD TABLE CELLS
        for (var i = 0; i < progressData.length; i++) {
            // ADD "BASIC" CELL
            var cell = row.insertCell();
            cell.innerHTML = progressData[i];

            /* ATTACH ONCLICK LISTENER IF REQUIRED
            cell.addEventListener("click", function(){
              console.log(this.dataset.id); 
            });
            */

            // BREAK INTO NEXT ROW
            var next = i + 1;
            if (next%perrow==0 && next!=progressData.length) {
              row = generatedTable.insertRow();
            }
        }

        const body = document.body;
        body.appendChild(generatedTable);

        let progressTable = document.getElementById('progressTable');
        progressTable.replaceWith(generatedTable);
        console.log('the table of power has been created!');
    }

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

    function calcCalsFromProtein(){
        calsFromProtein = gramsProteinNeeded * 4;
        calsFromProtein = roundNumPlace(calsFromProtein,1);

        calsFromProteinInsert.forEach( function(element, index) {
            element.textContent = calsFromProtein;
        });
    }

    function calcCalsFromCarbsAndFatAtMaxDeficit(){
        let dailyCalsAtMax = user.TDEE - maxCaloricDeficit;
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
        let tdeeDeficitExample = (user.TDEE * .25);
        tdeeDeficitExample = roundNumPlace(tdeeDeficitExample,1);

        let tdeeDeficitExampleResult = user.TDEE - tdeeDeficitExample;
        tdeeDeficitExampleResult = roundNumPlace(tdeeDeficitExampleResult,1);

        tdeeDeficitExampleInsert.forEach( function(element, index) {
            element.textContent = tdeeDeficitExample;
        });

        tdeeDeficitExampleResultInsert.forEach( function(element, index) {
            element.textContent = tdeeDeficitExampleResult;
        });
    }

    function userClickedSetWeightButton() {
        console.log('userClickedSetWeightButton, getting user weight, then updating page with user weight');
        getUserWeight();
        // checkUserWeightAgainstNationalAverage(); //check and insert results
        updatePageWithUserWeight();
    }

    function checkUserWeightAgainstNationalAverage() {
        let genderAverageWeight;
        if (user.sex == 'male') {
            genderAverageWeight = kAverageMaleWeight;
        } else {
            genderAverageWeight = kAverageFemaleWeight;
        }

        averageGenderMassInsert.forEach( function(element, index) {
            element.textContent = genderAverageWeight;
        });

        if (user.weightInPounds > genderAverageWeight) {
            user.WeightComparedToNationalAverage = 'over';
        } else if ((user.weightInPounds < genderAverageWeight)) {
            user.WeightComparedToNationalAverage = 'under';
        } else {
            user.WeightComparedToNationalAverage = 'right at';
        }

        overUnderAverageGenderMassInsert.forEach( function(element, index) {
            element.textContent = user.WeightComparedToNationalAverage;
        });
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

    // #Math Functions
    function roundNumPlace(num, places) {
        return +(Math.round(num + "e+" + places)  + "e-" + places);
    }

    function convertPoundsToKilograms(pounds) {
        return (pounds * 0.45359237);
    }

    function convertFeetAndInchesToTotalInches(feetValue,inchesValue) {
        return ((feetValue*12)+(parseFloat(inchesValue*1)));
    }

    function convertInchesToCentimeters(totalInches) {
        return (parseFloat(totalInches)*2.54);
    }

    function formatDate(date,separationCharacter){
        let dd = date.getDate();
        let mm = date.getMonth() + 1; //javascript is weird. 
        let yyyy = date.getFullYear();

        let goalEndDateFormatted = mm + separationCharacter + dd + separationCharacter + yyyy;
        return goalEndDateFormatted;
    }

    // #Essay Functions
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

    // #Summer Bod Functions
    function calcDaysTilSummer(){
        //calc first day of summer based on if it is after 6/20 of each year
        let firstDayOfSummer;
        let firstDayOfSummerString;

        let currentYear = todaysDate.getFullYear();
        let currentMonth = todaysDate.getMonth() + 1;//javascript returns 0 index so plus 1
        let currentDay = todaysDate.getDate();

        if (currentMonth <= 6) {
            if (currentDay < 20) {
                //make a string from numbers 6/20/ currentYear
                firstDayOfSummerString = "06/20/" + currentYear.toString();
                firstDayOfSummer = new Date(firstDayOfSummerString);
            } else {
                //make string from numbers 6/20/(currentYear+1)
                firstDayOfSummerString = "06/20/" + (currentYear+1).toString();
                firstDayOfSummer = new Date(firstDayOfSummerString);
            }
        } else {
            //make string from numbers 6/20/(currentYear+1)
            firstDayOfSummerString = "06/20/" + (currentYear+1).toString();
            firstDayOfSummer = new Date(firstDayOfSummerString);
        }

        //it will be in miliseconds. So have to convert to days. 
        numberOfDaysBetweenNowAndSummer = (firstDayOfSummer.getTime() - todaysDate.getTime())/(1000 * 3600 * 24);

        numberOfDaysBetweenNowAndSummer = (roundNumPlace(numberOfDaysBetweenNowAndSummer,1) + 1);
    }

    function updatePageWithNumberOfDaysUntilSummer(){
        if (daysTillSummer != null) {
            daysTillSummer.textContent = numberOfDaysBetweenNowAndSummer;
        }
    }

    // #Set Up
    let maleEstimateTextArray;
    let femaleEstimateTextArray;

    function generateBodyFatEstimatingText(){
        let fourtyPercent = "40% body fat: Significant fat accumulation in the stomach and waist region. Basic daily activities like walking up stairs or bending over to pick something up are difficult. This body fat percentage is considered morbidly obese.";
        let thirtyfivePercent = "35% body fat: This percentage of body fat is more of the beer gut look. The waist circumference at this point can be about 40+ inches."
        let thirtyPercent = "30% body fat: Fat is present all around the body including waist, back, thighs, and calves. The waist will appear slightly larger relative to the hips, and the stomach will most likely be protruding noticeably over the waist."
        let twentyfivePercent = "25% body fat: This is the start of average territory, but 25% body fat for a man is still considered obese. The waist is creeping over 40 inches, which is considered abdominal obesity. There is almost no separation of muscles, no noticeable veins and no muscle striations. There may be a little neck fat. However, this man may not look like he has 25% body fat in normal clothing.";
        let twentyPercent = "20% body fat: Low end of the average territory. Muscle definition is not as present and noticeable especially in the abdomen. A man with this level of body fat typically has the “soft” look and has a pouch on his abdomen.";
        let fifteenPercent = "15% body fat: This percentage of body fat usually fits into the “lean and fit” category. Outlines of muscle can be seen, but there is not really a clear separation between them. Muscles and veins can slightly be seen, but are covered by a thin layer of fat. However, the overall body shape is present and can be noticed.";
        let tenToTwelvePercent = "10-12% body fat: Very in shape. This is the beach body fat percentage that most people strive for 🏝. Your abs can be clearly seen. At this level is some defined veins in the arms and legs."; 
        let sixToEightPercent = "6-8% body fat: Extremely low levels of body fat. Absolutely chiseled from stone. Think Baywatch or Blade. This level is very difficult to maintain and not easily sustainable. This level is characterized by muscle definition in most muscle groups and some clear showing of your veins (vascularity) in areas such as arms, legs, and abs.";
        let fivePercent = "5% body fat: Ridiculously (dangerously) lean. All muscles, veins, and striations (the rod looking stripes on a muscle) are very visible. This is around the lowest level of body fat a human male can have. You look like an anatomy mannequin.";
        maleEstimateTextArray = [fourtyPercent, thirtyfivePercent, thirtyPercent, twentyfivePercent, twentyPercent, fifteenPercent, tenToTwelvePercent, sixToEightPercent, fivePercent];

        let femaleFiftyPercent = "50% body fat: Significant fat accumulation in all body regions. Basic daily activities like walking up stairs or bending over to pick something up are difficult. This body fat percentage is considered morbidly obese. This skin will appear more dimple or “cottage cheese” like.";
        let femaleFourtyfivePercent = "45% body fat: At this body weight, the hips become noticeably wider than the shoulders. The general hip circumference may reach 45+ inches and waist circumference 35+ inches. The skin may start to lose its smooth nature at this percentage level.";
        let femaleFourty = "40% body fat: At this level a women is considered obese. This means there is not a very balanced muscle to fat ratio. Some women may not look like they have 40% body fat, but their muscle mass is lower, which brings their percentage to 40%.";
        let femaleThirtyfive = "35% body fat: The body has more fat accumulations and the face and neck begin to appear fuller and more round. Belly fat is also more pronounced at this level as well.";
        let femaleThirty = "30% body fat: At this level there is more accumulation of fat in the hips and butt region. 30% body fat is considered a high average for women.";
        let femaleTwentyfive = "25% body fat: This percentage is on the lower end of what is average for women. Abs and other muscles are not as apparent at this level, and there is generally more fat around the hips and buttocks areas."; 
        let femaleTwentyToTwentytwo = "20-22% body fat: This is the beach body fat percentage that most people strive for 🏝. This level is the most common among female athletes. Some definition in the abs.";
        let femaleFifteenToSeventeen = "15-17% body fat: At this level muscles are still visible. Abs, legs, and arms have definition. There is some separation between muscles there is also some vascularity. Women don’t have as much curvature in hips and buttocks because of the low body fat level. This is a common level of body fat among fitness models. Many women who are at this level may not be able to menstruate.";
        let femaleTenToTwelve = "10-12% Body fat: Ridiculously (dangerously) lean. At this percentage the women’s vascularity and some striations are visible. The woman’s muscles are clearly separated. This level of body fat isn’t considered safe or healthy for women who menstruate.";
        femaleEstimateTextArray = [femaleFiftyPercent, femaleFourtyfivePercent, femaleFourty, femaleThirtyfive, femaleThirty, femaleTwentyfive, femaleTwentyToTwentytwo, femaleFifteenToSeventeen, femaleTenToTwelve];
    }

    // #Export to Table
    function exportButtonClicked(){
        // $(".export").on('click', function(event) { - the jQuery way
        console.log('let us export');

        let todaysDateFormatted = new Date();
        todaysDateFormatted = formatDate(todaysDateFormatted, '-');

        let fileName = user.name + " " + todaysDateFormatted + " Abs Plan Progress Table.csv";
    
        //table ID, and file name are passed in
        exportTableToCSV('progressTable', fileName);
    }

    let userManuallyPickedDeficit = false;

    const exportTableButton = document.getElementById('exportTableButton');
    if (exportTableButton != null) {
        exportTableButton.addEventListener('click', exportButtonClicked);
    }

    const selectedGenderInsert = document.getElementsByName('selectedGenderInsert');

    const nameInputBox = document.getElementById('nameInputBox');

    const nameButton = document.getElementById('nameButton');
    if (nameButton != null) {
        nameButton.addEventListener('click', userSetTheirName);
    }
    const userNameInsert = document.getElementsByName('userNameInsert');

    const genderGoalBodyFatPercentageInsert = document.getElementsByName('genderGoalBodyFatPercentageInsert');

    const setWeightButton = document.getElementById('setWeightButton');
    if (setWeightButton != null) {
        setWeightButton.addEventListener('click', userClickedSetWeightButton);
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

    //get all the calculation buttons by class
    const calcButton = document.querySelector('.calcButton');
    calcButton.addEventListener('click', mainCalc);

    const setBodyFatPercentageButton = document.getElementById('setBodyFatPercentageButton');
    if (setBodyFatPercentageButton != null) {
        setBodyFatPercentageButton.addEventListener('click', setBodyFatPercentage);
    }

    //todo why the 2 event listeners?
    const reCalcButton = document.getElementById('reCalcButton');
    reCalcButton.addEventListener('click', calcDaysToGoalBf);
    reCalcButton.addEventListener('click', mainCalc);

    const calcTimeToGoalButton = document.getElementById('calcTimeToGoalButton');

    //remember to use the correct selector! Or just id. 
    const calcBmrButton = document.getElementById('calcBmrButton');
    calcBmrButton.addEventListener('click',calcBmrButtonClicked);

    const weightInputBox2 = document.getElementById('weightInputBox');
    const percentInputBox2 = document.getElementById('percentInputBox');

    let bfPercentageArray = [];
    const bfRunDown = document.getElementById('bfRunDown');
    let displayBfRundownData = "";

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
    const feet = document.getElementById('feet');
    const inches = document.getElementById('inches');
    const bmrAnswer = document.getElementsByName('bmrAnswer');

    let tdee = document.getElementsByName('tdee');

    //could turn this into a function getArrayOfElementsByClassName
    const activityListElements = document.getElementsByClassName('activity');
    const activityList = Array.from(activityListElements);
    activityList.forEach( function(element, index) {
    	element,addEventListener('change', userSetActiveMultipler);
    });

    const goalBodyFatPercentageInsert = document.getElementsByName('goalBodyFatPercentageInsert');

    const weightInsert = document.getElementsByName('weightInsert');
    const bfInsert = document.getElementsByName('bfInsert');
    const leanInsert = document.getElementsByName('leanInsert');
    const fatInsert = document.getElementsByName('fatInsert');
    const loseInsert = document.getElementsByName('loseInsert');
    const newFatInsert = document.getElementsByName('newFatInsert');
    const newTotalBodyWeightInsert = document.getElementsByName('newTotalBodyWeightInsert');

    let totalCaloriesUntilBfGoal;
    let numberOfWeeksTilGoal;
    let numberOfMonthsTilGoal;
    const numberOfDaysTilGoalInsert = document.getElementsByName('numberOfDaysTilGoalInsert');
    const numberOfWeeksTilGoalInsert = document.getElementsByName('numberOfWeeksTilGoalInsert');
    const numberOfMonthsTilGoalInsert = document.getElementById('numberOfMonthsTilGoalInsert');

    const caloricBudgetInput =  document.getElementById('caloricBudgetInput');
    caloricBudgetInput.addEventListener('focusin',userPickedCaloriesSwitch);

    let caloriesADay;

    //The Mifflin St Jeor equation constants
    const maleSValue = 5;
    const femaleSValue = -161; //where s is +5 for males and -161 for females.

    //body fat norms by gender
    let bfPercentageGoalByGender;
    const bfGoalMale = .10;
    const bfGoalFemale = .20;
    let calcGoalPercentModifier;
    const calcGoalPercentModifierFemale = .2658;
    const calcGoalPercentModifierMale = .1111111111;

    //activity modifiers
    const sedentaryValueConstant = 1.15;
    const lightActivityValueConstant = 1.35;
    const moderateActivityValueConstant = 1.55;
    const veryActiveValueConstant = 1.75;
    const extremelyActiveValueConstant = 1.95;

    //grams of protein recommended
    gramsProteinPerPoundRecommended = .82;

    //calories per pound
    const caloriesPerPound = 3500;

    //date stuff
    let todaysDate = new Date();
    let numberOfDaysBetweenNowAndSummer;

    //average weight, height, waist, and body fat %
    const kAverageMaleWeight = 197;
    const kAverageMaleHeightInches = 69.0;
    const kAverageMaleWaistInches = 40.3;
    const kAverageMaleBodyFatPercentage = 28;

    const kAverageFemaleWeight = 170;
    const kAverageFemaleHeight = 63.6;
    const kAverageFemaleWaistInches = 38.7;
    const kAverageFemaleBodyFatPercentage = 41;

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

    let userDidSetDailyCalories = false;
    let userDidSetBodyFatPercentageGoal = false;

    const testResultH3 = document.getElementById('testResultH3');

    if (testing == true) {
        testEverything();
    }
    bootup();

    function testEverything() {
        let testSuccess = false;
        user.name = 'Joshua';
        user.weightInPounds = 200;
        user.bodyFatPercentage = 20;
        user.weightInKilograms = convertPoundsToKilograms(user.weightInPounds);
        user.bodyFatPercentageGoal = 10;
        user.heightFeet = 5;
        user.heightInches = 8;
        user.age = 35;
        user.heightInOnlyInches = convertFeetAndInchesToTotalInches(user.heightFeet,user.heightInches);
        user.heightInCentimeters = convertInchesToCentimeters(user.heightInOnlyInches);
        user.activityLevel = "light";
        setUserActivityLevelNumeric();
        user.selectedDailyCalories = 2000
        user.sex = "male";
        user.selectedSexSValue = 5; //because male

        //run the needed calculations
        console.log('running the tests');

        calcCurrentBodyFatMassAndLeanMass();
        calcGoalForNewBodyFatMassAndToTalBodyWeight();
        calcBmr();
        calcTDEE();
        calcCaloricDeficitValue();
        calcDaysToGoalBf();
        calcPercentDeficit();
        calcMaxCaloricDeficit();
        calcProteinNeed();
        calcCalsFromProtein();
        calcCalsFromCarbsAndFatAtMaxDeficit();
        calcTwentyFivePercentDeficit();

        //check the results
        if (user.numberOfDaysTilGoal == 171.7) {
            testSuccess = true;
        } else {
            testSuccess = false;
        }
        
        //check more results if needed here?
        // if (otherNumber == otherKnownResult) {
        //     testSuccess = true;
        // } else {
        //     testSuccess = false;
        // }

        //show the results
        if (testSuccess == true) {
            testResultH3.style.backgroundColor = "green";
            console.log('tests passed!');
        } else {
            testResultH3.style.backgroundColor = "red";
            console.log('tests failed!');
        }
    }

} //end startUpTheCalculator
//file length Oct 25, 2021 = 950 lines
//file length Oct 27, 2021 = 1027 lines
//file length Nov 3, 2021 = 1166