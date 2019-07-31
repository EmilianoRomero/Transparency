//----------------------------------------------------------------------------------------------------------------
//FILE: statistics.js
//LINKED TO: senate-attendance-statistics.html and senate-partyloyalty-statistics.html and fetch-senate-attendance.js
//----------------------------------------------------------------------------------------------------------------
let dataStat = {
    "statistics": [{
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

//Mapping an array for party key
function mapMembersParty(members) {
    let membersParty = Array.from(members).map(prop => prop.party);
    console.log((membersParty).sort());
    separateByParty(membersParty)
}
//Generating an array for every party
function separateByParty(membersParty) {
    //Declaring the object statistics
    let statistics = dataStat.statistics;
    let membersPartyL = membersParty.length;
    let rep = [];
    let dem = [];
    let ind = [];
    //Filtering the mapped array for party depending on the party value
    for (let i = 0; i < membersPartyL; i++) {
        if (membersParty[i] == "R") {
            rep.push(membersParty[i]);
        } else if (membersParty[i] == "D") {
            dem.push(membersParty[i]);
        } else {
            ind.push(membersParty[i])
        };
    };
    //Defining the length of every array 
    let repL = rep.length
    let demL = dem.length
    let indL = ind.length

    //Assigning the value to each element in the table
    statistics[0].numberOfReps = repL
    statistics[1].numberOfReps = demL
    statistics[2].numberOfReps = indL
    statistics[3].numberOfReps = membersPartyL
    console.log(repL)
    console.log(demL)
    console.log(indL)
    console.log(membersPartyL)
}

//-------------------------------------------------------------
//----- GETTING THE AVERAGES -----//
//-------------------------------------------------------------

//mapping the array for the votes
function mapMembersVotes(members) {
    let membersVotes = Array.from(members).map(prop => prop.votes_with_party_pct);
    console.log(membersVotes);
    separateVotesByParty(membersVotes, members)
}
//This function is new. Was generated during the fetching process and replaces the three originally used
function separateVotesByParty(membersVotes, members) {

    let membersVotesL = membersVotes.length;
    let votesPartyRep = [];
    let votesPartyDem = [];
    let votesPartyInd = [];
    //Filtering the mapped array for party depending on the party value
    for (let i = 0; i < membersVotesL; i++) {
        if (members[i].party == "R") {
            votesPartyRep.push(membersVotes[i]);
        } else if (members[i].party == "D") {
            votesPartyDem.push(membersVotes[i]);
        } else {
            votesPartyInd.push(membersVotes[i])
        };
    };
    console.log(votesPartyRep)
    console.log(votesPartyDem)
    console.log(votesPartyInd)

    //Summatory
    function getSum(total, num) {
        return total + Math.round(num);
    }
    //Average
    function average(array) {
        //let avgRoundedUp = 
        return ((array.reduce(getSum, 0)) / (array.length)).toFixed(1);
        //console.log(avgRoundedUp)
    };
    //Applying the function to the votes of every Party
    console.log(average(votesPartyRep))
    console.log(average(votesPartyDem))
    console.log(average(votesPartyInd))
    console.log(average(membersVotes))

    //Defining the values to be sent to the table
    let avgVotesRep = average(votesPartyRep);
    let avgVotesDem = average(votesPartyDem);
    let avgVotesInd = average(votesPartyInd);
    let avgVotesMem = average(membersVotes);

    //Assigning the value to each element in the table
    //Declaring the object statistics
    let statistics = dataStat.statistics;
    statistics[0].prcVotedWithParty = avgVotesRep; //Assigning the value to each element in the table
    statistics[1].prcVotedWithParty = avgVotesDem;
    statistics[2].prcVotedWithParty = avgVotesInd;
    statistics[3].prcVotedWithParty = avgVotesMem;
    console.log(avgVotesRep)
    console.log(avgVotesDem)
    console.log(avgVotesInd)
    console.log(avgVotesMem)
}

//----------------------------------------------------------------------------------------------------------------------
// FEEDING THE HTML WITH THE DATA FOR SENATE AT GLANCE
//----------------------------------------------------------------------------------------------------------------------

let tbodyGlance = document.getElementById("glance")

function buildTable(statistics) {
    let statisticsL = statistics.length;
    for (i = 0; i < statisticsL; i++) {
        let rowGlance = document.createElement("TR")

        let td1Glance = document.createElement("TD")
        let party = statistics[i].party
        td1Glance.innerHTML = party
        rowGlance.appendChild(td1Glance)

        let td2Glance = document.createElement("TD")
        let numberOfReps = statistics[i].numberOfReps
        td2Glance.innerHTML = numberOfReps
        rowGlance.appendChild(td2Glance)

        let td3Glance = document.createElement("TD")
        let prcVotedWithParty = statistics[i].prcVotedWithParty
        td3Glance.innerHTML = prcVotedWithParty
        rowGlance.appendChild(td3Glance)

        tbodyGlance.appendChild(rowGlance)
    }
}

//----------------------------------------------------------------------------------------------------------------------
// FEEDING LOYALTY // % VOTES WITH PARTY
//----------------------------------------------------------------------------------------------------------------------

//Defining function to sort arrays ascending (from < to >)
let sortAscending = (arr, key) => {
    return arr.sort((a, b) => {
        return a[key] - b[key];
    });
};
//GETTING THE VALUES TO FEED LATER THE LOYALTY TABLE
//Defining the new array (destination array) for the minimum.
function feedsLeastTable(members) {
    let membersL = members.length;
    let iExclusion = (Math.round(0.1 * membersL) - 1);
    console.log(iExclusion)
    let least = []
    var i

    for (i = 0; i < membersL; i++) {
        if (members[i].votes_with_party_pct <= members[iExclusion].votes_with_party_pct) {
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
    }
    console.log("Object LEAST" + " ", least);
    buildLoyaltyTable(least, "tbodyleast")
};

//Defining the function to sort arrays descending (from > to <)
let sortDescending = (arr, key) => {
    return arr.sort((a, b) => {
        return b[key] - a[key];
    });
};
//GETTING THE VALUES TO FEED THE LOYALTY TABLE LATER 
//Defining the new array (destination array) for the maximum
function feedsMostTable(members) {
    let membersL = members.length;
    let iExclusion = (Math.round(0.1 * membersL) - 1);
    console.log(iExclusion)
    let most = []
    var i

    for (i = 0; i < membersL; i++) {
        if (members[i].votes_with_party_pct >= members[iExclusion].votes_with_party_pct) {

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
    }
    console.log("Object MOST" + " ", most); //10% Highest Participation represented by % of votes with the party
    buildLoyaltyTable(most, "tbodymost")
};

//----------------------------------------------------------------------------------------------------------------------
// FEEDING ATTENDANCE // % MISSED VOTES
//----------------------------------------------------------------------------------------------------------------------

//GETTING THE VALUES TO FEED THE TABLE LATER 
//Defining the new array (destination array) for the minimum. Highest Attendance --> lowestmissed_votes_pct
function feedsHighestAttendanceTable(members) {
    let membersL = members.length;
    let iExclusion = (Math.round(0.1 * membersL) - 1);
    console.log(iExclusion)
    let lowest = []
    var i

    for (i = 0; i < membersL; i++) {
        if (members[i].missed_votes_pct <= members[iExclusion].missed_votes_pct) {
            let member = {}
            let midName = ""

            if (members[i].middle_name != null) {
                midName = members[i].middle_name;
            }
            let lastName = members[i].last_name
            let firstName = members[i].first_name
            member.fullName = firstName + " " + midName + " " + lastName

            member.missedVotes = members[i].missed_votes

            member.missedVotesPct = (members[i].missed_votes_pct).toFixed(2)

            lowest.push(member);
        }
    }
    console.log("Object LOWEST" + " ", lowest); //10% Highest Attendance represented by lowest % of missed votes
    buildAttendanceTable(lowest, "tbodytop")
};

//Defining the new array (destination array) for the minimum 
//and creating an empty object to add the keys of interest. 
//Lowest Attendance --> highestmissed_votes_pct
function feedsLowestAttendanceTable(members) {
    let membersL = members.length;
    let iExclusion = (Math.round(0.1 * membersL) - 1);
    console.log(iExclusion)
    let highest = []
    var i

    for (i = 0; i < membersL; i++) {
        if (members[i].missed_votes_pct >= members[iExclusion].missed_votes_pct) {
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
    console.log("Object HIGHEST" + " ", highest); //10% Lowest Attendance represented by highest % of missed votes
    buildAttendanceTable(highest, "tbodybottom")
};

//----------------------------------------------------------------------------------------------------------------------
// CREATING LOYALTY & ATTENDANCE TABLES //
//----------------------------------------------------------------------------------------------------------------------

//Building the html Loyalty Table
function buildLoyaltyTable(array, bodyid) {
    let tbodyLoy = document.getElementById(bodyid)
    var arrayL = array.length
    var i

    for (i = 0; i < arrayL; i++) {

        let rowLoy = document.createElement("TR")

        let td1Loy = document.createElement("TD")
        td1Loy.innerHTML = array[i].fullName.link(array[i].url)
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

//Building the html Attendance Table
function buildAttendanceTable(array, bodyid) {
    let tbodyAtt = document.getElementById(bodyid)
    var arrayL = array.length
    var i

    for (i = 0; i < arrayL; i++) {

        let rowAtt = document.createElement("TR")

        let td1Att = document.createElement("TD")
        td1Att.innerHTML = array[i].fullName.link(array[i].url)
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