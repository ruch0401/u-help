import { getDecodedUrlParams } from "../common/decode.js";


window.onload = function () {
    var url = document.location.href;
    var params = url.split('?')[1].split('&');
    var data = {}, tmp;
  
    for (var i = 0, l = params.length; i < l; i++) {
      tmp = params[i].split('=');
      data[tmp[0]] = decodeURIComponent(tmp[1]);
    }
    console.log(data);
    var index = data['index'];
  
    const db = firebase.firestore();
    const user = db.collection("users").doc(data['userID']);

    user.get().then(doc => {
        const data = doc.data();
        console.log(data);
        // console.log(data['index']);
        
        var details = document.getElementById("help-details");
        let helpCategory = Object.keys(data['helpNeeded'][index])[0].toUpperCase();
        console.log(helpCategory)
        if (helpCategory === "TIMESTAMP") {
          console.log("Here!!")
          helpCategory = Object.keys(data['helpNeeded'][index])[1].toUpperCase();
        }
        helpCategory = helpCategory.toLowerCase();
        let helpText = data['helpNeeded'][index][helpCategory];

        let detail = `
            <div  style="text-align:center; margin-top:5%; "><img id="profile-img" src="${data.image}"></div>
            <h3 id="head-name">Hi! My name is <span style="font-weight:bold; color:#3b5998; font-size: larger">${data.fname} ${data.lname}</span>.</h3>
            <h5 class="head-intro"> Here's how I made it to your beautiful country (something about me!)</h5>
            <h5 style="text-align:justify; margin-top:2%; margin-left:5%; margin-right:5%; ">${data.story}</h5>
            <h5 class="head-intro"> Thank you for your support! Here's what I need some assisstance with</h5>
            <h5 style="text-align:center; margin-top:1%;">${helpText}</h5>
            <h5 class="head-intro"> If you feel you'll be able to help me out, here's my contact information</h5>
            <h5 style="text-align:center;margin-top:1%; margin-bottom:5%;">Mobile -> ${data.mobile} <br> Email -> ${data.email} <br> Current Location -> </h5>
        `

        details.innerHTML = detail;
        
    })
}
