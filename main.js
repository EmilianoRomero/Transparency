//console.log(1);

//DEBO ACCEDER AL JSON ON LINE. ¿A CUÁL DE LOS DOS? SEGÚN LA CONDICIÓN:
accessingTheOnLineJSON()

function accessingTheOnLineJSON() {
    let value = " ";
    if (document.title.includes("Senate")) {
        value = "senate"
    } else {
        value = "house"
    }
    let url = "https://api.propublica.org/congress/v1/113/" + value + "/members.json"

    fetchingDataFromOnLineJSON(url)
}

//FETCHING IT! GETTING THE INFO FROM JSON ON LINE SERVER
function fetchingDataFromOnLineJSON(url) {
    fetch(url, {
            method: "GET",
            headers: {
                "X-API-Key": "ZnV9hZHe5Q6tOdwr8zo6XrMJfTcCGLLqxSe1VzhO"
            }
        })
        .then(response => {
            //console.log(2); //SHOULD I LEAVE THIS ONE?
            console.log(response);
            return response.json();
        })
        .then(function (data) { //SHOULDN'T I ENTER THE FUNCTION HERE?
            console.log(data.results[0].members);
            let members = data.results[0].members;
            let noDuplicates = [];
            CreateTableFromJSON(members); //works
            removeDupl(members); //works
            createStateSelect(noDuplicates); //works
            //var checkedBoxes = document.querySelectorAll("input[name=party]:checked");
            //checkedBoxes.addEventListener(":checked", filterMembers);
            //getInputsSelections(); //doesn't work properly
            //filterMembers(checkedBoxesArray, selectedState);
            //console.log(checkedBoxesArray)
            //console.log(selectedState)
            //buildFilteredMembersTable(filteredMembers)



        })
        .catch(function (error) {
            console.log(error);
        });
}



/*        
    function display(users) { //WHAT'S THIS FOR? IS THIS FOR WHEN ONE CREATES THE TABLES FROM SCRATCH IN HTML?
        console.log(3);
        let ol = document.getElementById("ordered_list");
        console.log('ol', ol)
        users.forEach(user => {
            let li = document.createElement("li");
            console.log(user.name)
            li.innerHTML = user.name;
            ol.appendChild(li)
        })
    }
*/