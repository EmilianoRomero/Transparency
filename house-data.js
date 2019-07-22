//----------------------------------------------------------------------------------------------------------------
//FILE: house-data.js
//LINKED TO: pro-congress-113-house.js & to house-data.html
//----------------------------------------------------------------------------------------------------------------

//------------------------------
// 01. TABLE id = house-data
//------------------------------
var members = data.results[0].members;

function CreateTableFromJSON() {

    var table = document.getElementById("house-data");

    var checkedBoxes = document.querySelectorAll("input[name=party]:checked");
    var checkboxArray = Array.from(checkedBoxes).map(checkbox => checkbox.value);

    var selectedState = document.getElementById("filterbystate").value;
    var select = document.getElementById("filterbystate");

    for (var i = 0; i < members.length; i++) {
        {
            var option = document.createElement("option"); //Defines and creates the option in dropdown in html
            var select = document.getElementById("filterbystate"); //Defines and links the option list content in html


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
            //    console.log(states);
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


//table.getElementsByTagName("tbody")[0].innerHTML = table.rows[0].innerHTML;
//table.innerHTML = "";
//    var statesArray = (members[i].state);//.split(" ");