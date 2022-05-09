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

function readInDaysAndDisplay(){
    //trying to get a subcollection
    db.collection("plans/QJjvFnRpxOVFj7ZdjM3w/days").orderBy("date").limit(3).get()
    .then((snapshot) => {
        snapshot.docs.forEach(doc => {
            

            let dayNumber = doc.data().dayNumber;
            let dayListItem = document.createElement('li');
            
            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.checked = false;
            checkbox.id = "dayNumber";

            var label = document.createElement('label')
            label.appendChild(document.createTextNode('Day ' + dayNumber));

            dayListItem.appendChild(checkbox);
            dayListItem.appendChild(label);

            listOfDays.appendChild(dayListItem);   
        })
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

    dayNumberIncrement = dayNumberIncrement + 1;
    db.collection("plans/QJjvFnRpxOVFj7ZdjM3w/days").add({
        numberOfTasks: 8,
        completedTasks: 3,
        date: 2022-05-07,
        dayNumber : dayNumberIncrement
    });

    // let dayId = '6gdLds0vnQGYw8WTyPAD';
    // db.collection("plans/QJjvFnRpxOVFj7ZdjM3w/days/").doc(dayId).update({
    //     numberOfTasks: 50,
    //     completedTasks: 3,
    //     date: 2022-05-07,
    //     dayNumber : dayNumberIncrement
    // });
}

function createPlan(){
    let planStartDate = new Date("02 May 2022 06:30:00");
    let numberOfDays = 100;
    let dayNumber = 1;
    let futureDate;

    for (let dayIndex = 0; (dayIndex - 1) < numberOfDays; dayIndex++) {
    
        futureDate = addDays(planStartDate, dayIndex);

        console.log('day number ' + (dayIndex+1) + ', the date is = ' + futureDate);

        let dayData = {
            
            whereCreated: 'createPlan in the loop',
            date: futureDate,
            dayNumber : dayIndex, 
            todoList: {
                sleepTodo: {
                    sleepGoal: 8,
                    sleepTodoComplete: false
                },
                calorieTodo: {
                    calorieGoal: 1500,
                    calorieTodoComplete: false
                },
                workoutTodo: {
                    workoutTodoComplete: false
                },
                takePictureGoal: true,
                mealsPlannedTodo: {
                    mealsPlannedTodoComplete: false
                }
            }
        };
          
        db.collection("plans/QJjvFnRpxOVFj7ZdjM3w/days").add(dayData);
    }

    readInDaysAndDisplay();
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

document.addEventListener("DOMContentLoaded", startUpTheCalculator);
function startUpTheCalculator() {
    console.log(shepherdGreeting);
}