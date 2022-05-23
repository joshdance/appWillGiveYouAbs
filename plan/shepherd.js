const shepherdGreeting = 'Hello. I am Shepherd.';
const auth = firebaseApp.auth();
const db = firebaseApp.firestore();
const whenSignedInSection = document.getElementById('whenSignedInSection');
const whenSignedOutSection = document.getElementById('whenSignedOutSection');
const signInWithGoogleButton = document.getElementById('signInWithGoogleButton');
const signOutButton = document.getElementById('signOutButton');
signInWithGoogleButton.onclick = () => auth.signInWithPopup(provider);
signOutButton.onclick = () => auth.signOut();

const createPlanButton = document.getElementById('createPlanButton');
createPlanButton.onclick = createPlan;

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


let listOfDays = document.getElementById('listOfDays');
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
        let taskCompleted = dayObject.dayTaskArray[0].data().completed;
        let dayNumber = dayObject.dayTaskArray[0].data().dayNumber;
        let calorieGoalNumber = dayObject.dayTaskArray[0].data().calorieGoalNumber;
        let taskID = dayObject.dayTaskArray[0].id;
        let taskDate = (dayObject.dayTaskArray[0].data().date.toDate()); 

        let dayListItem = document.createElement('li');
        
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.checked = taskCompleted;
        checkbox.id = taskID;
        checkbox.onclick = checkDayCheckbox;

        var label = document.createElement('label')
          
        let planDayDateString = taskDate.toDateString();
        
        label.appendChild(document.createTextNode('Day ' + dayNumber + ' Date: ' + planDayDateString));
        
        dayListItem.appendChild(checkbox);
        dayListItem.appendChild(label);

        listOfDays.appendChild(dayListItem);  
    });
}

function readInTasksAndPutIntoDays(){
    console.log('readInTasksAndPutIntoDays');
    db.collection("plans/QJjvFnRpxOVFj7ZdjM3w/tasks").orderBy("date").get()
    .then((snapshot) => {
        tasksArray2 = snapshot;
        
        snapshot.docs.forEach(doc => {
            tasksArray.push(doc);
        })
        createDaysArray(tasksArray);
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
    let planStartDate = new Date("02 May 2022 06:30:00");
    let planEndDate = new Date("10 Aug 2022 06:30:00");
    let numberOfDays = 100;
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

    console.log('days Array is created, now read it');
    readInDaysAndDisplay();
}

function planDay(date) {
    this.date = date;
    this.dayTaskArray = [];
}

function createPlan(){
    let planStartDate = new Date("02 May 2022 06:30:00");
    let numberOfDays = 100;
    let dayNumber = 1;
    let futureDate;

    //create calorie tasks
    for (let dayIndex = 0; (dayIndex - 1) < numberOfDays; dayIndex++) {
    
        futureDate = addDays(planStartDate, dayIndex);
        
        let dayData = {
            
            date: futureDate,
            completed: false,
            type: 'calorieGoal',
            calorieGoalNumber: 1500,
            text: "Did you eat " + this.calorieGoalNumber + "calories today?",
            userResult: 0,
            dayNumber : dayIndex
        };
          
        db.collection("plans/QJjvFnRpxOVFj7ZdjM3w/tasks").add(dayData);
    }

    //create workout tasks
    for (let dayIndex = 0; (dayIndex - 1) < numberOfDays; dayIndex++) {
        futureDate = addDays(planStartDate, dayIndex);

        let taskData = {

            date: futureDate,
            completed: false,
            type: 'workoutGoal',
            workoutType: 'general',
            dayNumber : dayIndex
        };

        db.collection("plans/QJjvFnRpxOVFj7ZdjM3w/tasks").add(taskData);
    }
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

document.addEventListener("DOMContentLoaded", startUpTheCalculator);
function startUpTheCalculator() {
    console.log(shepherdGreeting);

    readInTasksAndPutIntoDays();
}