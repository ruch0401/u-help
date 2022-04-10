import {addToExistingQueryParams, getDecodedUrlParams} from "../common/decode.js";
import {BASE_URL} from "../common/baseurl.js";


window.onload = () => {
    let data = getDecodedUrlParams(document.location.href);
    const db = firebase.firestore();
    const user = db.collection("users").doc(data['userId']);
    var index = data['helpId'];

    user.get().then(doc => {
        const data = doc.data();
        $('#help-details').html(`${JSON.stringify(data)}`);
        console.log(data);
        
        var details = document.getElementById("help-details");
        let helpCategory = Object.keys(data['helpProvided'][index])[0].toUpperCase();
        console.log(helpCategory)
        let helpText = data['helpProvided'][index][helpCategory.toLowerCase()];

        let detail = `
            <div style="text-align:center; margin-top:5%;"><img id="profile-img" src="${data.image}"></div>
            <h3 id="head-name">Hi! My name is <span style="font-weight:bold; color:#3b5998; font-size: larger">${data.fname} ${data.lname}</span>.</h3>
            <h5 class="head-intro">Here's a little about me</h5>
            <h5 style="text-align:justify; margin-top:2%; margin-left:5%; margin-right:5%; ">${data.story}</h5>
            <h5 class="head-intro"> Thank you for reaching out! Here's how I can assist you</h5>
            <h5 style="text-align:center; margin-top:1%;">${helpText}</h5>
            <h5 class="head-intro"> If you feel this is what you are looking for, here's my contact information</h5>
            <h5 style="text-align:center;margin-top:1%; margin-bottom:5%;">Mobile -> <a href="tel:+1${data.mobile}">${data.mobile}</a> <br> Email -> <a href="mailto:+1${data.email}">${data.email}</a> <br> Location -> </h5>
        `

        details.innerHTML = detail;
    });
}