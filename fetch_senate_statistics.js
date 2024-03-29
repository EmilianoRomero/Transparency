//FILE: fetch-senate-attendance.js 
//linked to 
//statistics.js to 
//senate-attendance-statistics.html and senate-partyloyalty-statistics.html
//house-attendance-statistics.html and house-partyloyalty-statistics.html

//ACCESSING JSON ON LINE. FILTERING BY CHAMBER.
accessingTheOnLineJSON()

function accessingTheOnLineJSON()
/*{
    let value = " ";
if (document.title.includes("Senate")) {
    value = "senate"
} else {
    value = "house"
}*/
{
    let url = "https://api.propublica.org/congress/v1/113/senate/members.json"
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
            let members = data.results[0].members;
            console.log(members);
            let statistics = dataStat.statistics;

            mapMembersParty(members);
            mapMembersVotes(members);

            buildTable(statistics);

            if (document.title.includes("Loyalty")) {
                sortAscending(members, "votes_with_party_pct");
                feedsLeastTable(members);

                sortDescending(members, "votes_with_party_pct");
                feedsMostTable(members);
            } else {
                sortAscending(members, "missed_votes_pct");
                feedsHighestAttendanceTable(members);

                sortDescending(members, "missed_votes_pct");
                feedsLowestAttendanceTable(members);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}