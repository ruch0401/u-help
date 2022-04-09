import { getDecodedUrlParams } from "../common/decode.js";
import { BASE_URL } from "../common/baseurl.js";

function displayHelpList() {
  var url = document.location.href;
  var params = url.split('?')[1].split('&');
  var data = {}, tmp;

  for (var i = 0, l = params.length; i < l; i++) {
    tmp = params[i].split('=');
    data[tmp[0]] = decodeURIComponent(tmp[1]);
  }
  console.log(data);

  const db = firebase.firestore();
  const users = db.collection("users");
  console.log(users)
  const query = users.where("isHelper", "==", false);
  query.get().then((users) => {
    var urgentHelp = document.getElementById("pills-urgent");
    users.forEach((user) => {
      console.log(user.id)
      data = user.data();
      for (let i = 0; i < data.helpNeeded.length; i++) {
        let helpCategory = Object.keys(data.helpNeeded[i])[0].toUpperCase();
        if (helpCategory == "TIMESTAMP") {
          helpCategory = Object.keys(data.helpNeeded[i])[1].toUpperCase();
        }
        let helpText = data.helpNeeded[i][helpCategory.toLowerCase()];
        let helpDate = new Date(data.helpNeeded[i]['timestamp']);
        console.log(helpDate)
        let card = `
                  <div id="${i}" class="card mb-3" style="margin:5% ">
                      <div class="row g-0">
                          <div class="col-md-4">
                              <img src="${data.image}" class="img-fluid rounded-start" alt="">
                          </div>
                          <div class="col-md-8">
                              <div class="card-body">
                                  <h2 class="card-title" style="font-weight:bold">${data.fname}&nbsp;${data.lname}</h2>
                                  <span class="badge rounded-pill bg-primary" style="background-color:#005BBB; font-size: 15px">${helpCategory}</span>
                                  <p class="card-text" style="margin-top:5%; font-size: 20px">${helpText}</p>
                                  <p class="card-text"><small class="text-muted">Posted on ${helpDate.getMonth()}/${helpDate.getDay()}/${helpDate.getFullYear()}</small></p>
                              </div>
                          </div>
                      </div>
                  </div>
              `
        urgentHelp.innerHTML += card;
        $(document).on('click', `#${i}`, function () {
          url = `${BASE_URL}/helper/helper-requestcard.html?userID=${encodeURIComponent(user.id)}&index=${encodeURIComponent(i)}`;
          document.location.href = url;
        });
      }
    });
  });

  $('#provide-help-button').click(() => {
    const url = getDecodedUrlParams($(location).attr("href"));
    console.log(url);
    document.location.href = (`${BASE_URL}/refugee/provide-help-form.html?email=${url.email}`);
  })
}

$('#fill-profile').click(() => {
  const url = getDecodedUrlParams($(location).attr("href"));
  console.log(url);
  document.location.href = (`${BASE_URL}/common/profile.html?email=${url.email}`);
})

$('#help-form-submit').click(() => {
  const url = getDecodedUrlParams($(location).attr("href"));
  console.log(url);
  document.location.href = (`${BASE_URL}/helper/provide-help-form.html?email=${url.email}`);
})

window.onload = function () {
  displayHelpList();
}
