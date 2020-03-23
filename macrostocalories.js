//function name ();
document.addEventListener("DOMContentLoaded", calculateCaloriesFromMacrosWhenPageLoads);


function calculateCaloriesFromMacrosWhenPageLoads() {

//get the inputs
//calc the results
//display the results

let proteinValue = 0;
let fatValue = 0;
let carbValue = 0;

let totalCaloriesInMacros = 0;

const proteinInputBox = document.getElementById('proteinInputBox');
const fatInputBox = document.getElementById('fatInputBox');
const carbInputBox = document.getElementById('carbInputBox');

const totalCalsInMacrosInsert = document.getElementsByName('totalCalsInMacrosInsert');

const calcCaloriesFromMacrosButton = document.getElementById('calcCaloriesFromMacrosButton');
calcCaloriesFromMacrosButton.addEventListener('click', recalcCalsFromMacros);

getTheInputs();
calcTheResults();
displayResults();

function getTheInputs(){
    proteinValue = proteinInputBox.value;
    fatValue = fatInputBox.value;
    carbValue = carbInputBox.value;
}

function calcTheResults(){
	totalCaloriesInMacros = (proteinValue * 4) + (fatValue * 9) + (carbValue * 4);
	totalCaloriesInMacros = roundNumPlace(totalCaloriesInMacros, 0);
}

function displayResults(){
    totalCalsInMacrosInsert.forEach( function(element, index) {
            element.textContent = totalCaloriesInMacros;
    });
}

function recalcCalsFromMacros(){
	getTheInputs();
	calcTheResults();
	displayResults();
}

function roundNumPlace(num, places) {
    return +(Math.round(num + "e+" + places)  + "e-" + places);
}

}



