//----------------------------------------------------------------------------------------------------------------
//FILE: house statistics.js
//LINKED TO: house-attendance-statistics.html and house-partyloyalty-statistics.html
//----------------------------------------------------------------------------------------------------------------
let dataStatHouse = {
    "housestatistics": [{
            "party": "Republican",
            "numberOfReps": 0,
            "prcVotedWithParty": 0,
        },
        {
            "party": "Democrat",
            "numberOfReps": 0,
            "prcVotedWithParty": 0,
        },
        {
            "party": "Independent",
            "numberOfReps": 0,
            "prcVotedWithParty": 0,
        },
        {
            "party": "Total",
            "numberOfReps": 0,
            "prcVotedWithParty": 0,
        }
    ]
};

//----- RETRIEVING DATA FROM JSON -----//
//----------------------------------------------------------------------------------------------------------------------
// GETTING THE FIRST VALUES
//----------------------------------------------------------------------------------------------------------------------

let members = data.results[0].members; //Defining members array

let membersParty = Array.from(members).map(prop => prop.party); //Mapping an array for party key
console.log((membersParty).sort());

let rep = []; //Defining the an empty array for every party
let dem = [];
let ind = [];
for (let i = 0; i < membersParty.length; i++) {
    if (membersParty[i] == "R") {
        rep.push(membersParty[i]);
    } else if (membersParty[i] == "D") {
        dem.push(membersParty[i]);
    } else {
        ind.push(membersParty[i])
    };
}; //Filtering the mapped array for party depending on the party value

let repL = rep.length //Defining the length of every array 
let demL = dem.length
let indL = ind.length
let membersL = members.length

console.log(repL)
console.log(demL)
console.log(indL)
console.log(membersL)

let housestatistics = dataStatHouse.housestatistics
console.log(housestatistics)
let housestatisticsL = housestatistics.length

housestatistics[0].numberOfReps = repL //Assigning the value to each element in the table
housestatistics[1].numberOfReps = demL
housestatistics[2].numberOfReps = indL
housestatistics[3].numberOfReps = membersL

//-------------------------------------------------------------
//----- GETTING THE AVERAGES -----//
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
let sumRep = votesRep.reduce(getSum, 0)
console.log(sumRep)
let avgRep = sumRep / repL
console.log(avgRep)
let avgRepRoundedUp = avgRep.toFixed(1);
//Getting the summatory and the average of %voted with the party for D
let sumDem = votesDem.reduce(getSum, 0);
console.log(sumDem);
let avgDem = sumDem / demL;
console.log(avgDem);
let avgDemRoundedUp = avgDem.toFixed(1);
//Getting the summatory and the average of %voted with the party for I
let sumInd = votesInd.reduce(getSum, 0);
console.log(sumInd);
let avgInd = sumInd / indL
if (sumInd == 0) {
    avgInd = "--"
}
console.log(avgInd);

//Getting the Avergae for the total
console.log(membersL)
let totalVotes = membersVotes.reduce(getSum, 0)
console.log(totalVotes)
let avgTotal = totalVotes / membersL
console.log(avgTotal)
let avgTotalRoundedUp = avgTotal.toFixed(1)
console.log(avgTotalRoundedUp)

housestatistics[0].prcVotedWithParty = avgRepRoundedUp; //Assigning the value to each element in the table
housestatistics[1].prcVotedWithParty = avgDemRoundedUp;
housestatistics[2].prcVotedWithParty = avgInd;
housestatistics[3].prcVotedWithParty = avgTotalRoundedUp;

//----------------------------------------------------------------------------------------------------------------------
// FEEDING THE HTML WITH THE DATA FOR SENATE AT GLANCE
//----------------------------------------------------------------------------------------------------------------------

let tbodyGlance = document.getElementById("glance")

function buildTable(housestatistics) {

    for (i = 0; i < housestatisticsL; i++) {
        let rowGlance = document.createElement("TR")

        let td1Glance = document.createElement("TD")
        let party = housestatistics[i].party
        td1Glance.innerHTML = party
        rowGlance.appendChild(td1Glance)

        let td2Glance = document.createElement("TD")
        let numberOfReps = housestatistics[i].numberOfReps
        td2Glance.innerHTML = numberOfReps
        rowGlance.appendChild(td2Glance)

        let td3Glance = document.createElement("TD")
        let prcVotedWithParty = housestatistics[i].prcVotedWithParty
        td3Glance.innerHTML = prcVotedWithParty
        rowGlance.appendChild(td3Glance)

        tbodyGlance.appendChild(rowGlance)
    }
}
buildTable(housestatistics);

//----------------------------------------------------------------------------------------------------------------------
// LOYALTY // % VOTES WITH PARTY
//----------------------------------------------------------------------------------------------------------------------

//var members = data.results[0].members; //Defining members array
console.log(members)
console.log(membersL)

//Defining (anonymus?) callback functions to sort arrays ascending (from < to >)
let sortAscending = (arr, key) => {
    return arr.sort((a, b) => {
        return a[key] - b[key];
    });
};

//sorting the array based on votes_with_party_pct values from lowest to highest values
console.log(sortAscending(members, "votes_with_party_pct"));

//Defining the condition of exclusion for the minimum
let conditionMin = 0.1 * membersL //destination array must have 10% values (n) of the original array
console.log(conditionMin) //n Members that belong to the 10% of members who least voted with the party
let conditionMinRound = Math.round(conditionMin) //rounding the results
console.log(conditionMinRound) //Integer of Members that belong to the 10% of members who least voted with the party
let iMin = conditionMinRound - 1 //substracting in order to get i (zero based) instead of n (1 based)
console.log(iMin); //i elements that belong to the 10% of members who least voted with the party

//GETTING THE VALUES TO FEED LATER THE TABLE
//Defining the new array (destination array) for the minimum.
let least = []
let leastL = least.length

for (i = 0; i < membersL; i++) {
    if (members[i].votes_with_party_pct <= members[iMin].votes_with_party_pct) {
        let member = {}
        let midName = ""

        if (members[i].middle_name != null) {
            midName = members[i].middle_name;
        }
        let lastName = members[i].last_name
        let firstName = members[i].first_name
        member.fullName = firstName + " " + midName + " " + lastName

        member.votes = members[i].total_votes

        member.votesWithPartyPct = (members[i].votes_with_party_pct).toFixed(1)

        least.push(member);
    }
};
console.log("Object LEAST" + " ", least);

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

//Defining the new array (destination array) for the maximum
let most = []
let mostL = most.length

for (i = 0; i < membersL; i++) {
    if (members[i].votes_with_party_pct >= members[iMax].votes_with_party_pct) {

        let member = {}
        let midName = ""

        if (members[i].middle_name != null) {
            midName = members[i].middle_name;
        }
        let lastName = members[i].last_name
        let firstName = members[i].first_name
        member.fullName = firstName + " " + midName + " " + lastName

        member.votes = members[i].total_votes

        member.votesWithPartyPct = (members[i].votes_with_party_pct).toFixed(1)

        most.push(member);
    }
};
console.log("Object MOST" + " ", most); //10% Highest Participation with party represented by % of votes with the party

////////////////////ACA ESTABA LA CREACION DE LA TABLA LOYALTY

//----------------------------------------------------------------------------------------------------------------------
// ATTENDANCE // % MISSED VOTES
//----------------------------------------------------------------------------------------------------------------------

//sorting the array based on missed_votes_pct values from lowest to highest values
console.log(sortAscending(members, "missed_votes_pct"));

//Defining the new array (destination array) for the minimum. Highest Attendance --> lowestmissed_votes_pct
let highest = []
let highestL = highest.length

for (i = 0; i < membersL; i++) {
    if (members[i].missed_votes_pct <= members[iMin].missed_votes_pct) {
        let member = {}
        let midName = ""

        if (members[i].middle_name != null) {
            midName = members[i].middle_name;
        }
        let lastName = members[i].last_name
        let firstName = members[i].first_name
        member.fullName = firstName + " " + midName + " " + lastName

        member.missedVotes = members[i].missed_votes

        member.missedVotesPct = (members[i].missed_votes_pct).toFixed(1)

        highest.push(member);
    }
}
console.log("Object HIGHEST" + " ", highest); //10% Highest Attendance represented by % of missed votes:


//sorting the array based on missed_votes_pct values from highest to lowest values
console.log(sortDescending(members, "missed_votes_pct"));

//Defining the new array (destination array) for the minimum 
//and creating an empty object to add the keys of interest. 
//Highest Attendance --> lowestmissed_votes_pct
let lowest = []
let lowestL = lowest.length

for (i = 0; i < membersL; i++) {
    if (members[i].missed_votes_pct >= members[iMin].missed_votes_pct) {
        let member = {}
        let midName = ""

        if (members[i].middle_name != null) {
            midName = members[i].middle_name;
        }
        let lastName = members[i].last_name
        let firstName = members[i].first_name
        member.fullName = firstName + " " + midName + " " + lastName

        member.missedVotes = members[i].missed_votes

        member.missedVotesPct = (members[i].missed_votes_pct).toFixed(1)

        lowest.push(member);
    }
}
console.log("Object LOWEST" + " ", lowest); //10% Lowest Attendance represented by % of missed votes

//Feeding the html table
function getPage() {
    if (document.title.includes("Loyalty")) {
        buildLoyaltyTable(least, "tbodyleast")
        buildLoyaltyTable(most, "tbodymost")
    } else {
        buildAttendanceTable(highest, "tbodybottom")
        buildAttendanceTable(lowest, "tbodytop")
    }
}
getPage()

function buildLoyaltyTable(array, bodyid) {
    console.log(bodyid)
    let tbodyLoy = document.getElementById(bodyid)
    let arrayL = array.length
    console.log(tbodyLoy)
    for (i = 0; i < arrayL; i++) {
        let rowLoy = document.createElement("TR")

        let td1Loy = document.createElement("TD")
        td1Loy.innerHTML = array[i].fullName.link(members[i].url)
        rowLoy.appendChild(td1Loy)

        let td2Loy = document.createElement("TD")
        td2Loy.innerHTML = array[i].votes
        rowLoy.appendChild(td2Loy)

        let td3Loy = document.createElement("TD")
        td3Loy.innerHTML = array[i].votesWithPartyPct
        rowLoy.appendChild(td3Loy)

        tbodyLoy.appendChild(rowLoy)
    }
    
}


//Feeding the html table

function buildAttendanceTable(array, bodyid) {

    let tbodyAtt = document.getElementById(bodyid)
    let arrayL = array.length

    for (i = 0; i < arrayL; i++) {
        let rowAtt = document.createElement("TR")

        let td1Att = document.createElement("TD")
        td1Att.innerHTML = array[i].fullName.link(members[i].url)
        rowAtt.appendChild(td1Att)

        let td2Att = document.createElement("TD")
        td2Att.innerHTML = array[i].missedVotes
        rowAtt.appendChild(td2Att)

        let td3Att = document.createElement("TD")
        td3Att.innerHTML = array[i].missedVotesPct
        rowAtt.appendChild(td3Att)

        tbodyAtt.appendChild(rowAtt)
    }

}