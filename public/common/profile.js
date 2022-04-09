import {addToExistingQueryParams, getDecodedUrlParams} from "./decode.js";

$('#profile-submit').click((event) => {
    event.preventDefault();
    const qp = getDecodedUrlParams($(location).attr("href"));
    const db = firebase.firestore();
    const docData = {}

    docData['fname'] = $('#custom-first-name').val();
    docData['lname'] = $('#custom-last-name').val();
    docData['mobile'] = $('#custom-mobile').val();
    docData['address'] = $('#custom-address').val();
    docData['story'] = $('#custom-story').val();
    docData['image'] = $('#custom-image').val();
    docData['isHelper'] = $('#custom-is-helper').val();
    docData['email'] = qp.email;
    docData['helpNeeded'] = [];
    docData['helpProvided'] = [];

    const docRef = db.collection("users").add(docData).then(() => {
        console.log(docRef);
    }).catch((error) => {
        console.log(`Something went wrong! ${error}`)
    });
});