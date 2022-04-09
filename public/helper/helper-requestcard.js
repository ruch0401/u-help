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
        if (helpCategory == "TIMESTAMP") {
          helpCategory = Object.keys(data.helpNeeded[data['index']])[1].toUpperCase();
        }
        helpCategory = helpCategory.toLowerCase();
        // console.log(helpCategory)
        let helpText = data['helpNeeded'][index][helpCategory];
        // console.log(helpText);

        let detail = `
            <div style="text-align:center; margin-top:5%; "><img src="${data.image}" style="width:20%; height:30%; box-shadow: 12px 12px 2px 1px rgba(186, 154, 67, .2);"></div>
            <h3 style="text-align:center; margin-top:2%">Hi! My name is <span style="font-weight:bold; color:#3b5998; font-size: larger">${data.fname} ${data.lname}</span>.</h3>
            <h5 style="text-align:center;margin-top:2%; font-style:italic; text-decoration: underline;"> Here's how I made it to your beautiful country (something about me!)</h5>
            <h5 style="text-align:justify; margin-top:2%; margin-left:5%; margin-right:5%; font-weight:bold">${data.story}</h5>
            <h5 style="text-align:center;margin-top:4%; font-style:italic; text-decoration: underline;"> Thank you for your support! Here's what I need some assisstance with</h5>
            <h5 style="text-align:center; margin-top:1%; font-weight:bold;">${helpText}</h5>
            <h5 style="text-align:center;margin-top:4%; font-style:italic; text-decoration: underline;"> If you feel you'll be able to help me out, here's my contact information</h5>
            <h5 style="text-align:center;margin-top:1%; margin-bottom:5%; font-weight:bold;">Mobile - ${data.mobile} <br> Email - ${data.email} <br> Current Location - </h5>
        `

        details.innerHTML = detail;
        
    })
}
