import {addToExistingQueryParams, getDecodedUrlParams} from "../common/decode.js";
import {BASE_URL} from "../common/baseurl.js";


window.onload = () => {
    const db = firebase.firestore();
    const users = db.collection("users");
    const query = users.where("isHelper", "==", true);

    query.get().then(users => {
        let houseHelpListingContainer = document.getElementById("house-help-listing");
        users.forEach(user => {
            let data = user.data();
            for (let i = 0; i < data.helpProvided.length && data.helpProvided[i].house !== undefined; i++) {
                let card = `
                            <div id="${i}" class="card mb-3" style="max-width: 540px;">
                                <div class="row g-0">
                                    <div class="col-md-4">
                                        <img src="${data.image}" class="img-fluid rounded-start" alt="">
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h5 class="card-title">${data.fname + ' ' + data.lname}</h5>
                                            <p class="card-text">${data.helpProvided[i].house}</p>
                                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                if (houseHelpListingContainer !== null) {
                    houseHelpListingContainer.innerHTML += card;
                }
                $(document).on('click', `#${i}`, function () {
                    console.log(data);
                    document.location.href = `${BASE_URL}/refugee/refugee-help-details.html?userId=${user.id}&helpId=${i}`;
                });
            }
        });
    });
}