//ACCESSING JSON ON LINE. FILTERING BY CHAMBER.
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
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data.results[0].members);
            let members = data.results[0].members;
            //------SENATE-DATA------//
            createTableFromJSON(members);
            removeDupl(members);
            getInputsValues(members);
            getInputsSelections(members);
        })
        .catch(function (error) {
            console.log(error);
        });
}