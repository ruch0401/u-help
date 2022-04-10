import { addToExistingQueryParams, getDecodedUrlParams } from "../common/decode.js";
import { BASE_URL } from "../common/baseurl.js";


window.onload = () => {
    const db = firebase.firestore();
    const users = db.collection("users");
    const query = users.where("isHelper", "==", "true");

    query.get().then(users => {
        let houseHelpListingContainer = document.getElementById("house-help-listing");
        users.forEach(user => {
            let data = user.data();
            
            console.log(data)
            for (let i = 0; i < data.helpProvided.length; i++) {
                if(data.helpProvided[i].house !== undefined){
                    let helpCategory = Object.keys(data.helpProvided[i])[0].toUpperCase();
                    let helpText = data.helpProvided[i][helpCategory.toLowerCase()];
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;
                    if (houseHelpListingContainer !== null) {
                        houseHelpListingContainer.innerHTML += card;
                    }
                    $(document).on('click', `#${data.fname}${i}`, function () {
                        console.log(data);
                        document.location.href = `${BASE_URL}/refugee/refugee-help-details.html?userId=${user.id}&helpId=${i}`;
                    });
                }
            }
        });
    });
}