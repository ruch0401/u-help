import {addToExistingQueryParams, getDecodedUrlParams} from "../common/decode.js";
import {BASE_URL} from "../common/baseurl.js";


window.onload = () => {
    let data = getDecodedUrlParams(document.location.href);
    const db = firebase.firestore();
    const user = db.collection("users").doc(data['userId']);

    user.get().then(doc => {
        const data = doc.data();
        console.log(data);
        $('#house-help-details').html(`${JSON.stringify(data)}`);
    });
}