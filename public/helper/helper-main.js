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
  const query = users.where("isHelper", "==", false);
  query.get().then((users) => {
    var emergency = document.getElementById("pills-home");
    users.forEach((user) => {
      console.log(user.id)
      data = user.data();
      for (let i = 0; i < data.helpNeeded.length; i++) {
        let card = `
                  <div id="${i}" class="card mb-3" style="max-width: 540px;">
                      <div class="row g-0">
                          <div class="col-md-4">
                              <img src="${data.image}" class="img-fluid rounded-start" alt="">
                          </div>
                          <div class="col-md-8">
                              <div class="card-body">
                                  <h5 class="card-title">Card title</h5>
                                  <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                                      additional content. This content is a little bit longer.</p>
                                  <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                              </div>
                          </div>
                      </div>
                  </div>
              `
        emergency.innerHTML += card;
        $(document).on('click', `#${i}`, function () {
          url = `${BASE_URL}/helper/helper-requestcard.html?user=${encodeURIComponent(user.id)}&index=${encodeURIComponent(i)}`;
          document.location.href = url;
        });
      }
    });
  });
}
