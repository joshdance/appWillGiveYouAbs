const shepherdGreeting = 'Hello. I am Shepherd.';
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
// user.selectedMassUnitOfMeasurement
// user.selectedMassUnit
// user.totalCaloriesUntilBfGoal

//body fat percentage

//height section
const heightSlider = document.getElementById('heightSlider');
heightSlider.addEventListener('input', heightSliderChanged);

const userHeightInCentimetersInputBox = document.getElementById("userHeightInCentimetersInputBox");

userHeightInCentimetersInputBox.addEventListener('change',metricHeightChanged);

const age = document.getElementById('age');
age.addEventListener('change',BmrInfoEntered);

const feet = document.getElementById('feet');
feet.addEventListener('change',imperialHeightChanged);
const inches = document.getElementById('inches');
inches.addEventListener('change',imperialHeightChanged);

const bmrAnswer = document.getElementsByName('bmrAnswer');

function metricHeightChanged() {
    let newCentimeterValue = userHeightInCentimetersInputBox.value;
    heightSlider.value = newCentimeterValue;
    BmrInfoEntered();
}

function imperialHeightChanged(event) {
    
    //was it feet or inches changed?
    let changedInput = event.target;

    if (changedInput.id == 'feet') {
        //feet were changed

    } else {
        //inches were changed
        if (inches.value > 11) {
            feet.value = parseInt(feet.value) + 1;
            inches.value = 0;
        }

        if (inches.value < 0) {
            feet.value = parseInt(feet.value) - 1;
            inches.value = 11;
        }
    }
    
    let newFeetValue = feet.value;
    let newInchesValue = inches.value;

    let newOnlyInches = convertFeetAndInchesToTotalInches(newFeetValue,newInchesValue);

    let newCentimeterValue = convertInchesToCentimeters(newOnlyInches);
    console.log('user height in centimeters =' + newCentimeterValue);

    userHeightInCentimetersInputBox.value = newCentimeterValue;
    heightSlider.value = newCentimeterValue;
    BmrInfoEntered();
}

function heightSliderChanged() {

    userHeightInCentimeters = heightSlider.value;
    console.log('user height in centimeters =' + userHeightInCentimeters);

    //set centimeter input box
    userHeightInCentimetersInputBox.value = parseInt(heightSlider.value);

    //set imperical input boxes as we convert first
    let userHeightObject = convertCentimetersToFeetAndInches(userHeightInCentimeters);
    feet.value = userHeightObject.feet;
    inches.value = userHeightObject.inches;

    BmrInfoEntered();
}

function convertCentimetersToFeetAndInches(centimeters){
    //quick convert centimeters to inches
    let allInches = (centimeters * 0.393700);

    //convert to the feet
    let feetWithDecimal = allInches / 12;
    let feetWithoutDecimal = Math.floor(feetWithDecimal);

    //get remaining inches
    let inchesDecimal = (feetWithDecimal - feetWithoutDecimal) * 12;
    let inchesConvertedFromDecimal = Math.round(inchesDecimal);
    
    let userHeightObject = {
        feet: feetWithoutDecimal,
        inches: inchesConvertedFromDecimal
    }

    return userHeightObject;
}


let bodyfatExamples = [
    { from:1, to:2, path:'images/malePercentagePictures/1-3.png', textdescription: '1-2% body fat: You are probably dead. Your brain and organs are made of fat and you do not have enough to live. See a doctor. Get help.'},
    { from:3, to:5, path:'images/malePercentagePictures/4-5.png', textdescription: '3-5% body fat: Ridiculously and dangerously lean. All muscles, veins, and striations (the rod looking stripes on a muscle) are very visible. The lowest level of body fat a human male can have, but you look like an anatomy mannequin. Immune system + other body systems may not work.'},
    { from:6, to:8, path:'images/malePercentagePictures/6-7.png', textdescription: '6-8% body fat: Extremely low levels of body fat. Absolutely chiseled from stone. Think Baywatch or Blade. Very difficult to maintain and not easily sustainable. Characterized by muscle definition in most muscle groups and some clear showing of your veins (vascularity) in areas such as arms, legs, and abs.'},
    { from:9, to:12, path:'images/malePercentagePictures/11-12.png', textdescription: '9%-12% body fat: Very in shape. This is the beach body fat percentage that most people envison 🏝. Your abs can be clearly seen. At this level is some defined veins in the arms and legs.'}, 
    { from:13, to:15, path:'images/malePercentagePictures/13-15.png', textdescription: '13%-15% body fat: Fit and lean. Outlines of muscle can be seen, but there is not really a clear separation between them. Muscles and veins can slightly be seen, but are covered by a thin layer of fat. However, the overall body shape is present and can be noticed.'},
    { from:16, to:20, path:'images/malePercentagePictures/16-19.png', textdescription: '16%-20% body fat: Above average territory. Muscle definition is not as present and noticeable especially in the abdomen. A man with this level of body fat typically has the “soft” look and has a pouch on his abdomen.'},
    { from:21, to:25, path:'images/malePercentagePictures/20-24.png', textdescription: '21%-25% body fat: Average for a male, but borderline obese. Waist is creeping over 40 inches, aka abdominal obesity. Almost no separation of muscles, no noticeable veins and no muscle striations. There may be a little neck fat. However, you may not look like you have 25% body fat in normal clothing.'},
    { from:26, to:30, path:'images/malePercentagePictures/25-30.png', textdescription: '26%-30% body fat: Obese. Fat is present all around the body including waist, back, thighs, and calves. The waist will appear slightly larger relative to the hips, and the stomach will most likely be protruding noticeably over the waist.'},
    { from:31, to:35, path:'images/malePercentagePictures/31-34.png', textdescription: '31%-35% body fat: This percentage of body fat is more of the beer gut look. The waist circumference at this point can be about 40+ inches.'},
    { from:36, to:40, path:'images/malePercentagePictures/35-40.png', textdescription: '36%-40% body fat: Significant fat accumulation in the stomach and waist region. Basic daily activities like walking up stairs or bending over to pick something up are difficult. Considered severely obese. Lower life expectancy, diabetes, heart disease etc'},
    { from:41, to:100, path:'images/malePercentagePictures/35-40.png', textdescription: '40+% body fat: Morbidly obese. All daily activies are difficult + significant health risks are present. Talk to your doctor immediately. At higher risk of heart diseases, strokes, cancers, diabetes, gallbladder + liver problems, infertility, reproductive issues, arthritis, sleep apnea, anxiety, depression, + pain.'},
];    

let userSelectedBodyFatExample = bodyfatExamples[8];

function isInRange(range, value) {
    if (range.from <= value && range.to >= value) {
        //in range
        return true
    } else {
        return false
    }
}

function checkAndChangeBodyFatExample(bodyFatPercentageToCheck){
    var matchFound = false
    for (var i = 0; i < bodyfatExamples.length && !matchFound; i++) {
        var bodyfatExample = bodyfatExamples[i];
        if (isInRange(bodyfatExample, bodyFatPercentageToCheck)) {
            matchFound = true
            userSelectedBodyFatExample = bodyfatExample;
        }
    }
}

const bodyfatslider = document.getElementById('bodyfatslider');
bodyfatslider.addEventListener('input', bodyFatSliderChanged);

let bodyfatsliderbuttons = document.getElementsByName('bodyfatsliderbutton');
const bodyfatsliderbuttonsArray = Array.from(bodyfatsliderbuttons);
bodyfatsliderbuttonsArray.forEach( function(element, index) {
    element.addEventListener('click', bodyFatButtonsClicked);
});

let bodyFatPercentageImage = document.getElementById('bodyFatPercentageImage');

function bodyFatSliderChanged() {

    checkAndChangeBodyFatExample(bodyfatslider.value);

    bodyFatPercentageImage.src = userSelectedBodyFatExample.path;

    percentInputBox2.value = parseInt(bodyfatslider.value);
    setBodyFatPercentage();

    let bodyFatTextSection = document.getElementById('bodyFatTextSection');

    bodyFatTextSection.textContent = userSelectedBodyFatExample.textdescription;
}

function bodyFatButtonsClicked(event) {
     // if it is not the button, let it bubble up
     if (event.target.tagName.toLowerCase() != 'button') {
        return
    }

    let buttonClicked = event.target;

    buttonClicked.classList.add('buttonClicked');

    if (buttonClicked.id == 'bodyfatsliderbuttonUp') {
        bodyfatslider.value = parseInt(bodyfatslider.value) + 1;
    } else {
        bodyfatslider.value = parseInt(bodyfatslider.value) - 1;
    }
    bodyFatSliderChanged();

    setTimeout(() => {
        buttonClicked.classList.remove('buttonClicked');
      }, "80")
}


//picking gender
const sexElements = document.getElementsByName('sexButton');//return 'array like' list. All the buttons. Careful. 
const sex = Array.from(sexElements);
sex.forEach( function(element, index) {
    element.addEventListener('click', genderPicked);
});



//#Unit of Measurement Setup
const unitOfMeasurementElements = document.getElementsByName('unitOfMeasurementButton');//return 'array like' list. All the checkboxes. Careful. 
const unitOfMeasurementArray = Array.from(unitOfMeasurementElements);
unitOfMeasurementArray.forEach(element => {
    element.addEventListener('click', userPickedUnitOfMeasurement);
});


let maleEstimateTextArray;
let femaleEstimateTextArray;

let navCheckbox = document.getElementById('navCheckbox');
if (navCheckbox != null) {
    navCheckbox.addEventListener('click', navHamburgerClicked);
}

let navBarLinks = document.getElementById('navBarLinks');

function navHamburgerClicked(event) {
    navBarLinks.classList.toggle('active');
}


const auth = firebaseApp.auth();
const db = firebaseApp.firestore();
const whenSignedInSection = document.getElementById('whenSignedInSection');
const whenSignedOutSection = document.getElementById('whenSignedOutSection');
const signInWithGoogleButton = document.getElementById('signInWithGoogleButton');
const signOutButton = document.getElementById('signOutButton');
signInWithGoogleButton.onclick = () => auth.signInWithPopup(provider);
signOutButton.onclick = () => auth.signOut();

const userDetails = document.getElementById('userDetails');
const provider = new firebase.auth.GoogleAuthProvider();

let userMessageH3 = document.createElement("h3");
userDetails.appendChild(userMessageH3);

auth.onAuthStateChanged(updateUiForUserState);

//db section
const planDetailsSection = document.getElementById('planDetailsSection');
let plansReference;
let unsubscribe;
//end db section

let currentDayArea = document.getElementById('currentDayArea');
let futureDaysArea = document.getElementById('futureDaysArea');
let completedDaysArea = document.getElementById('completedDaysArea');

let dayNumberIncrement = 10;

let daysArray = [];
let tasksArray = [];
let tasksArray2 = [];

function updateUiForUserState(user){
    if (user) {
        //signed in
        whenSignedInSection.hidden = false;
        whenSignedOutSection.hidden = true;

        userMessageH3.innerHTML = 'Hello ' + user.displayName;

        allPlansReference = db.collection('plans');

        let filteredToUsersPlan = allPlansReference.where('userId','==', user.uid)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                // doc.data() is never undefined for query doc snapshots                
                updatePlan(doc);

                getDaysFromPlan(user.uid, doc.id)

            });
        })
        .catch((error) => {
            console.log('Error gettings documents: ' + error);
        });

        //trying to get a subcollection
        db.collection("plans/QJjvFnRpxOVFj7ZdjM3w/days").get()
        .then((snapshot) => {
            snapshot.docs.forEach(doc => {
                let completionPercentage = (doc.data().completedTasks / doc.data().numberOfTasks);       
            })
        })
        
    } else {
        //signed out
        whenSignedInSection.hidden = true;
        whenSignedOutSection.hidden = false;
    }
}

function readInDaysAndDisplay(){
    daysArray.forEach(dayObject => {

        let dayDiv = document.createElement('div');
        dayDiv.classList.add('dayDiv');

        let dayHeader = document.createElement('h3');
        dayHeader.classList.add('dayHeader');
        let formattedDate = dayObject.date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"long", day:"numeric"}) 
        dayHeader.innerText = formattedDate;

        dayDiv.appendChild(dayHeader);

        let dayObjectDate = dayObject.date;
        let todaysDate = new Date();  
       
        dayObjectDate.setHours(0, 0, 0, 0);
        todaysDate.setHours(0, 0, 0, 0);  //remove the time component to just check the date

        //which section does it go in?
        if (dayObjectDate.getTime() == todaysDate.getTime()) {
            console.log('it is today');
            currentDayArea.appendChild(dayDiv);
        } else if (dayObjectDate.getTime() > todaysDate.getTime()) {
            console.log('is the future jimmy!');
            futureDaysArea.appendChild(dayDiv);
        } else if (dayObjectDate.getTime() < todaysDate.getTime()){
            console.log('it is the past');
            completedDaysArea.appendChild(dayDiv);
        }

        let listOfTasks = document.createElement('ol');

        let dayTaskArray = dayObject.dayTaskArray;
        dayTaskArray.forEach(taskObject => {
            let taskCompleted = taskObject.data().completed;
            let dayNumber = taskObject.data().dayNumber;
            let calorieGoalNumber = taskObject.data().calorieGoalNumber;
            let taskID = taskObject.id;
            let taskDate = (taskObject.data().date.toDate());
            let taskType = taskObject.data().type;
            let dayListItem = document.createElement('li');
            
            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.checked = taskCompleted;
            checkbox.id = taskID;
            checkbox.onclick = checkDayCheckbox;
    
            var label = document.createElement('label')
              
            let planDayDateString = taskDate.toDateString();
            
            label.appendChild(document.createTextNode('Day ' + dayNumber + ' Date: ' + planDayDateString + ' type = ' + taskType));
            
            dayListItem.appendChild(checkbox);
            dayListItem.appendChild(label);
    
            listOfTasks.appendChild(dayListItem);
            dayDiv.appendChild(listOfTasks); 
        }); 
    });
}

function readInTasksAndPutIntoDays(){
    console.log('readInTasksAndPutIntoDays');
    db.collection("plans/QJjvFnRpxOVFj7ZdjM3w/tasks").orderBy("date").get()
    .then((snapshot) => {
        tasksArray2 = snapshot;
        
        console.log('tasksArray2 length = ' + tasksArray2.length)
        snapshot.docs.forEach(doc => {
            tasksArray.push(doc);
        })
        console.log('tasksArray length = ' + tasksArray.length)
        //createDaysArray(tasksArray);
    })
}

function getDaysFromPlan(userId, planId){

    //get the users plan
    //get all the documents in the days collection
 
    let userDaysReference = db.collection('plans/'+userId+'/days');

    userDaysReference.get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

        });
    })
    .catch((error) => {
        console.log('Error gettings documents: ' + error);
    });
}   

function updatePlan(doc) {
    const planLength = document.getElementById('planLength');
    planLength.innerHTML = 'Length: ' + doc.data().lengthInDays;

    const bodyFatChangeSection = document.getElementById('bodyFatChangeSection');
    bodyFatChangeSection.innerHTML = 'Staring body fat ' + doc.data().planStartingBodyFatPercentage
    + '% - Ending body fat ' + doc.data().planEndingBodyFatPercentage + '%.';

    // dayNumberIncrement = dayNumberIncrement + 1;
    // db.collection("plans/QJjvFnRpxOVFj7ZdjM3w/days").add({
    //     numberOfTasks: 8,
    //     completedTasks: 3,
    //     date: 2022-05-07,
    //     dayNumber : dayNumberIncrement
    // });

    // let dayId = '6gdLds0vnQGYw8WTyPAD';
    // db.collection("plans/QJjvFnRpxOVFj7ZdjM3w/days/").doc(dayId).update({
    //     numberOfTasks: 50,
    //     completedTasks: 3,
    //     date: 2022-05-07,
    //     dayNumber : dayNumberIncrement
    // });
}

function checkDayCheckbox(event){
    console.log('checkbox was clicked');
    let checkboxElement = event.srcElement;
    console.log(checkboxElement.id);

    let taskID = checkboxElement.id;

    let docReference = db.collection("plans/QJjvFnRpxOVFj7ZdjM3w/tasks").doc(taskID);

    docReference.get()
    .then((doc) => {
        let isDayChecked = doc.data().completed;
        console.log(isDayChecked);
        if (isDayChecked == true) {
            console.log('it is checked!');
            console.log('lets uncheck it');

            db.collection("plans/QJjvFnRpxOVFj7ZdjM3w/tasks/").doc(taskID).update({
                completed: false,
                completedDateTime: new Date()
            });
        } else {
            console.log('it is not checked');
            console.log('let us check it');

            db.collection("plans/QJjvFnRpxOVFj7ZdjM3w/tasks/").doc(taskID).update({
                completed: true,
                completedDateTime: new Date()
            });
        }
    })
    .catch((error) => {
        console.log('Error gettings documents: ' + error);
    });
}

function createDaysArray(tasksArray){
    console.log('createDaysArray');
    let planStartDate = new Date(); //can set a different start date -     // let planStartDate = new Date("02 May 2022 06:30:00");
    let numberOfDays = user.numberOfDaysTilGoal;
    let dayNumber = 1;
    let futureDate;
    let dayNumberTracker = 0;

    //create all the days and add them to the days array
    for (let dayIndex = 0; (dayIndex - 1) < numberOfDays; dayIndex++) {
    
        futureDate = addDays(planStartDate, dayIndex);

        let newDayDate = futureDate; //empty new Date() created new date from current time
        let newPlanDay = new planDay(newDayDate);
        daysArray.push(newPlanDay); 
    }
    //take each task and compare it to the day, if it matches add it. 
    if (tasksArray.length > 0) {
        tasksArray.forEach(task => {
            let taskDate = (task.data().date.toDate());  
            let daysDate = daysArray[dayNumberTracker].date;
            
    
            daysDate.setHours(0, 0, 0, 0);
            taskDate.setHours(0, 0, 0, 0);  
    
            if (daysDate.getTime() == taskDate.getTime()) {
                daysArray[dayNumberTracker].dayTaskArray.push(task);
            } else {
                //didn't match to go next day
                dayNumberTracker = dayNumberTracker + 1
            }
        });
    };    

    console.log('days Array is created, now read it');
    readInDaysAndDisplay();
}

function planDay(date) {
    //create the day object with an empty task array.
    this.date = date;
    this.dayTaskArray = [];
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

let generateDailyPlanButton = document.getElementById('generateDailyPlanButton');
generateDailyPlanButton.onclick = generateDailyPlan;

// createPlanButton.onclick = createPlan;

function generateDailyPlan(){
    console.log('generating your daily plan');

    // let planStartDate = new Date("02 May 2022 06:30:00");
    let planStartDate = new Date();
    console.log('plan start date = ' + planStartDate);
    let numberOfDays = user.numberOfDaysTilGoal;
    console.log('user.numberOfDaysTilGoal = ' + user.numberOfDaysTilGoal);

    let dayNumber = 1;

    let futureDate;
    
        // //create calorie tasks
        // for (let dayIndex = 0; (dayIndex - 1) < numberOfDays; dayIndex++) {
        
        //     futureDate = addDays(planStartDate, dayIndex);
            
        //     let dayData = {
                
        //         date: futureDate,
        //         completed: false,
        //         type: 'calorieGoal',
        //         calorieGoalNumber: 1500,
        //         text: "Did you eat " + this.calorieGoalNumber + "calories today?",
        //         userResult: 0,
        //         dayNumber : dayIndex
        //     };
              
        //     db.collection("plans/QJjvFnRpxOVFj7ZdjM3w/tasks").add(dayData);
        // }
    
        // //create workout tasks
        // for (let dayIndex = 0; (dayIndex - 1) < numberOfDays; dayIndex++) {
        //     futureDate = addDays(planStartDate, dayIndex);
    
        //     let taskData = {
    
        //         date: futureDate,
        //         completed: false,
        //         type: 'workoutGoal',
        //         workoutType: 'general',
        //         dayNumber : dayIndex
        //     };
    
        //     db.collection("plans/QJjvFnRpxOVFj7ZdjM3w/tasks").add(taskData);
        // }
    
        // //create sleep goals
        // for (let dayIndex = 0; (dayIndex - 1) < numberOfDays; dayIndex++) {
        //     futureDate = addDays(planStartDate, dayIndex);
    
        //     let taskData = {
        //         date: futureDate,
        //         completed: false,
        //         type: 'sleepGoal',
        //         dayNumber : dayIndex
        //     };
    
        //     db.collection("plans/QJjvFnRpxOVFj7ZdjM3w/tasks").add(taskData);
        // }
    
        //create meal plan tasks
        for (let dayIndex = 0; (dayIndex - 1) < numberOfDays; dayIndex++) {
        
            futureDate = addDays(planStartDate, dayIndex);
            
            let dayData = {
                
                date: futureDate,
                completed: false,
                type: 'mealPlanGoal',
                dayNumber : dayIndex
            };
              
            db.collection("plans/QJjvFnRpxOVFj7ZdjM3w/tasks").add(dayData);
        }
}

// ----- copied from main 

















document.addEventListener("DOMContentLoaded", startUpTheCalculator);



//todo - refactor to have each function separate, not nested in one giant function.
function startUpTheCalculator() {
    
    console.log(shepherdGreeting);

    readInTasksAndPutIntoDays();

    let testing = false; //change this to test

    if (testing == true) {
        testEverything();
    }  

    bootup();
}

function bootup() {
        //functions that only run once
        generateBodyFatEstimatingText();
        calcDaysTilSummer();
        updatePageWithNumberOfDaysUntilSummer();

        //functions that can run more than once
        getUserName();
        getUserGender();
        setUpForSelectedGender();

        loadUnitOfMeasurement();

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
        console.log('Entered mainCalcu');
        getUserGender();
        userPickedUnitOfMeasurement();
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

function genderPicked(event){
    
    // if it is not the button, let it bubble up
    if (event.target.tagName.toLowerCase() != 'button') {
        return
    }

    let buttonClicked = event.target;

    //clear the selection
    sex.forEach( function(button) {
        button.dataset.userSelected = false;
        button.classList.remove('selectedButton');
    });

    //set the data to show which button the user picked
    buttonClicked.dataset.userSelected = true;

    //visually highlight the picked button
    buttonClicked.classList.add('selectedButton');

    getUserGender();
    setUpForSelectedGender();
}

function getUserGender(){
    sex.forEach( function(button) {
        if (button.dataset.userSelected == 'true') {
            let userGenderPicked = button.dataset.gender;
            user.sex = userGenderPicked;
        }
    });
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

    updatePageWithOptimalBodyFatGoal();

    updatePageWithSelectedGender();

    updatePageWithStandardGenderBodyFatPercentageGoal();

    //set the body fat goal input box to the gender suggestion
    if (userDidSetBodyFatPercentageGoal === false) {
        bfGoalInputBox.value = genderBfGoalFrom100;
    }
}

function updatePageWithStandardGenderBodyFatPercentageGoal(){
    genderGoalBodyFatPercentageInsert.forEach( function(element, index) {
        element.textContent = genderBfGoalFrom100;
    }); 
}

function updatePageWithSelectedGender(){
    selectedGenderInsert.forEach( function(element, index) {
        element.textContent = user.sex;
    });
}

function updatePageWithOptimalBodyFatGoal(){
    genderOptimalBfGoal.forEach( function(element, index) {
        element.textContent = genderBfGoalFrom100;
    });
}





















    //#Unit of Measurement Section
function loadUnitOfMeasurement(){

    //todo load this from firebase
    let userPickedUnit = 'Imperial';
    // let userPickedUnit = 'Metric';

    //clear built in selection
    unitOfMeasurementArray.forEach( function(button) {
        button.dataset.userSelected = false;
        button.classList.remove('selectedButton');
    });

    unitOfMeasurementArray.forEach( function(button) {
        if (button.dataset.unitSystem == userPickedUnit) {
            button.dataset.userSelected = true;
            button.classList.add('selectedButton');
        }
    });

    getAndSetUserSelectedUnitOfMeasurement();
}
    
function setPageUpForUnitOfMeasurement(){
        updatePageWithSelectedUnitSection();
        updatePageWithSelectedUnitsOfMeasurement();
        updatePageWithCaloriesInSelectedUnitsOfMeasurement();
        updatePageWithProteinPerUnitOfWeight();
}
    
function getAndSetUserSelectedUnitOfMeasurement(){
    
    unitOfMeasurementArray.forEach( function(button) {
        if (button.dataset.userSelected == 'true') {
            user.selectedMassUnitOfMeasurement = button.dataset.unitSystem;
            user.selectedMassUnit = button.dataset.massUnit;
        }
    });

    setPageUpForUnitOfMeasurement();
}

function userPickedUnitOfMeasurement(event){

    //if the event is real run it
    if (event != null) {
        // if it is not the button, let it bubble up
        if (event.target.tagName.toLowerCase() != 'button') {
            return
        }

        let buttonClicked = event.target;

        //clear built in selection
        unitOfMeasurementArray.forEach( function(button) {
        button.dataset.userSelected = false;
        button.classList.remove('selectedButton');
        });

        //set the data to show which button the user picked
        buttonClicked.dataset.userSelected = true;

        let unitPicked = buttonClicked.dataset.unitSystem;

        //visually highlight the picked button
        buttonClicked.classList.add('selectedButton');

        console.log('user picked ' + unitPicked + ' as their unit of measurement');
        getAndSetUserSelectedUnitOfMeasurement();
    }
}

function updatePageWithSelectedUnitSection() {
    if (user.selectedMassUnitOfMeasurement == "Metric") {
        if (imperialHeightSection != null) {
            imperialHeightSection.style.display = "none";
            metricHeightSection.style.display = "flex";
        }
    } else { //=="Imperial"
        if (imperialHeightSection != null) {
            imperialHeightSection.style.display = "flex";
            metricHeightSection.style.display = "none";
        }
    }
}

function updatePageWithCaloriesInSelectedUnitsOfMeasurement(){
    numberOfCaloriesInSelectedMassUnitOfMeasurement.forEach( function(element, index) {
        if (user.selectedMassUnitOfMeasurement == "Metric") {
            element.textContent = caloriesPerKilogramOfFat;
        } else { //=="Imperial"
            element.textContent = caloriesPerPoundOfFat;
        }
    });
}



function updatePageWithSelectedUnitsOfMeasurement(){
    selectedMassUnitOfMeasurement.forEach( function(element, index) {
        element.textContent = user.selectedMassUnit;
    });
}

function updatePageWithProteinPerUnitOfWeight(){
    proteinPerUnit.forEach( function(element, index) {
        if (user.selectedMassUnitOfMeasurement == "Metric") {
            //do metric stuff
            element.textContent = gramsOfProteinPerKilogramOfBodyWeight;
        } else { //=="Imperial"
            //do imperial stuff
            element.textContent = gramsOfProteinPerPoundOfBodyWeight;
        }
    });
}

//#Weight Section
function userClickedSetWeightButton() {
    getUserWeight();
    // checkUserWeightAgainstNationalAverage(); //check and insert results
    updatePageWithUserWeight();
}

function getUserWeight(){
    if (user.selectedMassUnitOfMeasurement == "Metric") {
        user.weightInKilograms = weightInputBox2.value;
        user.weightInPounds = convertKilogramsToPounds(user.weightInKilograms);
    } else { //=="Imperial"
        user.weightInPounds = weightInputBox2.value;
        user.weightInKilograms = convertPoundsToKilograms(user.weightInPounds);
    }
}

function updatePageWithUserWeight(){
    weightInsert.forEach( function(element, index) {
        if (user.selectedMassUnitOfMeasurement == "Metric") {
            //do metric stuff
            element.textContent = user.weightInKilograms;
        } else { //=="Imperial"
            //do imperial stuff
            element.textContent = user.weightInPounds;
        }
    });
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

// #Body Fat Percentage Section
function setBodyFatPercentage(){
    getUserBodyFatPercentage();//get the updated body fat %
    calcCurrentBodyFatMassAndLeanMass();

    updatePageWithUserWeight();
    updatePageWithBodyFatMass();
    updatePageWithBodyFatPercentage();
    updatePageWithLeanBodyMass();
}

function getUserBodyFatPercentage(){
    if (user != null) {
        user.bodyFatPercentage = percentInputBox2.value;
    }
}

function calcCurrentBodyFatMassAndLeanMass() {
    if (user.selectedMassUnitOfMeasurement == "Metric") {
        //do metric stuff
        user.fatBodyMass = (user.weightInKilograms * (user.bodyFatPercentage /100)); //kilograms bf results
        user.fatBodyMass = roundNumPlace(user.fatBodyMass,1);

        user.leanBodyMass = user.weightInKilograms - user.fatBodyMass;
        user.leanBodyMass = roundNumPlace(user.leanBodyMass,1);
    } else {
        //=="Imperial" do imperial stuff
        user.fatBodyMass = (user.weightInPounds * (user.bodyFatPercentage /100)); //lbs bf results
        user.fatBodyMass = roundNumPlace(user.fatBodyMass,1);

        user.leanBodyMass = user.weightInPounds - user.fatBodyMass;
        user.leanBodyMass = roundNumPlace(user.leanBodyMass,1);
    }
}

function updatePageWithLeanBodyMass(){
    leanInsert.forEach( function(element, index) {
        element.textContent = user.leanBodyMass;
    });
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

function updatePageWithUserCurrentBodyFatPercentage(){
    bfInsert.forEach( function(element, index) {
        element.textContent = user.bodyFatPercentage;
    });
}

function showAndHideEstimates() {
    
    if (estimateBodyFatSection.style.display == "block") {
        estimateBodyFatSection.style.display = "none";
        console.log('hiding estimates');
    } else {
        estimateBodyFatSection.style.display = "block";
        console.log('showing estimates');
    }
}

// #Body Fat Percentage Goal
function getBodyFatPercentageGoal(){
    user.bodyFatPercentageGoal = bfGoalInputBox.value; 
}

function calcGoalForNewBodyFatMassAndToTalBodyWeight(){
    userGoalPercentModifer = user.bodyFatPercentageGoal/(100 - user.bodyFatPercentageGoal);

    if (user.selectedMassUnitOfMeasurement == "Metric") {
        //do metric stuff
        user.GoalForUnitsOfBodyFat = userGoalPercentModifer * user.leanBodyMass;
        user.GoalForUnitsOfBodyFat = roundNumPlace(user.GoalForUnitsOfBodyFat,2);

        user.GoalTotalBodyWeight = user.GoalForUnitsOfBodyFat + user.leanBodyMass;
        user.GoalTotalBodyWeight = roundNumPlace(user.GoalTotalBodyWeight,2);

        user.UnitsOfWeightToLoseToGoal = user.fatBodyMass - user.GoalForUnitsOfBodyFat; 
        user.UnitsOfWeightToLoseToGoal = roundNumPlace(user.UnitsOfWeightToLoseToGoal,1);
    } else { //=="Imperial"
        //do imperial stuff
        user.GoalForPoundsOfBodyFat = userGoalPercentModifer * user.leanBodyMass;
        user.GoalForPoundsOfBodyFat = roundNumPlace(user.GoalForPoundsOfBodyFat,2);

        user.GoalTotalBodyWeight = user.GoalForPoundsOfBodyFat + user.leanBodyMass;
        user.GoalTotalBodyWeight = roundNumPlace(user.GoalTotalBodyWeight,2);

        user.UnitsOfWeightToLoseToGoal = user.fatBodyMass - user.GoalForPoundsOfBodyFat; 
        user.UnitsOfWeightToLoseToGoal = roundNumPlace(user.UnitsOfWeightToLoseToGoal,1);
    }

    updatePageWithUserBodyFatPercentageGoal();
    updatePageWithUserWeight();
    updatePageWithUserCurrentBodyFatPercentage();
    updatePageWithLeanBodyMass();
    updatePageWithBodyFatMass();
    updatePageWithPoundsToLoseToGoalBodyFatMass();
    updatePageWithUserGoalForPoundsOfBodyFat();
    updatePageWithUserGoalForTotalBodyWeight();
}

function updatePageWithUserBodyFatPercentageGoal(){
    goalBodyFatPercentageInsert.forEach( function(element, index) {
        element.textContent = user.bodyFatPercentageGoal;
    }); 
}

function updatePageWithPoundsToLoseToGoalBodyFatMass(){
    loseInsert.forEach( function(element, index) {
        if (user.selectedMassUnitOfMeasurement == "Metric") {
            //do metric stuff
            element.textContent = user.UnitsOfWeightToLoseToGoal;
        } else { //=="Imperial"
            //do imperial stuff
            element.textContent = user.UnitsOfWeightToLoseToGoal;
        }
    });
}

function updatePageWithUserGoalForPoundsOfBodyFat(){
    newFatInsert.forEach( function(element, index) {
        if (user.selectedMassUnitOfMeasurement == "Metric") {
            //do metric stuff
            element.textContent = user.GoalForUnitsOfBodyFat;
        } else { //=="Imperial"
            //do imperial stuff
            element.textContent = user.GoalForPoundsOfBodyFat;
        }
    });
}

function updatePageWithUserGoalForTotalBodyWeight(){
    newTotalBodyWeightInsert.forEach( function(element, index) {
        element.textContent = user.GoalTotalBodyWeight;
    });
}

// #BMR Section
function BmrInfoEntered(){
    getUserAge();
    getUserWeight();
    getUserHeight();
    calcGoalForNewBodyFatMassAndToTalBodyWeight();
    getUserCalorieIntake();
    calcDaysToGoalBf();
    calcBmr();
    updatePageWithBMR();
}

function getUserAge(){
    user.age = age.value;
}

function calcBmr(){
    //BMR (kcal / day) = 10 * weight (kg) + 6.25 * height (cm) – 5 * age (y) + s (kcal / day)
    //testing data 200 pounds to kg = 90.7185, 68 inches to cm = 172.72
    let unRoundedBmrResult = (10 * user.weightInKilograms) + (6.25 * user.heightInCentimeters) - (5 * user.age) + user.selectedSexSValue;
    user.BMR = roundNumPlace(unRoundedBmrResult,2);
    //BMR result for 200 pounds and 68 inches is = 1826.68
}

function getUserHeight(){
        user.heightInCentimeters = userHeightInCentimetersInputBox.value;
        user.heightFeet = feet.value;
        user.heightInches = inches.value;
}

function convertUserHeightToFeetAndInches(heightInCentimeters){
    //quick convert centimeters to inches
    user.heightInOnlyInches = (heightInCentimeters * 0.3937);

    //convert to the feet and inches
    let realFeet = ((heightInCentimeters*0.393700) / 12);
    let feet = Math.floor(realFeet);
    let inches = Math.round((realFeet - feet) * 12);
    
    user.heightFeet = feet;
    user.heightInches = inches;
}

function convertUserHeightToCentimeters(feet, inches) {
    user.heightInOnlyInches = convertFeetAndInchesToTotalInches(feet,inches);
    user.heightInCentimeters = convertInchesToCentimeters(user.heightInOnlyInches);
}

function calcBmrAtWeight(weight){
    //BMR (kcal / day) = 10 * weight (kg) + 6.25 * height (cm) – 5 * age (y) + s (kcal / day)
    //testing data 200 pounds to kg = 90.7185, 68 inches to cm = 172.72
    
    let weightInKilograms;

    if (user.selectedMassUnitOfMeasurement == "Metric") {
        //do metric stuff
        weightInKilograms = weight;
    } else { //=="Imperial"
        //do imperial stuff
        weightInKilograms = convertPoundsToKilograms(weight);
    }
    
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

//#TDEE Section
function userSetActiveMultipler(){
    getUserActivityLevel();
    calcTDEE();
    updatePageWithTDEE();
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

function calcTDEE(){
    let unRoundedBmrWithActivity = user.BMR * user.selectedActivityLevelNumericValue;
    user.TDEE = roundNumPlace(unRoundedBmrWithActivity,1);

    calcTwentyFivePercentDeficit();

    updatePageWithUserPickedDeficit();

    calcCaloricDeficitValue();
}

function calcTDEEAtBMR(BMR){
    let unRoundedBmrWithActivity = BMR * user.selectedActivityLevelNumericValue;
    let TDEEAtBMR = roundNumPlace(unRoundedBmrWithActivity,1);
    return TDEEAtBMR;
}

function updatePageWithTDEE(){
    tdee.forEach( function(element, index) {
        element.textContent  = user.TDEE;
    });
}

// #Caloric deficit section
function getUserCalorieIntake(){
    user.selectedDailyCalories = parseInt(caloricBudgetInput.value);
}

function calcCaloricDeficitValue(){
    user.caloricDeficit = user.TDEE - user.selectedDailyCalories; 
    user.caloricDeficit = roundNumPlace(user.caloricDeficit,1);
}

function calcCaloricDeficitValueAtTDEE(TDEE,caloriesOnDay){
    let caloricDeficitOnDay = TDEE - caloriesOnDay; 
    caloricDeficitOnDay = roundNumPlace(caloricDeficitOnDay,1);
    return caloricDeficitOnDay;
}

function updatePageWithUserCalorieIntake(){
    calorieBudgetInsert.forEach( function(element, index) {
        element.textContent  = user.selectedDailyCalories;
    });
}

function setDailyCaloriesInputField(){
    if (userDidSetDailyCalories == false) {
        calcTwentyFivePercentDeficit();
        caloricBudgetInput.value = recommendedDailyCalories;
    }
}

function updatePageWithUserPickedDeficit(){
    userPickedDeficitInsert.forEach( function(element, index) {
        element.textContent  = user.caloricDeficit;
    });
}

function calcTwentyFivePercentDeficit(){
    twentyFivePercentDeficit = user.TDEE - (user.TDEE*.25);
    twentyFivePercentDeficit = roundNumPlace(twentyFivePercentDeficit,1);

    recommendedDailyCalories = twentyFivePercentDeficit;

    twentyFivePercentCalorieDeficitOnly = user.TDEE*.25;
    twentyFivePercentCalorieDeficitOnly = roundNumPlace(twentyFivePercentCalorieDeficitOnly,1);

    twentyFivePercentCalorieDeficitInsert.forEach( function(element, index) {
        element.textContent  = twentyFivePercentCalorieDeficitOnly;
    });

    theoreticalCalorieIntakeInsert.forEach( function(element, index) {
        element.textContent  = twentyFivePercentDeficit;
    });
}

function calcPercentDeficit() {
    unroundedCalculatedPercentDeficit = (user.caloricDeficit / user.TDEE)*100; //multiply by 100 to convert to readable percent
    calculatedPercentDeficit = roundNumPlace(unroundedCalculatedPercentDeficit,1);
    percentDeficitInsert.textContent = calculatedPercentDeficit;
    calcDeficitExample();
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

// #Days to Goal Section
function calcDaysToGoalBf() {
    let projectedWeightOnDay;

    let caloriesPerUnitOfWeight;
    let unitsLostTitle = user.selectedMassUnit;

    if (user.selectedMassUnitOfMeasurement == "Metric") {
        //do metric stuff
        projectedWeightOnDay = user.weightInKilograms;
        caloriesPerUnitOfWeight = caloriesPerKilogramOfFat;
    } else { //=="Imperial"
        //do imperial stuff
        projectedWeightOnDay = user.weightInPounds;
        caloriesPerUnitOfWeight = caloriesPerPoundOfFat;

    }

    let numberOfDaysToGoal = 0;

    let progressData = ["Day", "Date", "Body Fat %", "Fat Mass", "Lean Mass", "Weight", unitsLostTitle + " Lost","TDEE on Day", "caloric deficit"];
    let generatedTable = document.createElement('table');
    generatedTable.id = "progressTable";

    //todo fix it so the body fat % is what the user says on the first day.

    //while projected weight is greater than goal weight
    while (projectedWeightOnDay >= user.GoalTotalBodyWeight){
        //calc BMR
        let BMROnDay = calcBmrAtWeight(projectedWeightOnDay);

        //calc TDEE
        let TDEEOnDay = calcTDEEAtBMR(BMROnDay);

        //calc caloric deficit
        let caloricDeficitOnDay = calcCaloricDeficitValueAtTDEE(TDEEOnDay,user.selectedDailyCalories)

        if (caloricDeficitOnDay <= 0) {
            alert("While running the calculations your caloric deficit reached zero. That means you hit a stable point before your goal was reached. Try adjusting your goal or your daily calorie intake. If you still have questions, please email me!");
            break;
        }

        //calc pounds lost
        let unitsOfWeightLostThatDay = caloricDeficitOnDay/caloriesPerUnitOfWeight;
        
        let dateOnDay = new Date(); //day 0 is today
        dateOnDay.setDate(dateOnDay.getDate() + numberOfDaysToGoal);

        let bodyFatPercentageOnDay = roundNumPlace((((projectedWeightOnDay - user.leanBodyMass)/projectedWeightOnDay)*100),2);
        let fatMassOnDay = roundNumPlace((projectedWeightOnDay - user.leanBodyMass),1);
        let leanMassOnDay = roundNumPlace(user.leanBodyMass,1); //todo doesn't change right now, allow user to project muscle gain later.
        let unitsOfWeightLostSoFar;
        if (user.selectedMassUnitOfMeasurement == "Metric") {
            //do metric stuff
            unitsOfWeightLostSoFar = roundNumPlace((user.weightInKilograms - projectedWeightOnDay),2);
        } else { //=="Imperial"
            //do imperial stuff
            unitsOfWeightLostSoFar = roundNumPlace((user.weightInPounds - projectedWeightOnDay),2);
        }    
        progressData.push(numberOfDaysToGoal);
        progressData.push(dateOnDay.toLocaleDateString("en-US"));
        progressData.push(bodyFatPercentageOnDay + "%");
        progressData.push(fatMassOnDay);
        progressData.push(leanMassOnDay);
        progressData.push(roundNumPlace(projectedWeightOnDay,1));
        progressData.push(unitsOfWeightLostSoFar);
        progressData.push(TDEEOnDay);
        progressData.push(caloricDeficitOnDay);

        //subtrack weight lost today from projected weight
        projectedWeightOnDay = projectedWeightOnDay - unitsOfWeightLostThatDay;

        //add one to days required to reach goal
        if (projectedWeightOnDay >= user.GoalTotalBodyWeight) {
            numberOfDaysToGoal = numberOfDaysToGoal +1; //only add the day if we haven't already hit the goal. 
        }
    }

    // (B) CREATE HTML TABLE OBJECT
    let perrow = 9, // CELLS PER ROW
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

    //show the table
    let progressTable = document.getElementById('progressTable');
    progressTable.replaceWith(generatedTable);

    //new way of doing it
    if (user.selectedMassUnitOfMeasurement == "Metric") {
        //do metric stuff
        user.totalCaloriesUntilBfGoal = user.UnitsOfWeightToLoseToGoal * caloriesPerKilogramOfFat
    } else { //=="Imperial"
        //do imperial stuff
        user.totalCaloriesUntilBfGoal = user.UnitsOfWeightToLoseToGoal * caloriesPerPoundOfFat;
    }
    user.totalCaloriesUntilBfGoal = roundNumPlace(user.totalCaloriesUntilBfGoal,1);

    caloriesToUseUp.forEach( function(element, index) {
        element.textContent = user.totalCaloriesUntilBfGoal;
    });

    user.numberOfDaysTilGoal = numberOfDaysToGoal; //take results from while loop table generation
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

    let goalEndDateFormatted = formatDate(goalEndDate, '/');

    dateFromCalculatedDaysAway.textContent = goalEndDateFormatted;

} //end function calcDaysToGoalBf

// #Protein Needs
function calcProteinNeed(){
    user.gramsProteinNeeded = roundNumPlace((user.weightInPounds * gramsProteinPerPoundRecommended),1);
}

function updatePageWithProteinNeed(){
    gramsProteinInsert.forEach( function(element, index) {
        element.textContent = user.gramsProteinNeeded;
    });
}

function calcCalsFromProtein(){
    calsFromProtein = gramsProteinNeeded * 4;
    calsFromProtein = roundNumPlace(calsFromProtein,1);

    calsFromProteinInsert.forEach( function(element, index) {
        element.textContent = calsFromProtein;
    });
}

function scrollToBottomOfTable(){
    document.getElementById('jumptoTopOfTableButton').scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'start'
        });
}

function scrollToTopOfTable(){
    document.getElementById('jumptoBottomOfTableButton').scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'start'
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

function convertKilogramsToPounds(weightInKilograms){
    return (weightInKilograms * 2.205);
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
    console.log('let us export');

    let todaysDateFormatted = new Date();
    todaysDateFormatted = formatDate(todaysDateFormatted, '-');

    let fileName = user.name + " " + todaysDateFormatted + " Abs Plan Progress Table.csv";

    //table ID, and file name are passed in
    exportTableToCSV('progressTable', fileName);
}

let userManuallyPickedDeficit = false;

const selectedMassUnitOfMeasurement = document.getElementsByName('selectedMassUnitOfMeasurement');

const proteinPerUnit = document.getElementsByName('proteinPerUnit');

const numberOfCaloriesInSelectedMassUnitOfMeasurement = document.getElementsByName('numberOfCaloriesInSelectedMassUnitOfMeasurement');


const imperialHeightSection = document.getElementById("imperialHeightSection");
const metricHeightSection = document.getElementById("metricHeightSection");

//#tableofProgress Setup
if (document.getElementById("jumptoBottomOfTableButton") != null) {
    document.getElementById("jumptoBottomOfTableButton").addEventListener('click', scrollToBottomOfTable);
    document.getElementById("jumptoTopOfTableButton").addEventListener('click', scrollToTopOfTable);
}

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
    element.addEventListener('change', showAndHideEstimates);
});
};

let genderBfGoalFrom100;

//get all the calculation buttons by class
const calcButton = document.querySelector('.calcButton');
if (calcButton != null) {
    calcButton.addEventListener('click', mainCalc);
}

//#here todo why the 2 event listeners?
const timeToGoalButton = document.getElementById('timeToGoalButton');
if (timeToGoalButton != null) {
    timeToGoalButton.addEventListener('click', mainCalc);
}

const calcTimeToGoalButton = document.getElementById('calcTimeToGoalButton');

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
if (caloricBudgetInput != null) {
    caloricBudgetInput.addEventListener('focusin',userPickedCaloriesSwitch);
}

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
gramsOfProteinPerPoundOfBodyWeight = .82;
gramsOfProteinPerKilogramOfBodyWeight = 1.8;

//calories per pound
const caloriesPerPoundOfFat = 3500;
// const caloriesPerKilogramOfFat = 7700;
const caloriesPerKilogramOfFat = 7717.5

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
if (bfGoalInputBox != null) {
    bfGoalInputBox.addEventListener('focusin',userPickedBodyFatPercentageGoal);
    bfGoalInputBox.addEventListener('change',getAbPlan);
}

const estimateBodyFatSection = document.getElementById('estimateBodyFat');

const estimateBodyFatLevelDescriptions = document.getElementById('estimateBodyFatLevelDescriptions');

const activityLevelSection = document.getElementById('activityLevelSection');

const getAbPlanButton = document.getElementById('getAbPlanButton');
if (getAbPlanButton != null) {
    getAbPlanButton.addEventListener('click', getAbPlan);
}

const tdeeDeficitExampleInsert = document.getElementsByName('tdeeDeficitExampleInsert');
const tdeeDeficitExampleResultInsert = document.getElementsByName('tdeeDeficitExampleResultInsert');

const caloriesToUseUp = document.getElementsByName('caloriesToUseUp');

const theoreticalCalorieIntakeInsert = document.getElementsByName('theoreticalCalorieIntakeInsert');

const twentyFivePercentCalorieDeficitInsert = document.getElementsByName('twentyFivePercentCalorieDeficitInsert');

let recommendedDailyCalories;

let userDidSetDailyCalories = false;
let userDidSetBodyFatPercentageGoal = false;

//#1% Down Section
const bodyfatestimationhelptoggle = document.getElementById('bodyfatestimationhelptoggle');
if (bodyfatestimationhelptoggle != null) {
    console.log('we are going to calc 1% down');
};

function debounce(func, timeout = 500){
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

function calcOnePercentDown(){
    console.log('calculating one percent down in body fat');

    let userWeight = onePercentWeightInputBox.value;
    let userBodyFatPercentage = bodyFatPercentageInputBox.value;

    if (userBodyFatPercentage == "") {
        return;
    }

    let userFatMass = (userWeight * (userBodyFatPercentage/100));
    let userLeanMass = (userWeight - userFatMass);
    let userDesiredBodyFatPercentage = (userBodyFatPercentage - 1);

    onePercentDownBodyFatPercentageInsert.textContent = roundNumPlace(userDesiredBodyFatPercentage,2);

    let massToOnePercentDown = (userLeanMass / (1 - (userDesiredBodyFatPercentage/100)));

    onePercentDownWeightInsert.textContent = roundNumPlace(massToOnePercentDown,2);

    let massToLoseForOnePercentDown = (userWeight - massToOnePercentDown);

    massToLoseForOnePercentDownInsert.textContent = roundNumPlace(massToLoseForOnePercentDown,2);
}

const processOnePercentDown = debounce(() => calcOnePercentDown());

const onePercentWeightInputBox = document.getElementById('onePercentWeightInputBox');
if (onePercentWeightInputBox != null) {
    onePercentWeightInputBox.addEventListener('keyup', processOnePercentDown);
};

const bodyFatPercentageInputBox = document.getElementById('bodyFatPercentageInputBox');
if (bodyFatPercentageInputBox != null) {
    bodyFatPercentageInputBox.addEventListener('keyup', processOnePercentDown);
}

let massToLoseForOnePercentDownInsert = document.getElementById('massToLoseForOnePercentDownInsert');

let onePercentDownWeightInsert = document.getElementById('onePercentDownWeightInsert');

let onePercentDownBodyFatPercentageInsert = document.getElementById('onePercentDownBodyFatPercentageInsert');    

//#Testing Seciton
const testResultH3 = document.getElementById('testResultH3');  

function testEverything() {
    debugger;
    let testSuccess = false;
    setUpTestsForImperial();
    runCalcs()
    testSuccess = testForImperialTestSuccess();

    setUpTestsForMetric();
    runCalcs()
    testSuccess = testForMetricTestSuccess();

    //show the results
    if (testSuccess == true) {
        testResultH3.style.backgroundColor = "green";
        console.log('tests passed!');
    } else {
        testResultH3.style.backgroundColor = "red";
        console.log('tests failed!');
    }
}

function setUpTestsForImperial(){
    user.selectedMassUnitOfMeasurement = "Imperial";
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
    console.log('setup user for imperial tests.');
}

function setUpTestsForMetric(){
    user.selectedMassUnitOfMeasurement = "Metric";
    user.name = 'Joshua';
    user.bodyFatPercentage = 20;
    user.weightInKilograms = 90.7
    user.bodyFatPercentageGoal = 10;
    user.age = 35;
    user.heightInCentimeters = 172.72;
    user.activityLevel = "light";
    setUserActivityLevelNumeric();
    user.selectedDailyCalories = 2000
    user.sex = "male";
    user.selectedSexSValue = 5; //because male
    console.log('setup user for imperial tests.');
}

function runCalcs(){
    //run the needed calculations
    console.log('running the calcs');

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
    setDailyCaloriesInputField();
}

function testForImperialTestSuccess(){
    //check the results
    console.log('checking the results');
    if (user.numberOfDaysTilGoal == 204) {
        console.log('Imperial results passed. Number of days til goal = ' + user.numberOfDaysTilGoal);
        return true;
    } else {
        console.log('Imperial results failed. Number of days til goal = ' + user.numberOfDaysTilGoal);
        return false;
    }
}

function testForMetricTestSuccess(){
    //check the results
    console.log('checking the results');
    if (user.numberOfDaysTilGoal == 203) {
        console.log('Metric results passed. Number of days til goal = ' + user.numberOfDaysTilGoal);
        return true;
    } else {
        console.log('Metric results failed. Number of days til goal = ' + user.numberOfDaysTilGoal);
        return false;
    }
}

function getFuncName() {
    return getFuncName.caller.name;
}
//how to use - console.log(getFuncName());