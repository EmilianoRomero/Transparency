//----------------------------------------------------------------------------------------------------------------
//FILE: statistics.js
//LINKED TO: senate-attendance-statistics.html and senate-partyloyalty-statistics.html
//----------------------------------------------------------------------------------------------------------------
var dataStat = {
    "statistics": [{
            "party": "Republican",
            "numberOfReps": 0,
            "prcVotedWithParty": 92.0
        },
        {
            "party": "Democrat",
            "numberOfReps": 57,
            "prcVotedWithParty": 91.9
        },
        {
            "party": "Independent",
            "numberOfReps": 2,
            "prcVotedWithParty": 83.5
        }
    ]
}

//1//----- RETRIEVING DATA FROM JSON -----//

var members = data.results[0].members; //Defining members array

var membersParty = Array.from(members).map(prop => prop.party); //Mapping an array for party key
console.log((membersParty).sort());

var rep = []; //Defining the an empty array for every party
var dem = [];
var ind = [];
for (var i = 0; i < membersParty.length; i++) {
    if (membersParty[i] == "R") {
        rep.push(membersParty[i]);
    } else if (membersParty[i] == "D") {
        dem.push(membersParty[i]);
    } else {
        ind.push(membersParty[i])
    };
}; //Filtering the mapped array for party depending on the party value

let repL = rep.length; //Defining the length of every array 
let demL = dem.length;
let indL = ind.length;
dataStat.statistics[0].numberOfReps = repL;
console.log(repL);
console.log(demL);
console.log(indL);

/*POR QUÉ NO FUNCIONA?
function sortByParty(arr, key) {
    let rep = []; //Defining the an empty array for every party
    let dem = [];
    let ind = [];
    arrL = arr.length;
    for (let i = 0; i < arrL; i++) {
        if (key == "R") {
            rep.push(arr[i]);
        } else if (key == "D") {
            dem.push(arr[i]);
        } else {
            ind.push(arr[i])
        };
    }; //Filtering the mapped array for party depending on the party value
};
console.log(sortByParty(members, "party"));
*/


//-------------------------------------------------------------
//2//----- STATISTICS OBJECT ORIGINALLY CREATED IN HTML -----//
//-------------------------------------------------------------


let statistics = dataStat.statistics
console.log(statistics);
let dataStatL = dataStat.length;
let table = document.getElementById("senateAtGlance")

function buildTable(dataStat) {

    for (i = 0; i < dataStatL; i++) {
        let row = document.createElement("TR")

        let td1 = document.createElement("TD")
        let party = dataStat[i].party
        td1.innerHTML = party
        row.appendChild(td1)

        let td2 = document.createElement("TD")
        let numberOfReps = dataStat[i].numberOfReps
        td2.innerHTML = numberOfReps
        row.appendChild(td2)

        let td3 = document.createElement("TD")
        let prcVotedWithParty = dataStat[i].prcVotedWithParty
        td3.innerHTML = prcVotedWithParty
        row.appendChild(td3)

        tbody.appendChild(row)
    }
}
buildTable(dataStat);

/*        dataStat.statistics[0].party + " " + dataStat.statistics[0].numberOfReps + " " + dataStat.statistics[0].prcVotedWithParty;
    let party = dataStat.statistics[i].party
    TD1.innerHTML = Party;
};*/



//-------------------------------------------------------------
//3//----- AVERAGE -----//
//-------------------------------------------------------------

let membersVotes = Array.from(members).map(prop => prop.votes_with_party_pct); //mapping the array for the votes
console.log(membersVotes);

//mapping the array for the votes pivoting on the R as fixed variable
let votesPartyRep = rep.map((p, i) => {
    if (p == "R");
    return {
        rep: p,
        votes: membersVotes[i]
    }
});
console.log(votesPartyRep);


let votesRep = Array.from(votesPartyRep).map(prop => prop.votes);
console.log(votesRep);

//mapping the array for the votes pivoting on the D as fixed variable
let votesPartyDem = dem.map((p, i) => {
    if (p == "D");
    return {
        dem: p,
        votes: membersVotes[i]
    }
});
console.log(votesPartyDem);

let votesDem = Array.from(votesPartyDem).map(prop => prop.votes);
console.log(votesDem);

//mapping the array for the votes pivoting on the I as fixed variable
let votesPartyInd = ind.map((p, i) => {
    if (p == "I");
    return {
        ind: p,
        votes: membersVotes[i]
    }
});
console.log(votesPartyInd);
let votesInd = Array.from(votesPartyInd).map(prop => prop.votes);
console.log(votesInd);

//Function summatory
function getSum(total, num) {
    return total + Math.round(num);
}
//Getting the summatory and the average of %voted with the party for R
let sumRep = votesRep.reduce(getSum, 0);
console.log(sumRep);
let avgRep = sumRep / repL;
console.log(avgRep);

//Getting the summatory and the average of %voted with the party for D
let sumDem = votesDem.reduce(getSum, 0);
console.log(sumDem);
let avgDem = sumDem / demL;
console.log(avgDem);

//Getting the summatory and the average of %voted with the party for I
let sumInd = votesInd.reduce(getSum, 0);
console.log(sumInd);
let avgInd = sumInd / indL;
console.log(avgInd);

/*
//redefine votesPar with sorted arrays
let vR = votesRep.sort();
console.log(vR);
let vRL = vR.length;

let vD = votesDem.sort();
console.log(vD);
let vDL = vD.length;

let vI = votesInd.sort();
console.log(vI);
let vIL = vI.length;

//Define conditions and variables: 
//each new array (leastR, leastD, leastI) must contain [i] quantity of senators <= 0.1*[i] in vR, vD and vI;
//*** IS NOT NECESSARY TO PREDEFINE IF I'M GOING TO USE FILTER, BUT IF I'M GOING TO USE FOR/WHILE *
let leastR = [];
let leastRL = leastR.length;

let leastD = [];
let leastDL = leastD.length;

let leastI = [];
let leastIL = leastI.length;

//condition (c) values (uses asignmets defined in lines 30, 31 and 32 from this file)
let cR = 0.1 * repL;
console.log(cR);
let cRRound = Math.round(cR);
console.log(cRRound);

let cD = 0.1 * demL;
console.log(cD);
let cDRound = Math.round(cD);
console.log(cDRound);

let cI = 0.1 * indL;
console.log(cI);
let cIRound = Math.round(cI);
console.log(cIRound);

//function min
let minR = Math.min(...vR);
console.log(minR);

let minD = Math.min(...vD);
console.log(minD);

let minI = Math.min(...vI);
console.log(minI);


//FUNCTION
i = 0;
while (vR[i] <= vR[4]) {
    leastR.push(vR[i]);
    i++;
};
console.log(leastR);

i = 0;
while (vD[i] <= vD[5]) {
    leastD.push(vD[i]);
    i++;
};
console.log(leastD);
*/
//----------------------------------------------------------------------------------------------------------------------
// WORKING WITH ALL THE PARTIES TOGETHER // % VOTES WITH PARTY
//----------------------------------------------------------------------------------------------------------------------

//var members = data.results[0].members; //Defining members array
console.log(members);
let membersL = members.length;

//Defining (anonymus?) callback functions to sort arrays ascending (from < to >)
let sortAscending = (arr, key) => {
    return arr.sort((a, b) => {
        return a[key] - b[key];
    });
};

//sorting the array based on votes_with_party_pct values from lowest to highest values
console.log(sortAscending(members, "votes_with_party_pct"));

//Defining the condition of exclusion for the minimum
let conditionMin = 0.1 * membersL; //destination array must have 10% values (n) of the original array
console.log(conditionMin); //n Members that belong to the 10% of members who least voted with the party
let conditionMinRound = Math.round(conditionMin); //rounding the results
console.log(conditionMinRound); //Integer of Members that belong to the 10% of members who least voted with the party
let iMin = conditionMinRound - 1; //substracting in order to get i (zero based) instead of n (1 based)
console.log(iMin); //i elements that belong to the 10% of members who least voted with the party

//Defining the new array (destination array) for the minimum. POR QUÉ NO SE QUEDA ESTE ARRAY?
let least = [];
let leastL = least.length;
for (i = 0; i < membersL; i++) {
    if (members[i].votes_with_party_pct <= members[iMin].votes_with_party_pct) {
        least.push(members[i].votes_with_party_pct);
    }
};
console.log(least); //10% Lowest Participation with party represented by % of votes with the party

//---------------
//Defining (anonymus?) callback functions to sort arrays descending (from > to <)
let sortDescending = (arr, key) => {
    return arr.sort((a, b) => {
        return b[key] - a[key];
    });
};
//sorting the array based on votes_with_party_pct values from lowest to highest values
console.log(sortDescending(members, "votes_with_party_pct"));

//Defining the condition of exclusion for the minimum
let conditionMax = 0.1 * membersL; //destination array must have 10% values (n) of the original array
console.log(conditionMax); //n Members that belong to the 10% of members who most voted with the party
let conditionMaxRound = Math.round(conditionMax); //rounding the results
console.log(conditionMaxRound); //Integer of Members that belong to the 10% of members who most voted with the party
let iMax = conditionMaxRound - 1; //substracting in order to get i (zero based) instead of n (1 based)
console.log(iMax); //i elements that belong to the 10% of members who most voted with the party

//Defining the new array (destination array) for the minimum
let most = [];
let mostL = most.length;
for (i = 0; i < membersL; i++) {
    if (members[i].votes_with_party_pct >= members[iMax].votes_with_party_pct) {
        most.push(members[i].votes_with_party_pct);
    }
};
console.log(most); //10% Highest Participation with party represented by % of votes with the party 

//----------------------------------------------------------------------------------------------------------------------
// WORKING WITH ALL THE PARTIES TOGETHER //  ATTENDANCE
//----------------------------------------------------------------------------------------------------------------------
//sorting the array based on missed_votes_pct values from lowest to highest values
console.log(sortAscending(members, "missed_votes_pct"));

//Defining the new array (destination array) for the minimum. Highest Attendance --> lowestmissed_votes_pct
let highest = [];
let highestL = highest.length;
for (i = 0; i < membersL; i++) {
    if (members[i].missed_votes_pct <= members[iMin].missed_votes_pct) {
        highest.push(members[i].missed_votes_pct);
    }
};
console.log(highest); //10% Highest Attendance represented by % of missed votes:

//sorting the array based on missed_votes_pct values from highest to lowest values
console.log(sortDescending(members, "missed_votes_pct"));

//Defining the new array (destination array) for the minimum. Highest Attendance --> lowestmissed_votes_pct
let lowest = [];
let lowestL = lowest.length;
for (i = 0; i < membersL; i++) {
    if (members[i].missed_votes_pct >= members[iMin].missed_votes_pct) {
        let member = {}
        member.firstName = members[i].first_name;
        lowest.push(member);
    }
};
console.log(lowest); //10% Lowest Attendance represented by % of missed votes:


/*function buildTable(senateGlance) {

    var tbody = document.getElementById("senate-at-glance");
    tbody.innerText = "";
    for (i = 0; i < membersL; i++) {
        var row = document.createElement("TR")

        var TD1 = document.createElement("TD")
        var party =
    }
}












/*
//sorting the array based on votes_with_party_pct values from lowest to highest values
members.sort(function (a, b) {
    return b.votes_with_party_pct - a.votes_with_party_pct
});
console.log(members);

/*let {
    last_name,
    first_name,
    middle_name,
    id,
    party,
    total_votes,
    votes_with_party_pct,
    partialObject
} = membersSortedByVotesWithParty;

var pick = function (obj, props) {
    'use strict';
    for (i = 0; i < iMin; i++) {
        // Make sure object and properties are provided
        if (!obj || !props) return;
        // Create new object
        var picked = {};
        // Loop through props and push to new object
        props.forEach(function (prop) {
            picked[prop] = obj[prop];
        });
        // Return new object
        return picked;
    }
};
let selectedKeys = pick(membersSortedByVotesWithParty[i], ["last_name", "first_name", "middle_name", "id", "party", "total_votes", "votes_with_party_pct"]);

console.log(selectedKeys);

//Creating array based only on the below mentioned properties
//let newObject = Array.from(membersSortedByVotesWithParty).map(key => [key.last_name, key.first_name, key.middle_name, key.id, key.party, key.total_votes, key.votes_with_party_pct]);

//let membersVotes = Array.from(members).map(prop => prop.votes_with_party_pct); //mapping the array for the votes
//console.log(membersVotes);

//Creating array based only on the below mentioned properties
let membersSortedByVotesWithParty = Array.from(least).map(key => [key.last_name, key.first_name, key.middle_name, key.id, key.party, key.total_votes, key.votes_with_party_pct]);
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//let membersL = members.length;
//let lName = members[i].last_name;
//let fName = members[i].first_name;
//for (i = 0; i < membersL; i++) {
//    let mName = ""
//    if (members[i].middle_name != null) {
//        mName = (members[i].middle_name);
//    }
//    let fullName = lName + " " + fName + " " + mName