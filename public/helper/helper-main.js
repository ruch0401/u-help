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

  const db = firebase.firestore();
  const users = db.collection("users");
  const query = users.where("isHelper", "==", "false");
  query.get().then((users) => {
    var urgentHelp = document.getElementById("pills-urgent");
    var beaconHelp = document.getElementById("pills-non-urgent");
    users.forEach((user) => {
      data = user.data();
      console.log(data)
      for (let i = 0; i < data.helpNeeded.length; i++) {
        let helpCategory = ''; 
        Object.keys(data.helpNeeded[i]).forEach(obj => {
            if (obj === 'legal') {
              helpCategory = 'legal'
            } else if (obj === 'miscellaneous') {
              helpCategory = 'miscellaneous'
            } else if (obj === 'housing') {
              helpCategory = 'housing'
            } else if (obj === 'beacon') {
              helpCategory = 'beacon'
            }
        });
        console.log(helpCategory)
        let helpText = data.helpNeeded[i][helpCategory];
        let helpDate = new Date(data.helpNeeded[i]['timestamp']);
        let card = `
                  <div id="${data.fname}${i}" class="card mb-3" style="margin:5% ">
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

        let beaconCard = `
              <div id="${data.fname}${i}-beacon" class="card mb-3" style="margin:5% ">
                  <div class="row g-0">
                      <div class="col-md-8">
                        <div id="${data.fname}-map" style="height: 100%"></div>
                      </div>
                      <div class="col-md-4">
                          <div class="card-body">
                              <h2 class="card-title" style="font-weight:bold">${data.fname}&nbsp;${data.lname}</h2>
                              <span class="badge rounded-pill bg-primary" style="background-color:#005BBB; font-size: 15px">${helpCategory}</span>
                              <p class="card-text" style="margin-top:5%; font-size: 20px">${helpText}</p>
                              <p class="card-text"><small class="text-muted">Posted on ${helpDate.getMonth()}/${helpDate.getDay()}/${helpDate.getFullYear()}</small></p>
                          </div>
                      </div>
                  </div>
              </div>
          `;

        if(helpCategory !== "beacon")
          urgentHelp.innerHTML += card;
        else{
          beaconHelp.innerHTML += beaconCard;
          initMap();
          function initMap() {
            let map;
            let coords = {};
            console.log(data.helpNeeded[i]);
            coords['lat'] = data.helpNeeded[i].coordinates.lat;
            coords['lng'] = data.helpNeeded[i].coordinates.lng;
            map = new google.maps.Map(document.getElementById(`${data.fname}-map`), {
              center: coords,
              zoom: 14,
            });
          
            new google.maps.Marker({
              position: coords,
              map,
            });
          }
        }

        $(document).on('click', `#${data.fname}${i}`, function () {
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
