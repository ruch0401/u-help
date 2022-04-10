import { getDecodedUrlParams } from "../common/decode.js";

var myLatLng = {};

$('#speechToText').click((event) => {
    var recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";

    recognition.onresult = function (event) {
        console.log(event);
        console.log(event.results[0][0].transcript);

        document.getElementById('recorded-help').value = event.results[0][0].transcript;
    }

    // calculate current location lat and long
    navigator.geolocation.getCurrentPosition((position) => {
        myLatLng.lat = position.coords.latitude;
        myLatLng.lng = position.coords.longitude;
    },(error) => {console.log(error);});

    // start voice recognition
    recognition.start();
});

$("#send-text-data").click((event) => {
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

            // collect data
            const helpCategory = 'beacon';
            const helpDescription = $('#recorded-help').val();

            // create data
            const helpObj = {};
            helpObj[helpCategory] = helpDescription;
            helpObj["coordinates"] = myLatLng;
            helpObj['timestamp'] = Date.now();
            help.push(helpObj);

            db.collection('users').doc(user.id).update({ helpNeeded: help });
        });

        // email sending feature to all those who are helpers and whose email is not the same as the current user email
        const users1 = db.collection("users");
        const users2 = users1.where('isHelper', "==", 'true');
        const query2 = users2.where("email", "!=", email);

        let toList = '';
        query2.get().then(users => {
            users.forEach(user => {
                let userData = user.data();
                toList += userData.email + "; "
            });
            const subject = "Urgent help needed";
            const body = `THIS IS A CALL FOR URGENT HELP!`;
            console.log(toList);
            window.open(`mailto:${toList}?subject=${subject}&body=${body}`);
        })
    }).catch((error) => {
        console.log(error);
    });
});