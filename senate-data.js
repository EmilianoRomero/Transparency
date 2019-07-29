//----------------------------------------------------------------------------------------------------------------
//FILE: senate-data.js
//LINKED TO: pro-congress-113-senate.js & to senate-data.html
//----------------------------------------------------------------------------------------------------------------

//------------------------------
// 01. TABLE id = senate-data
//------------------------------


function createTableFromJSON(members) {

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
    createStateSelect(noDuplicates);
}


//Feeds the selector for the states from the array without duplicates
function createStateSelect(noDuplicates) {
    let select = document.getElementById("filterbystate")
    for (let i = 0; i < noDuplicates.length; i++) {
        let states = noDuplicates[i]
        let option = document.createElement("option")
        option.textContent = states
        option.value = states
        select.appendChild(option)
    }
}

//This original functions provides the possible values for the inputs, not the selected ones
//Inputs selection separated now from the original piece of code and then call to the filtering function
//which will create the array based on the selections performed in the input
function getInputsValues(members) {
    let i;
    let checkBoxes = document.querySelectorAll("input[name=party]");
    let checkBoxesL = checkBoxes.length;
    for (i = 0; i < checkBoxesL; i++) {
        checkBoxes[i].addEventListener("change", function () {
            getInputsSelections(members)
        })
    }
    let selectedState = document.getElementById("filterbystate");
    selectedState.addEventListener("change", function () {
        getInputsSelections(members)
    });
}

//This new function collects the chosen values, the selected ones
//Helper function (Why cannot call directly filterMembers?)
function getInputsSelections(members) {
    console.log("i am here")
    let checkBoxes = document.querySelectorAll("input[name=party]:checked");
    let checkedBoxesArray = Array.from(checkBoxes).map(checkbox => checkbox.value);
    let selectedState = document.getElementById("filterbystate").value;
    console.log(checkedBoxesArray, selectedState)
    console.log(members)
    filterMembers(checkedBoxesArray, selectedState, members)
}


//Filter function feeded by the selections of the check boxes and the selected state on the drop down menu
function filterMembers(checkedBoxesArray, selectedState, members) {
    //Filtro miembros por partido y por estado, y los empujo a un nuevo array según ifs del loop
    let filteredMembers = [];
    let mL = members.length;
    let cBA = checkedBoxesArray;
    let cBAL = checkedBoxesArray.length;

    for (let i = 0; i < mL; i++) {
        if (cBAL == 0 && selectedState == "") {
            filteredMembers = members
        } else if (selectedState !== "" && cBAL == 0) {
            if (selectedState.includes(members[i].state)) {
                filteredMembers.push(members[i])
            }
        } else if (cBAL !== 0 && selectedState == "") {
            if (cBA.includes(members[i].party)) {
                filteredMembers.push(members[i])
            }
        } else {
            if (cBA.includes(members[i].party) && selectedState.includes(members[i].state)) {
                filteredMembers.push(members[i])
            }
        }
    }
    createTableFromJSON(filteredMembers);
}


//CLEAR TABLE
function deleteRows() {
    var rowCount = table.rows.length;
    for (var i = rowCount - 1; i > 0; i--) {
        table.deleteRow(i);
    }
}
var table = document.getElementById("senate-data");