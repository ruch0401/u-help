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
  
    const db = firebase.firestore();
    const user = db.collection("users").doc(data['userID']);

    user.get().then(doc => {
        const data = doc.data();
        console.log(data);
        
        var details = document.getElementById("details");

        let detail = `
            <h1>${data.address}</h1>
        `

        details.innerHTML = detail;
        
    })
}
