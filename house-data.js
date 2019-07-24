//----------------------------------------------------------------------------------------------------------------
//FILE: house-data.js
//LINKED TO: pro-congress-113-house.js & to house-data.html
//----------------------------------------------------------------------------------------------------------------

//------------------------------
// 01. TABLE id = house-data
//------------------------------
let members = data.results[0].members;

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
CreateTableFromJSON(members);


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
removeDupl(members);


function createStateSelect(noDuplicates) {
    
    let select = document.getElementById("filterbystate")
        for (var i = 0; i < noDuplicates.length; i++) {
        members.sort(function (a, b) {
            if (a.state > b.state) {
                return 1;
            }
            if (a.state < b.state) {
                return -1;
            }
            return 0; // a must be equal to b
        })
        
        let states = noDuplicates[i]
        var option = document.createElement("option")
        option.textContent = states
        option.value = states
        console.log(states)
        select.appendChild(option)
    }
}
//createStateSelect(states)



function filterMembers() { //Filtro miembros por partido y por estado, y los empujo a un nuevo array según ifs del loop

    var checkedBoxes = document.querySelectorAll("input[name=party]:checked");
    var checkboxArray = Array.from(checkedBoxes).map(checkbox => checkbox.value);
    var selectedState = document.getElementById("filterbystate").value; //DEFINES + LINKS OPTIONS OF THE DROPDOWN MENU
    console.log(checkboxArray)
    console.log(selectedState)

    var filteredMembers = [];

    for (var i = 0; i < members.length; i++) {
        if (checkboxArray.length == 0 && selectedState == "") {
            filteredMembers = members
        } else if (selectedState !== "" && checkboxArray.length == 0) {
            if (selectedState.includes(members[i].state)) {
                filteredMembers.push(members[i])
            }
        } else if (checkboxArray.length !== 0 && selectedState == "") {
            if (checkboxArray.includes(members[i].party)) {
                filteredMembers.push(members[i])
            }
        } else {
            if (checkboxArray.includes(members[i].party) && selectedState.includes(members[i].state)) {
                filteredMembers.push(members[i])
            }
        }
    }
    checkedBoxes.onchange = CreateTableFromJSON(filteredMembers)
    selectedState.onchange = CreateTableFromJSON(filteredMembers)
}

function helperFunction() {
    filterMembers(members);
}

// SCRIPT CLEAR TABLE
        function DeleteRows() {
            var rowCount = table.rows.length;
            for (var i = rowCount - 1; i > 0; i--) {
                table.deleteRow(i);
            }
        }
        var table = document.getElementById("house-data");