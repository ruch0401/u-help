import { getDecodedUrlParams } from "../common/decode.js";
import { BASE_URL } from "../common/baseurl.js";


window.onload = function () {
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
        let card = `
                  <div id="${i}" class="card mb-3" style="margin:5% ">
                      <div class="row g-0">
                          <div class="col-md-4">
                              <img src="${data.image}" class="img-fluid rounded-start" alt="">
                          </div>
                          <div class="col-md-8">
                              <div class="card-body">
                                  <h5 class="card-title">${data.fname}&nbsp;${data.lname}</h5>
                                  
                                  <p class="card-text">${data.fname}</p>
                                  <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
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
