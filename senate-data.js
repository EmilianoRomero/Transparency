//----------------------------------------------------------------------------------------------------------------
//FILE: senate-data.js
//LINKED TO: pro-congress-113-senate.js & to senate-data.html
//----------------------------------------------------------------------------------------------------------------

//------------------------------
// 01. TABLE id = senate-data
//------------------------------

//let members = data.results[0].members;

function CreateTableFromJSON(members) {

    var tbody = document.getElementById("tbodysenate-data");
    tbody.innerHTML = "";
    for (var i = 0; i < members.length; i++) {

        var tr = document.createElement("TR")
        var td1 = document.createElement("TD")
        var lastName = members[i].last_name
        var firstName = members[i].first_name
        var midName = ""
        if (members[i].middle_name != null) {
            midName = members[i].middle_name;
        }
        let fullName = firstName + " " + midName + " " + lastName
        td1.innerHTML = fullName.link(members[i].url)
        tr.appendChild(td1)

        var td2 = document.createElement("TD")
        let party = members[i].party
        td2.innerHTML = party
        tr.appendChild(td2)

        var td3 = document.createElement("TD")
        let seniority = members[i].seniority
        td3.innerHTML = seniority
        tr.appendChild(td3)

        var td4 = document.createElement("TD")
        let state = members[i].state
        td4.innerHTML = state
        tr.appendChild(td4)

        var td5 = document.createElement("TD")
        let votesWithPartyPct = members[i].votes_with_party_pct
        td5.innerHTML = votesWithPartyPct
        tr.appendChild(td5)

        tbody.appendChild(tr)
    }
}
//CreateTableFromJSON(members);

//Getting rid of the duplicated states
function removeDupl(members) {
    let noDuplicates = [];
    members.forEach(function (member) {
        if (!noDuplicates.includes(member.state)) {
            noDuplicates.push(member.state)
        }
    })
    console.log(noDuplicates)
    noDuplicates.sort()
    console.log(noDuplicates)
}
//    createStateSelect(noDuplicates);
//    removeDupl(members);

//Feeds the selector for the states from the array without duplicates
function createStateSelect(noDuplicates) {
    let select = document.getElementById("filterbystate")
    for (let i = 0; i < noDuplicates.length; i++) {
        let states = noDuplicates[i]
        let option = document.createElement("option")
        option.textContent = states
        option.value = states
        console.log(states)
        select.appendChild(option)
    }
}
//createStateSelect(noDuplicates)


//IS NOT WORKING PROPERLY
function getInputsSelections() {
    //Inputs selection separated now from the original piece of code and then call to the filtering function
    //which will create the array based on the selections performed in the input
    //The checkboxes
    let checkedBoxes = document.querySelectorAll("input[name=party]:checked");
    checkedBoxes.addEventListener(":checked", filterMembers,true); //cannot get what true or false implies -->*
    let checkedBoxesArray = Array.from(checkedBoxes).map(checkbox => checkbox.value);

    //The Dropdown List
    let selectedState = document.getElementById("filterbystate").value;
    selectedState.addEventListener("value", filterMembers, true); //*--> or even if they are necessary in this case
    console.log(checkedBoxesArray)
    console.log(selectedState)
    //Feeding the filteredMembers f
    filterMembers(checkedBoxesArray, selectedState)
}

//------
//NOTES ABOUT THE LISTENER
//.querySelectorAll() returns a list, and that list doesn't have an .addEventListener() method
//.querySelector() instead, it returns the first matching element rather than a list. 
//If there could be more than one checkbox would be necessary to iterate over the list 
//to add a listener to each element in the list.
//------

//Filter function feeded by the selections of the check boxes and the selected state on the drop down menu
function filterMembers(checkedBoxesArray, selectedState) { //Filtro miembros por partido y por estado, y los empujo a un nuevo array según ifs del loop
    //    var checkedBoxes = document.querySelectorAll("input[name=party]:checked").addEventListener()
    //    var checkboxArray = Array.from(checkedBoxes).map(checkbox => checkbox.value);
    let filteredMembers = [];

    for (let i = 0; i < members.length; i++) {
        if (checkedBoxesArray.length == 0 && selectedState == "") {
            filteredMembers = members
        } else if (selectedState !== "" && checkedBoxesArray.length == 0) {
            if (selectedState.includes(members[i].state)) {
                filteredMembers.push(members[i])
            }
        } else if (checkedBoxesArray.length !== 0 && selectedState == "") {
            if (checkedBoxesArray.includes(members[i].party)) {
                filteredMembers.push(members[i])
            }
        } else {
            if (checkedBoxesArray.includes(members[i].party) && selectedState.includes(members[i].state)) {
                filteredMembers.push(members[i])
            }
        }
    }
    //buildFilteredMembersTable(filteredMembers)
    //   checkedBoxes.onchange = CreateTableFromJSON(filteredMembers)
    //    selectedState.onchange = CreateTableFromJSON(filteredMembers)
}
/*
function helperFunction() {
    filterMembers(members);
}
*/

/*
//CLEAR TABLE
function DeleteRows() {
    var rowCount = table.rows.length;
    for (var i = rowCount - 1; i > 0; i--) {
        table.deleteRow(i);
    }
}
var table = document.getElementById("senate-data");
*/