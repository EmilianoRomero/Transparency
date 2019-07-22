//----------------------------------------------------------------------------------------------------------------
//FILE: senate-data.js
//LINKED TO: pro-congress-113-senate.js & to senate-data.html
//----------------------------------------------------------------------------------------------------------------

//------------------------------
// 01. TABLE id = senate-data
//------------------------------

var members = data.results[0].members;

function CreateTableFromJSON() {

    var table = document.getElementById("senate-data");

    var checkedBoxes = document.querySelectorAll("input[name=party]:checked");
    var checkboxArray = Array.from(checkedBoxes).map(checkbox => checkbox.value);

    var selectedState = document.getElementById("filterbystate").value; //DEFINES + LINKS OPTIONS OF THE DROPDOWN MENU
    var select = document.getElementById("filterbystate");

    for (var i = 0; i < members.length; i++) {
        {
            members.sort(function (a, b) {
                if (a.state > b.state) {
                    return 1;
                }
                if (a.state < b.state) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });

            var option = document.createElement("option");
            var states = members[i].state;
            option.textContent = states;
            option.value = states;
            select.appendChild(option);

            //___________________________________________________
            //var membersParty = Array.from(members).map(prop => prop.party);
            //console.log(membersParty);

            var parties = members[i].party;
            //var arrayParties = [];

            //if (members.party === "R") {
            //    arrayParties.push(parties);//.map(party => parties[party]));
            }
            //console.log(Object.keys(parties).map(party => parties[party]));
            //            //
            //console.log(arrayParties);

            for(var i = 0; i < parties.length; i++) {
                var obj = parties[i];
            
                console.log(obj.party);
            }

            //    console.log(Object.values(parties));
            //    console.log (parties.length);
            //    console.log(Object.keys(parties).map(party => parties[party]));
            //var i;
            //var parties = members[i].party;
            //var partyR = parties.filter(myFunction);
            //function myFunction(party, index, array) {
            //  return party == R;
            //}
            //console.log(parties);
            //___________________________________________________
            //    console.log(members.length);
        }
        if ((((checkboxArray.includes(members[i].party) == -1) && (selectedState.includes(members[i].state) == -1)) ||
                ((checkboxArray.includes(members[i].party) == -1) && (selectedState.includes(members[i].state))) ||
                ((checkboxArray.includes(members[i].party)) && (selectedState.includes(members[i].state))) == -1 ||
                ((checkboxArray.includes(members[i].party)) && (selectedState.includes(members[i].state))))) {

            var tr = document.createElement("TR");

            var td1 = document.createElement("TD");
            var lastName = members[i].last_name;
            var firstName = members[i].first_name;
            var midName = members[i].middle_name;
            var noMidName = lastName + " " + firstName;
            var yesMidName = lastName + " " + firstName + " " + midName;
            tr.appendChild(td1);

            var td2 = document.createElement("TD");
            td2.innerHTML = members[i].party;
            tr.appendChild(td2);

            var td3 = document.createElement("TD");
            td3.innerHTML = members[i].seniority;
            tr.appendChild(td3);

            var td4 = document.createElement("TD");
            td4.innerHTML = members[i].state;
            tr.appendChild(td4);

            var td5 = document.createElement("TD");
            td5.innerHTML = members[i].votes_with_party_pct;
            tr.appendChild(td5);

            table.appendChild(tr);

            if (members[i].middle_name === null || members[i].middle_name === undefined ||
                members[i].middle_name === "") {
                td1.innerHTML = noMidName.link(members[i].url);
                console.log(noMidName.link(members[i].url));
                console.log(members[i].party);
                console.log(members[i].seniority);
                console.log(members[i].state);
                console.log("%" + members[i].votes_with_party_pct);
            } else {
                td1.innerHTML = yesMidName.link(members[i].url);
                console.log(yesMidName.link(members[i].url));
                console.log(members[i].party);
                console.log(members[i].seniority);
                console.log(members[i].state);
                console.log("%" + members[i].votes_with_party_pct);
            }
        }
    }
};

CreateTableFromJSON(members);



//var option = document.createElement("option"); //Defines and creates the option in dropdown in html
//var select = document.getElementById("filterbystate"); //Defines and links the option list content in html
//table.innerHTML = "";

//Defines and creates the option in dropdown in html
//    var select = document.getElementById("filterbystate"); //Defines and links the option list content in html
//    var statesArray = (members[i].state);


//for (var i =0; i < members.length; i++) {
//    var option = document.createElement("option");
//    var select = document.getElementById("state");
//    option.text = members[i].state;
//    select.appendChild(option);

//var uniqueArray = Array.from(new Set(duplicatedArray));//.map(droplistSelection => droplistSelection.option);
//}
//---

//  var statesArray = members[i].state;
//  var noRepeatedStatesArray = [];
//  var len = statesArray.length;
//  for (var i = 0; i < len; i++) {
//  if (noRepeatedStatesArray.indexOf(statesArray[i]) === -1) {
//  noRepeatedStatesArray.push(statesArray[i]);
//  }

//  var z;
//  var len = statesArray.length;
//  var out = [];
//  var obj = {};
//  for (z = 0; z < len; z++) {
//      obj[statesArray[z]] = 0;
//  }
//  for (z in obj) {
//      out.push(z);
//  }

//    var el = document.createElement("option");


//var uniqueArray = [... new Set(members.map(filterbystate => filterbystate.state))];
//var uniqueArray = Array.from(new Set(members.map(filterbystate => filterbystate.state)));
//statesList = uniqueArray.join(" ");

//    option.innerHTML = statesList; //Defines the content of each option (the content of the members state array)
//    select.appendChild(option); //appends the child option to its parent select



//  var st = $("#choosestate").val();
//  var sts = st ? [st] : [];

//  $("#senate-data tr").each(function () {
//  var st = $(this).find(".state").text();
//  var stSelected = isIncluded(st, sts);
//  $(this).toggle(stSelected);
//});

//--- x is included if lst is empty or contains x
//  function isIncluded(x, lst) {
//  return lst.length === 0 || lst.indexOf(x) != -1;
//  }
//
//  $("#filterform").on("change", updateUI);