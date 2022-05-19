console.log(firebaseApp);
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
console.log(db);

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
                console.log(doc.id, " => ", doc.data());
                
                updatePlan(doc);

                getDaysFromPlan(user.uid, doc.id)

            });
        })
        .catch((error) => {
            console.log('Error gettings documents: ' + error);
        });

        //trying again
        db.collection('plans').get()
        .then((snapshot) => {
            snapshot.docs.forEach(doc => {
                console.log(doc.data())
            })
        })

        //trying to get a subcollection
        db.collection("plans/QJjvFnRpxOVFj7ZdjM3w/days").get()
        .then((snapshot) => {
            snapshot.docs.forEach(doc => {
                console.log("DID DAYS WORK??????");
                console.log(doc.data());

                let completionPercentage = (doc.data().completedTasks / doc.data().numberOfTasks);
                console.log('completionPercentage' + completionPercentage);        
            })
        })
        
    } else {
        //signed out
        whenSignedInSection.hidden = true;
        whenSignedOutSection.hidden = false;
    }
}

//TODO update this page to use the daysArray
function readInDaysAndDisplay(){
    //trying to get a subcollection
    daysArray.forEach(day => {
        console.log(day);
        // let dayNumber = doc.data().dayNumber;
        // let dayListItem = document.createElement('li');
        
        // var checkbox = document.createElement('input');
        // checkbox.type = "checkbox";
        // checkbox.checked = doc.data().checked;
        // //did that work?
        // checkbox.id = doc.id;
        // checkbox.onclick = checkDayCheckbox;

        // var label = document.createElement('label')

        // let planDayDate = (doc.data().date.toDate());            
        // let planDayDateString = planDayDate.toDateString();
        
        // label.appendChild(document.createTextNode('Day ' + dayNumber + ' Date: ' + planDayDateString));
        
        // dayListItem.appendChild(checkbox);
        // dayListItem.appendChild(label);

        // listOfDays.appendChild(dayListItem);   
    });
}

function readInTasksAndPutIntoDays(){
    console.log('loading and organizing tasks');
    db.collection("plans/QJjvFnRpxOVFj7ZdjM3w/tasks").orderBy("date").get()
    .then((snapshot) => {
        console.log(snapshot);

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
            console.log("WE GOT SOMETHING!");
            console.log("doc.id = " + doc.id, ", doc.data() = ", doc.data());
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

    let dayId = checkboxElement.id;

    let docReference = db.collection("plans/QJjvFnRpxOVFj7ZdjM3w/days").doc(dayId);

    docReference.get()
    .then((doc) => {
        let isDayChecked = doc.data().checked;
        console.log(isDayChecked);
        if (isDayChecked == true) {
            console.log('it is checked!');
            console.log('lets uncheck it');

            db.collection("plans/QJjvFnRpxOVFj7ZdjM3w/days/").doc(dayId).update({
                checked: false,
                checkedDateTime: new Date()
            });
        } else {
            console.log('it is not checked');
            console.log('let us check it');

            db.collection("plans/QJjvFnRpxOVFj7ZdjM3w/days/").doc(dayId).update({
                checked: true,
                checkedDateTime: new Date()
            });
        }
    })
    .catch((error) => {
        console.log('Error gettings documents: ' + error);
    });
}

function createDaysArray(tasksArray){
    console.log('creating the days array');
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
        
        console.log(taskDate); 
        console.log(daysDate); 

        if (daysDate.getTime() == taskDate.getTime()) {
            console.log('same day! add the task');
            daysArray[dayNumberTracker].dayTaskArray.push(task);
        } else {
            console.log('does not match, go to the next day');
            dayNumberTracker = dayNumberTracker + 1
        }
    });

    //todo read the data out like this - daysArray[0].dayTaskArray[0].data().completed

    
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
        //why isn't this showing up
        console.log('day number ' + (dayIndex+1) + ', the date is = ' + futureDate.toDateString());

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
    readInDaysAndDisplay();
    readInTasksAndPutIntoDays();
}


// let dayData = {
            
//     whereCreated: 'createPlan in the loop',
//     date: futureDate,
//     dayNumber : dayIndex, 
//     todoList: {
//         sleepTodo: {
//             sleepGoal: 8,
//             sleepTodoComplete: false
//         },
//         calorieTodo: {
//             calorieGoal: 1500,
//             calorieTodoComplete: false
//         },
//         workoutTodo: {
//             workoutTodoComplete: false
//         },
//         takePictureGoal: true,
//         mealsPlannedTodo: {
//             mealsPlannedTodoComplete: false
//         }
//     }
// };