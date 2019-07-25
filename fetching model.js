creating_Url()
function creating_Url() {
   let value= " ";
   if (document.title.includes("Senate")) {
       value = "senate"
   }
   else {
       value = "house"
   }
   let url = "https://api.propublica.org/congress/v1/116/"+value+"/members.json"
   fetchingData(url)
}
function fetchingData(url) {
fetch(url, {
       method: "GET",
       headers: {
           "X-API-Key": "pwaHYLY2XBBDFcdsVoQ7KhmtyYTvQV8WzxMTFuXi"
       }
   })
   .then(function (response) {
       console.log(response);
       return response.json();
   })
   .then(function (data) {
       console.log(data.results[0].members);
       let memberArray = data.results[0].members;
       handleEvent (memberArray);
       loadMyData(memberArray);
       count_party_members("D", memberArray);
       count_party_members("R", memberArray);
       count_party_members("I", memberArray);
       voted_with_party("D", memberArray)
       voted_with_party("R", memberArray)
       voted_with_party("I", memberArray)
       members_lowest_Attendance(memberArray);
       members_highest_Attendance(memberArray);
       members_highest_Loyalty(memberArray);
       members_lowest_Loyalty(memberArray);
   })
   .catch(function (error) {
       console.log(error);
   });
}