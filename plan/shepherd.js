console.log(firebaseApp);
const shepherdGreeting = 'Hello. I am Shepherd.';

const auth = firebaseApp.auth();
const db = firebaseApp.firestore();

const whenSignedInSection = document.getElementById('whenSignedInSection');
const whenSignedOutSection = document.getElementById('whenSignedOutSection');

const signInWithGoogleButton = document.getElementById('signInWithGoogleButton');
const signOutButton = document.getElementById('signOutButton');

const userDetails = document.getElementById('userDetails');

const provider = new firebase.auth.GoogleAuthProvider();

signInWithGoogleButton.onclick = () => auth.signInWithPopup(provider);

signOutButton.onclick = () => auth.signOut();

auth.onAuthStateChanged(updateUiForUserState);

let userMessageH3 = document.createElement("h3");
userDetails.appendChild(userMessageH3);

//db section
console.log(db);

const planDetailsSection = document.getElementById('planDetailsSection');


let plansReference;
let unsubscribe;
//end db section

let listOfDays = document.getElementById('listOfDays');

displayListOfDays();

function displayListOfDays (){
    console.log('listing out the days');
}

function updateUiForUserState(user){
    if (user) {
        //signed in
        whenSignedInSection.hidden = false;
        whenSignedOutSection.hidden = true;

        userMessageH3.innerHTML = 'Hello ' + user.displayName;

        plansReference = db.collection('plans');

        plansReference.where('userId','==', user.uid).
        get()
        .then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                console.log(doc.data().collection('days'));
                
                updatePlan(doc);
                
                getDaysFromPlan(doc.id)

            });
        })
        .catch((error) => {
            console.log('Error gettings documents: ' + error);
        });
        
    } else {
        //signed out
        whenSignedInSection.hidden = true;
        whenSignedOutSection.hidden = false;
    }
}

function getDaysFromPlan(planId){
 
    plansReference = db.collection('plans');
    
    const usersPlanDays = plansReference.where('userId','==', user.uid).collection('days');

    usersPlanDays.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
        });
    });
}   

function updatePlan(doc) {
    const planLength = document.getElementById('planLength');
    planLength.innerHTML = 'Length: ' + doc.data().lengthInDays;

    const bodyFatChangeSection = document.getElementById('bodyFatChangeSection');
    bodyFatChangeSection.innerHTML = 'Staring body fat ' + doc.data().planStartingBodyFatPercentage
    + '% - Ending body fat ' + doc.data().planEndingBodyFatPercentage + '%.';
}

document.addEventListener("DOMContentLoaded", startUpTheCalculator);
function startUpTheCalculator() {
    console.log(shepherdGreeting);
}