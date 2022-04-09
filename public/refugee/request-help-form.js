import {addToExistingQueryParams, getDecodedUrlParams} from "../common/decode.js";
import {BASE_URL} from "../common/baseurl.js";

$('#help-form-submit').click((event) => {
    event.preventDefault();
    const qp = getDecodedUrlParams($(location).attr("href"));
    const email = qp.email;

    const db = firebase.firestore();
    const users = db.collection("users");
    const query = users.where("email", "==", email);

    query.get().then(users => {
        users.forEach(user => {
            let userData = user.data();
            let help = userData.helpNeeded;
            const helpCategory = $('#exampleFormControlSelect1').find(":selected").text().toLowerCase();
            const helpDescription = $('#exampleFormControlTextarea1').val();
            const helpObj = {};
            helpObj[helpCategory] = helpDescription
            helpObj['timestamp'] = Date.now();
            help.push(helpObj);
            console.log(help);
            db.collection('users').doc(user.id).update({helpNeeded: help});
            $('#status').html(`<div class="alert alert-success" role="alert">Help posted successfully</div>`)
            $('#exampleFormControlTextarea1').val('');
            setTimeout(() => {
                $(".alert").alert('close');
            }, 5000)
        });
    }).catch(() => {
        $('#status').html(`<div class="alert alert-danger" role="alert">Error while help posting</div>`)
        setTimeout(() => {
            $(".alert").alert('close');
        }, 5000)
    });
});

$('#fill-profile').click(() => {
    const url = getDecodedUrlParams($(location).attr("href"));
    document.location.href = (`${BASE_URL}/refugee/profile.html?email=${url.email}`);
})